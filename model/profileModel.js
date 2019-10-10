// 创建表规则
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  type: {
    type: String
  },
  describe: {
    type: String
  },
  income: {
    type: String,
    required: true,
   
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: { //备注
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);
