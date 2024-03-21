const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user')

// mongoose
mongoose.connect(`${process.env.MONGODB_TOKEN}`)

// Handle logging
app.use(morgan('dev'))

// make files publicly available
app.use('/uploads', express.static('uploads'))

// Adding Headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, PATCH, DELETE, GET, OPTIONS'
    )
    return res.status(200).json({})
  }
  next()
})

// Handle parsing
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/user', userRoutes)

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
