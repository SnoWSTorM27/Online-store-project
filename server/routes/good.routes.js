const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const adminMiddleware = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams: true })
const Good = require('../models/Good')

router.get('/', async (req, res) => {
  try {
    const list = await Good.find()
    res.send(list)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})
router.post('/', [authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const newGood = await Good.create({
      ...req.body
    })
    res.status(201).send(newGood)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
}])
router.patch('/:goodId', [authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { goodId } = req.params
      const updatedGood = await Good.findByIdAndUpdate(goodId, req.body, { new: true })
      res.send(updatedGood)

  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
}])
router.delete('/:goodId', [authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { goodId } = req.params
    const removedGood = await Good.findById(goodId)
    await removedGood.remove()
    return res.send(null)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
}])

module.exports = router