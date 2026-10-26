import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth.js'
import { requireRole } from '../../middleware/requireRole.js'
import { registerForEvent, getMyRegistrations, getTicket, getMasterTicket } from './registrations.controller.js'
import { bookSubEvent, getMyBookings } from './bookings.controller.js'
import { checkIn } from './checkin.controller.js'

const router = Router()

// Fixed paths first: POST /:eventId would otherwise swallow /check-in and /book-sub-event
// EVENT_HEADs pass the role check; the controller limits them to events they created
router.post('/check-in', requireAuth, requireRole(['ADMIN', 'EVENT_HEAD']), checkIn)
router.post('/book-sub-event', requireAuth, bookSubEvent)
router.get('/me', requireAuth, getMyRegistrations)
router.get('/bookings/me', requireAuth, getMyBookings)
router.get('/events/:eventId/ticket', requireAuth, getMasterTicket)
router.get('/:registrationId/ticket', requireAuth, getTicket)
router.post('/:eventId', requireAuth, registerForEvent)

export default router
