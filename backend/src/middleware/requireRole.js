// Use after requireAuth, which sets req.user with the role freshly loaded from the database:
//   router.post('/', requireAuth, requireRole(['ADMIN', 'EVENT_HEAD']), handler)
export const requireRole = (allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'You do not have permission to do this.' })
  }
  next()
}
