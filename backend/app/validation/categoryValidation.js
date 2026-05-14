export function validateCreateCategory(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ errors: ['Category name is required'] })
  }
  next()
}

export function validateUpdateCategory(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ errors: ['Category name is required'] })
  }
  next()
}
