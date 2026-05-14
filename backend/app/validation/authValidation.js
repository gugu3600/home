export function validateLogin(req, res, next) {
  const { email, password } = req.body
  const errors = []

  if (!email) errors.push('Email is required')
  if (!password) errors.push('Password is required')

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  next()
}
