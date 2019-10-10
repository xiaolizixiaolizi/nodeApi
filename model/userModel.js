// 建立表规则
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  stu_id: {
    type: String,
    required: true,//必填
    unique: true//限制学号唯一
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },
  gender: {
    type: Number,
    required: true,
    enum: [0, 1], //0男1女
    default: 0
  },
  date: {
    type: Date,
    default: Date.now //带默认值得不用填写
  },
  identity:{
    type:Number,
    required:true,
    enum:[0,1] //0是admin 1是学生用户
  },
  enable_flag: {
    type: String,
    default: 'Y' //逻辑删除
  }
})

module.exports = mongoose.model('user', userSchema)
