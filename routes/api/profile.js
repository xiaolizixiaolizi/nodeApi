const express = require('express')
const passport = require('passport')
const profileModel = require('../../model/profileModel')

const router = express.Router()
//创建添加信息接口信息（表格一列信息） 登录态
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  // 必须验证输入的数据

  let infoFields = {}
  let { type, describe, income, expend, cash, remark } = req.body
  infoFields.type = type || false
  infoFields.describe = describe || false
  infoFields.income = income || false
  infoFields.expend = expend || false
  infoFields.cash = cash || false
  infoFields.remark = remark || false
  profileModel.create(infoFields).then(data => res.json({ errCode: 0, msg: 'add成功' }))

})

// 获取所有列表信息（整个表格信息） http://localhost:3000/profile
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // find找到的是shuzu,找不到事[]
  profileModel.find({}).then(dataList => {
    // 如果是[] []==0/false true
    if (dataList == false) {
      return res.json({ err: 0, msg: '没有任何内容' })
    }
    res.json(dataList)
  })
})


//获取单个信息一行信息 参数路由
// 
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  profileModel.findById(req.params.id).then(data => {
    if (!data) {
      return res.json({ errCode: 0, msg: `id号${req.params.id}信息不存在` })
    }
    res.json(data)
  })
})

// 编辑信息接口 更新数据
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // 必须验证输入的数据
  let infoFields = {}
  let { type, describe, income, expend, cash, remark } = req.body
  infoFields.type = type || false
  infoFields.describe = describe || false
  infoFields.income = income || false
  infoFields.expend = expend || false
  infoFields.cash = cash || false
  infoFields.remark = remark || false
  //也就是说post请求也可以拿到params参数
  console.log(req.params.id)
  profileModel.updateOne({ _id: req.params.id }, infoFields).
    then(data => res.json({...data,errCode:0,msg:'信息更新成功'})).
    catch(err => res.json(err))

})
// 删除信息删除一条记录接口
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  profileModel.deleteOne({ _id: req.params.id })
    .then(data => { res.json({ ...data,errCode: 0, msg: '删除成功' }) })
    .catch(err => res.json(err))
})

module.exports = router //obj