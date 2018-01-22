
const verifyAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) next()
  else res.sendStatus(401)
}

const verifyAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) next()
  else res.sendStatus(403)
}

module.exports = { verifyAuthenticated, verifyAdmin }
