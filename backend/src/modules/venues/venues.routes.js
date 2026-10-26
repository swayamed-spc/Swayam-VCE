import { Router } from 'express'
import { requireAuth } from '../../middleware/requireAuth.js'
import { requireRole } from '../../middleware/requireRole.js'
import { addVenue, deleteVenue, listVenues } from './venues.controller.js'

const router = Router()

// Staff read the list for the event form; only admins change it
router.get('/', requireAuth, requireRole(['ADMIN', 'EVENT_HEAD']), listVenues)
router.post('/', requireAuth, requireRole(['ADMIN']), addVenue)
router.delete('/:id', requireAuth, requireRole(['ADMIN']), deleteVenue)

export default router
