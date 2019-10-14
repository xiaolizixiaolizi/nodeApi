const express = require('express')
const passport = require('passport')
const hxModel = require('../../model/huaxueModel')

const router = express.Router()
// 获取整个化学数据
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  hxModel.find({}).then(dataList => {
    // 空数据数组
    if (dataList == false) {
      return res.json({ message: '没有任何数据' })
    }
    res.json(dataList)
  })
})

module.exports = router


/*
单质
氧化物
酸
碱
盐
*/