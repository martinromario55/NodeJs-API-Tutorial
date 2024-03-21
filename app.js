const express = require('express')
const app = express()
const morgan = require('morgan')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

// app.use((req, res, next) => {
//   res.status(200).json({
//     message: 'Listening...',
//   })
// })

// Handle logging
app.use(morgan('dev'))

// Routes
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

// Handle Errors
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// Handle other errors
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: { message: error.message },
  })
})

module.exports = app
