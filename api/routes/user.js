const express = require('express')
const router = express.Router()

const {
  register_user,
  login_user,
  delete_user,
} = require('../controllers/user')
const checkAuth = require('../middleware/check-auth')

router.post('/signup', register_user)

router.post('/login', login_user)

router.delete('/:userId', checkAuth, delete_user)

module.exports = router
