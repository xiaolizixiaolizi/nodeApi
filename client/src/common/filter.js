// 只能用于差值表达式里面和v-bind 

/*
main.js导入
import MyFilter from '@/common/filter'
for (let key in MyFilter) {
  Vue.filter(key, MyFilter[key])
}
*/

import moment from "moment"
// import dateFormat from 'dateformat';
import {dataFormat} from './utils'

const vFilter = {
  // 性别：F/0—>女，M/1—>男
  sexFormat(val) {
    if (val == 0) return '女'
    if (val == 'F') return '女'
    if (val == 1) return '男'
    if (val == 'M') return '男'
  },
  // 0 false为未婚 1true已婚
  marryFormat(val) {
    if (val == 0) return '未婚'
    if (val == 1) return '已婚'
  },
  // 100 ￥100.00
  priceFormat(val) {
    return `￥${parseInt(val).toFixed(2)}`
  },

  //金钱三位一逗号，小数点保留两位  6449649.65998==> 6,449,649.66
  moneyFormat(val) {
    val = val.toString().replace(/\$|\,/g, '');
    if (isNaN(val)) {
      val = "0";
    }
    let sign = (val == (val = Math.abs(val)));
    val = Math.floor(val * 100 + 0.50000000001);
    let cents = val % 100;
    val = Math.floor(val / 100).toString();
    if (cents < 10) {
      cents = "0" + cents
    }
    for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
      val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
    }
    return (((sign) ? '' : '-') + val + '.' + cents);

  },

  //    2019-09-18T13:48:56.133Z String类型和date时间Object类型都可以 转为2018-11-16 10:55:58
  dataFormat1(timeStr, pattern = 'YYYY-MM-DD HH:MM:SS') {
    return moment(timeStr).format(pattern)

  },
  // 把时间搓变为日期字符串 pattern千万不要变动 。
  //  <h3>{{1568814505764|dataFormat2}}</h3>  2019-48-18 21:09:25
  dataFormat2(value, pattern = 'yyyy-mm-dd hh:MM:ss') {
    let date=new Date(value) //这一步是吧时间戳转日期对象
    // let date=new Date(value*1000) //时间戳是s 要转ms 都是有可能的 
    return dataFormat(date, pattern)
  },

  
  // 首字母大写
  capitalize(val) {
    if (!val) return ''
    return val.charAt(0).toUpperCase() + val.slice(1).toLocaleLowerCase()
  },

  //四位一空格
  fourSpace(val) {
    if (!val) return ''
    if (typeof val == 'string') return val.replace(/\s/g, '').replace(/(.{4})/g, "$1 ")
    if (typeof val == 'number') return val.toString().replace(/\s/g, '').replace(/(.{4})/g, "$1 ")
  },
  //电话号码中间4位隐藏，188****7983
  phoneFormat(val) {
    if (!val) return ''
    return val.replace(/^(.{3})(?:\d+)(.{4})$/, "$1****$2")
  },
  //身份证中间7位变*
  idcardFormat(val) {
    if (!val) return ''
    return val.replace(/^(.{6})(?:\d+)(.{4})$/, "$1*******$2")
  },

  // 转百分比,acc为保留小数位 默认保留2位
  toPercent(val, acc) {
    let num = parseFloat(val);
    if (isNaN(num)) {
      num = 0;
    }
    let accuracy = parseInt(acc);
    if (isNaN(accuracy) || accuracy < 0 || accuracy > 10) {
      accuracy = 2;
    }
    return (num * 100).toFixed(accuracy) + "%"
  },
  // 12000=>1.2万
  toWan(val,acc=2){
    let num=parseFloat(val)/10000
    num=num%1==0?num:num.toFixed(acc) //整除原样输出。
    return `${num}万`
  },
  // true=>高 false=>低
  toGaoDi(val){
    return val?'高':'低'
  }
 
}
export default vFilter

