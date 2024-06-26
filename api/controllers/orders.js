const mongoose = require('mongoose')
const Order = require('../models/order')
const Product = require('../models/product')

exports.orders_get_all = (req, res, next) => {
  order
    .find()
    .select('product quantity _id')
    .populate('product', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: 'GET',
              url: `http://localhost:3000/orders/${doc._id}`,
            },
          }
        }),
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      })
    })
}

exports.create_order = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        res.status(404).json({
          message: 'Product not found',
        })
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity,
      })
      return order.save()
    })
    .then(result => {
      // console.log('Result', result)
      res.status(201).json({
        message: 'Created order successfully',
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
        request: {
          type: 'GET',
          url: `http://localhost:3000/orders/${result._id}`,
        },
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      })
    })
}

exports.get_order = (req, res, next) => {
  Order.findById(req.params.orderId)
    .select('product quantity _id')
    .populate('product')
    .exec()
    .then(order => {
      if (!order) {
        res.status(404).json({
          message: 'Order not found',
        })
      }
      res.status(200).json({
        OrderInfo: {
          _id: order._id,
          product: order.product,
          quantity: order.quantity,
        },
        request: {
          type: 'GET',
          url: `http://localhost:3000/orders/${order._id}`,
        },
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      })
    })
}

exports.delete_order = (req, res, next) => {
  Order.deleteOne({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Order deleted successfully',
        request: {
          type: 'POST',
          url: `http://localhost:3000/orders`,
          body: {
            productId: 'ID',
            quantity: 'Number',
          },
        },
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      })
    })
}