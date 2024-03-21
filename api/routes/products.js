const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
})

const Product = require('../models/product')
const {
  get_all_products,
  create_product,
  get_product,
  patch_product,
  delete_product,
} = require('../controllers/products')

router.get('/', get_all_products)

router.post('/', checkAuth, upload.single('productImage'), create_product)

router.get('/:productId', get_product)

router.patch('/:productId', checkAuth, patch_product)

router.delete('/:productId', checkAuth, delete_product)

module.exports = router
