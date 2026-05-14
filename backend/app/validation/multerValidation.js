const allowedMimes = ['image/jpeg', 'image/png', 'image/webp']
const maxSize = 2 * 1024 * 1024

export function validateUpload(req, res, next) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }

  if (!allowedMimes.includes(req.file.mimetype)) {
    return res.status(400).json({ error: 'Only JPEG, PNG, and WebP images are allowed' })
  }

  if (req.file.size > maxSize) {
    return res.status(400).json({ error: 'File size must be under 2MB' })
  }

  next()
}
