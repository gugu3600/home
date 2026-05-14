export function validateCreatePermission(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ errors: ['Permission name is required'] })
  }
  next()
}

export function validateUpdatePermission(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ errors: ['Permission name is required'] })
  }
  next()
}
