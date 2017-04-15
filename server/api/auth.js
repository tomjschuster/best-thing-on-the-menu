const router = require('express').Router()
const passport = require('../passport')
module.exports = router
// const { call } = require('../db')


router.get('/whoami', (req, res) => res.send(req.user))

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/google/callback', passport.authenticate('google',
    { successRedirect: '/', failureRedirect: '/places/1' }
))

router.post('/local', passport.authenticate('local'), (req, res, next) => res.send(req.session))

router.get('/check/req', (req, res) => res.send(req.session))

