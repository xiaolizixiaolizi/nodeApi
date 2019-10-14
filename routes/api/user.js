// register login
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../../model/userModel')
const { secret } = require('../../config/params')
const passport = require('passport')

const router = express.Router()

// 注册
router.post('/register', (req, res) => {
  userModel.findOne({ stu_id: req.body.stu_id }).then(user => {
    if (user) {
      return res.json({ errCode: 100, message: '该学号以被注册,请立即登录' })
    }
    // 密码加密异步
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        // Store hash in your password DB.
        if (err) return console.log(err)
        req.body.password = hash
        // 写入数据库
        userModel.create(req.body).then(data => {
          res.json({ errCode: 0, message: '注册成功' })
        })
      })
    })

  })


})
// 登录
router.post('/login', (req, res) => {
  // 获取用户填入的id和密码
  const stu_id = req.body.stu_id
  const password = req.body.password
  // 查询数据库
  userModel.findOne({ stu_id: stu_id }).then(user => {
    if (!user) {
      return res.json({ stu_id: '学号不存在' })
    }
    // 对密码匹配 bcrypt.compare(用户输入明码 数据存的加密码）
    bcrypt.compare(password, user.password).then(isMatch => {
      // 匹配上isMatch是true
      if (!isMatch) {
        return res.json({ password: '密码输入错误' })
      }
      // 学号存在并且密码输入正确返回一个token
      // jwt.sign(自定义规则，加密名字如'secret'，{过期时间 s 3600*10}，箭头函数)
      let rule = { stu_id: user.stu_id, password: user.password, identity: user.identity, email: user.email }
      jwt.sign(rule, secret, { expiresIn: 3600*10 }, (err, token) => {
        if (err) return console.log(err)
        res.json({ success: true, token: `Bearer ${token}` })
      })
    })
  })


})

// 登陆态 当前已登录用户请求信息 需要验证用户token passport.authenticate('jwt', { session: false })代码
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  // console.log(req.user)
  //  返回用户信息
  let { stu_id, gender, email, name, age, identity } = req.user
  res.json({ stu_id, gender, email, name, age, identity })

})
module.exports = router