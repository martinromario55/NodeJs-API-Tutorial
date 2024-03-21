const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const {
  orders_get_all,
  create_order,
  get_order,
  delete_order,
} = require('../controllers/orders')

router.get('/', checkAuth, orders_get_all)

router.post('/', checkAuth, create_order)

// Get Order By Id
router.get('/:orderId', checkAuth, get_order)

router.delete('/:orderId', checkAuth, delete_order)

module.exports = router
