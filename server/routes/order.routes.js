const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const adminMiddleware = require('../middleware/admin.middleware')
const router = express.Router({ mergeParams: true })
const Order = require('../models/Order')

router.get('/', [authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const list = await Order.find() 
    res.send(list)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
}])
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newOrder = await Order.create({
      ...req.body
    })
    res.status(201).send(newOrder)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params
      const list = await Order.find({ userId })
      res.send(list)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})

module.exports = router