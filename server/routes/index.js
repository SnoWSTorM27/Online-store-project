const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes'))
router.use('/good', require('./good.routes'))
router.use('/category', require('./category.routes'))
router.use('/tab', require('./tab.routes'))
router.use('/user', require('./user.routes'))
router.use('/order', require('./order.routes'))

module.exports = router