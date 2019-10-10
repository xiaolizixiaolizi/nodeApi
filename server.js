const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const user = require('./routes/api/user')
const profile=require('./routes/api/profile')
// 引入数据库连接模块
const db = require('./db/index')

const app = express()
db.then(() => {
  app.use(bodyParser.urlencoded({ extended: false })) //解析 x-www-form-urlencoded
  app.use(bodyParser.json())
  // passport初始化
  app.use(passport.initialize())
  require('./config/passport')(passport)
  // 使用routes /api/user是前缀 http://localhost:3000/api/user/test
  app.use('/user', user)
  app.use('/profile',profile)
}).catch(err => { '数据库连接失败', err })

const port = process.env.PORT || 3000
app.listen(port, err => {
  if (err) {
    return console.log(err)
  }
  console.log(`服务器启动正常,port是${port}`)
})