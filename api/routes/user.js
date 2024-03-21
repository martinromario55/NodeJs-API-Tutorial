const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const { token } = require('morgan')

router.post('/signup', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'User already exists',
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err })
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            })
            user
              .save()
              .then(result => {
                console.log('User', result)
                res.status(201).json({
                  message: 'User created successfully',
                })
              })
              .catch(err => {
                res.status(500).json({ error: err })
              })
          }
        })
      }
    })
})

router.post('/login', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(500).json({ error: err })
          } else {
            if (result) {
              // create jwt token
              const token = jwt.sign(
                {
                  userId: user[0]._id,
                  email: user[0].email,
                },
                'secretkey',
                {
                  expiresIn: 60 * 60 * 24,
                }
              )
              res.status(200).json({
                message: 'User logged in successfully',
                token: token,
              })
            } else {
              res.status(401).json({
                message: 'Invalid credentials',
              })
            }
          }
        })
      } else {
        res.status(401).json({
          message: 'Invalid credentials',
        })
      }
    })
})

router.delete('/:userId', (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted successfully',
      })
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

module.exports = router
