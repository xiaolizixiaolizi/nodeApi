// 连接数据库
const mongoose = require('mongoose')
const { DB_URL } = require('../config/params')
module.exports = new Promise((resolve, reject) => {
  // 数据库链接异步代码
  mongoose.set('useCreateIndex', true)
  mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.connection.on('open', err => {
    if (err) {
      return reject(err)
    }
    console.log('数据库连接成功')
    resolve()
  })
})
