export function validateCreateItem(req, res, next) {
  const errors = []
  if (!req.body.name) errors.push('Item name is required')
  if (!req.body.categoryId) errors.push('Category ID is required')
  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }
  next()
}

export function validateUpdateItem(req, res, next) {
  if (!req.body.name && !req.body.categoryId) {
    return res.status(400).json({ errors: ['Nothing to update'] })
  }
  next()
}
