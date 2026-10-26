import { Router } from 'express'
import { authLimiter, passwordResetLimiter } from '../../middleware/rateLimiter.js'
import { requireAuth } from '../../middleware/requireAuth.js'
import { register, login, logout, me } from './auth.controller.js'
import { googleLogin } from './google.controller.js'
import { forgotPassword, resetPassword } from './passwordReset.controller.js'
import { updateMe } from './profile.controller.js'

const router = Router()

router.post('/register', authLimiter, register)
router.post('/login', authLimiter, login)
router.post('/google-login', authLimiter, googleLogin)
router.post('/forgot-password', passwordResetLimiter, forgotPassword)
router.post('/reset-password', passwordResetLimiter, resetPassword)
router.post('/logout', logout)
router.get('/me', requireAuth, me)
router.patch('/me', requireAuth, updateMe)

export default router
