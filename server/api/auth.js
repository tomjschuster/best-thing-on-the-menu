const router = require('express').Router()
const passport = require('../passport')
module.exports = router

/*----------  CREATE  ----------*/
router.post('/local', passport.authenticate('local'), (req, res, next) => res.redirect('/explore'))

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send(401)
  })
})


/*----------  READ  ----------*/
router.get('/check', (req, res) => {
  const isAuthenticated = req.isAuthenticated()

  const isAdmin = req.user !== undefined ? req.user.isAdmin : false
  const email = req.user !== undefined ? req.user.email : false
  const firstName = req.user !== undefined ? req.user.firstName : false
  const lastName = req.user !== undefined ? req.user.lastName : false
  res.send({ isAuthenticated, isAdmin, email, firstName, lastName })
})

router.get('/google/callback', passport.authenticate('google',
    { successRedirect: '/explore', failureRedirect: '/login' }
))

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
