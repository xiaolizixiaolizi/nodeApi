const mongoose = require('mongoose')
const huaxueSchema = new mongoose.Schema({

  hxShi: { //化学式
    type: String,


  },
  hxName: { //中文名
    type: String,


  },
  hxSucheng: { //俗称
    type: String,


  },
  hxSHiLiang: { //化学适量
    type: Number,


  },
  hxMidu: { //密度
    type: String,


  },
  hxShui: { //水溶性
    type: String,


  },
  hxLook: { //外观
    type: String,
  },
  hxUsed: {//用途
    type: String,
  }


})
module.exports = mongoose.model('huaxue', huaxueSchema)
