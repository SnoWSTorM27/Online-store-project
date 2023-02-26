const tokenService = require("../services/token.service")

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const refreshTokenCandidate = req.headers.role.split(' ')[1]
    if (!refreshTokenCandidate) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    const data = tokenService.validateRefresh(refreshTokenCandidate)
    if (!data) {
      return res.status(401).json({message: 'Unauthorized'})
    }

    const adminID = '63f48640cb62bfe6bb7ac8f7'
    if (data._id !== adminID) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    req.token = data

    next()

  } catch (e) {
    res.status(401).json({message: 'Unauthorized'})
  }
}