import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth.js'
import { requireRole } from '../../middleware/requireRole.js'
import {
  submitPaymentProof,
  getPendingPayments,
  verifyPayment,
  markRefunded,
  rejectRemaining,
  submitBookingProof,
  getPendingBookingPayments,
  verifyBookingPayment,
  markBookingRefunded,
  rejectRemainingBookings,
  getRefunds,
} from './payments.controller.js'

const router = Router()

// EVENT_HEADs pass the role check here; the controller limits them to events they created
const staff = [requireAuth, requireRole(['ADMIN', 'EVENT_HEAD'])]

// Main-event registrations
router.get('/pending', ...staff, getPendingPayments)
router.get('/refunds', ...staff, getRefunds)
router.post('/:registrationId/proof', requireAuth, submitPaymentProof)
router.patch('/:registrationId/verify', ...staff, verifyPayment)
router.patch('/:registrationId/refund', ...staff, markRefunded)
router.post('/:eventId/reject-remaining', ...staff, rejectRemaining)

// Sub-event bookings
router.get('/sub-event-bookings/pending', ...staff, getPendingBookingPayments)
router.post('/sub-event-bookings/:bookingId/proof', requireAuth, submitBookingProof)
router.patch('/sub-event-bookings/:bookingId/verify', ...staff, verifyBookingPayment)
router.patch('/sub-event-bookings/:bookingId/refund', ...staff, markBookingRefunded)
router.post('/sub-events/:subEventId/reject-remaining', ...staff, rejectRemainingBookings)

export default router
