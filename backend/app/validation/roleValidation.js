export function validateCreateRole(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ errors: ['Role name is required'] })
  }
  next()
}

export function validateUpdateRole(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ errors: ['Role name is required'] })
  }
  next()
}
