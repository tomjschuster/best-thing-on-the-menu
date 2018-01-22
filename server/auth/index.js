const router = require('express').Router()
const passport = require('./passport')
const db = require('../../db')
const bcrypt = require('bcrypt')
module.exports = router

/*----------  CREATE  ----------*/
router.post('/', (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, 9)
  const isAdmin = false
  const params = { ...req.body, hash, isAdmin }
  db.call.createUser(params).then(({alreadyExists, id}) => {
    if (alreadyExists) res.status(409).send('User with email already exists')
    else res.status(201).send(String(id))
  })
})


router.post('/local', passport.authenticate('local'), (req, res, next) =>
  res.redirect('/explore')
)

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
