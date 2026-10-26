// UPI QR images uploaded by staff when creating an event. The file is kept in memory and checked to really be a PNG,
// JPEG or WebP by its first bytes (the browser's claimed type is not trusted), then stored under a random name:
//   CLOUDINARY_URL set (production): uploaded to Cloudinary, folder swayam/upi-qr; the event stores the https URL.
//   Not set (local development): saved in UPLOAD_DIR (default backend/uploads) and served at /api/uploads/... by app.js.
import fs from 'node:fs/promises'
import path from 'node:path'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { events } from '../../db/schema.js'

export const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || path.join(import.meta.dirname, '../../../uploads'))
const QR_DIR = path.join(UPLOAD_DIR, 'upi-qr')
const PUBLIC_PREFIX = '/api/uploads/upi-qr/'
const CLOUD_FOLDER = 'swayam/upi-qr'
const MAX_BYTES = 2 * 1024 * 1024

const fail = (res, status, message) => res.status(status).json({ success: false, message })
const useCloudinary = () => Boolean(process.env.CLOUDINARY_URL)

// What upiQrUrl looks like when it points at a local upload
const UPLOADED = /^\/api\/uploads\/upi-qr\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(png|jpg|webp)$/
export const isUploadedQr = (value) => typeof value === 'string' && UPLOADED.test(value)

// The Cloudinary public id (swayam/upi-qr/<uuid>) of one of our uploads, or null for any other URL
function cloudinaryId(value) {
  const match = typeof value === 'string' && value.match(/^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/(?:v\d+\/)?(swayam\/upi-qr\/[0-9a-f-]{36})\.\w+$/)
  return match ? match[1] : null
}

// Deletes an uploaded QR image once no event uses it any more. Other links and missing files are ignored, and a
// failure only logs: a stray image must never stop an event being deleted or edited.
export async function removeUploadedQr(value) {
  const publicId = cloudinaryId(value)
  if (!isUploadedQr(value) && !publicId) return
  const [stillUsed] = await db.select({ id: events.id }).from(events).where(eq(events.upiQrUrl, value)).limit(1)
  if (stillUsed) return
  try {
    if (publicId) await cloudinary.uploader.destroy(publicId, { resource_type: 'image' })
    else await fs.rm(path.join(QR_DIR, path.basename(value)), { force: true })
  } catch (err) {
    console.error('[uploads] could not delete', value, err?.message ?? err)
  }
}

function imageType(buf) {
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png'
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg'
  if (buf.length > 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return 'webp'
  return null
}

// Cloudinary reads CLOUDINARY_URL (cloudinary://key:secret@cloud) from the environment
function uploadToCloudinary(buffer, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.config({ secure: true })
    const stream = cloudinary.uploader.upload_stream(
      // The folder is part of the public id, which works the same with fixed and dynamic folder accounts
      { public_id: `${CLOUD_FOLDER}/${publicId}`, resource_type: 'image', overwrite: false },
      (err, result) => (err ? reject(err) : resolve(result)),
    )
    stream.end(buffer)
  })
}

const single = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_BYTES, files: 1 } }).single('file')

// multipart/form-data with one field "file". Returns { path } to send as the event's upiQrUrl.
export function uploadUpiQr(req, res, next) {
  single(req, res, async (err) => {
    if (err?.code === 'LIMIT_FILE_SIZE') return fail(res, 400, 'The image must be 2 MB or smaller.')
    if (err instanceof multer.MulterError) return fail(res, 400, 'Send one image in a form field named "file".')
    if (err) return next(err)
    if (!req.file) return fail(res, 400, 'Choose an image of the UPI QR code to upload.')

    const ext = imageType(req.file.buffer)
    if (!ext) return fail(res, 400, 'The QR code must be a PNG, JPEG or WebP image.')
    const id = crypto.randomUUID()
    try {
      if (useCloudinary()) {
        const result = await uploadToCloudinary(req.file.buffer, id)
        return res.status(201).json({ success: true, data: { path: result.secure_url } })
      }
      const name = `${id}.${ext}`
      await fs.mkdir(QR_DIR, { recursive: true })
      await fs.writeFile(path.join(QR_DIR, name), req.file.buffer, { flag: 'wx' })
      res.status(201).json({ success: true, data: { path: PUBLIC_PREFIX + name } })
    } catch (e) {
      if (useCloudinary()) {
        console.error('[uploads] Cloudinary upload failed:', e?.message ?? e)
        return fail(res, 502, 'The image could not be stored. Please try again.')
      }
      next(e)
    }
  })
}
