const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Loading GET request from /products',
  })
})

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Loading POST request from /products',
  })
})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  if (id === 'special') {
    res.status(200).json({
      message: 'You found the special ID',
      id: id,
    })
  } else {
    res.status(200).json({
      message: 'Loading GET request from /products/:productId',
    })
  }
})

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'update product',
  })
})

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Delete product',
  })
})

module.exports = router
