const mongoose = require('mongoose')
const Product = require('../models/product')

exports.get_all_products = (req, res, next) => {
  Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
      //   console.log('Docs', docs)
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            _id: doc._id,
            request: {
              type: 'GET',
              url: `http://localhost:3000/products/${doc._id}`,
            },
          }
        }),
      }
      res.status(200).json({ response })
    })
    .catch(err => {
      console.log('Error', err)
      res.status(500).json({ error: err })
    })
}

exports.create_product = (req, res, next) => {
  //   console.log('File', req.file)
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  })
  product
    .save()
    .then(result => {
      //   console.log('Result:', result)
      res.status(201).json({
        message: 'Created product successfully',
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: 'GET',
            url: `http://localhost:3000/products/${result._id}`,
          },
        },
      })
    })
    .catch(err => {
      console.log('Error', err)
      res.status(500).json({ error: err })
    })
}

exports.get_product = (req, res, next) => {
  const id = req.params.productId
  Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
      //   console.log('doc', doc)
      if (doc) {
        res.status(200).json({ doc })
      } else {
        res
          .status(404)
          .json({ message: 'No valid entry found for provided ID' })
      }
    })
    .catch(err => {
      console.log('Error', err)
      res.status(500).json({ error: err })
    })
}

exports.patch_product = (req, res, next) => {
  const id = req.params.productId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log('Error', err)
      res.status(500).json({ error: err })
    })
}

exports.delete_product = (req, res, next) => {
  const id = req.params.productId
  Product.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log('Error', err)
      res.status(500).json({ error: err })
    })
}
