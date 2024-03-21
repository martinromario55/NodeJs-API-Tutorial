const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Loading GET request from /orders',
  })
})

router.post('/', (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  }
  res.status(201).json({
    message: 'Loading POST request from /orders',
    order: order,
  })
})

// Get Request
router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId
  if (id === 'special') {
    res.status(200).json({
      message: 'You found the special Order Id',
      id: id,
    })
  } else {
    res.status(200).json({
      message: 'Loading GET request from /orders/:orderId',
    })
  }
})

router.patch('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'update order',
  })
})

router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Delete order',
  })
})

module.exports = router
