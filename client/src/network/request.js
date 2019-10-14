import axios from 'axios'
import qs from "qs"

import { Loading } from "element-ui"
import router from '../router'

let loading        //定义loading变量
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000 * 60,//60s

})
function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截 设置请求头  这些都是和node后台打交道
instance.interceptors.request.use(config => {


  startLoading() //加载动画
  let token = localStorage.getItem('userToken')
  if (token) {
    //在请求头部加上token 此时的token已经存了localStorage里面
    config.headers.Authorization = token
  }
  return config
})
// 响应拦截。就是走then方法之前先执行响应拦截
instance.interceptors.response.use(res => {
  endLoading()
  return res.data
}, err => {
  endLoading()
  // 获取错误状态码
  let { status } = err.response
  console.log(status)
  if (status == 401) { //401未授权，或者token已经过期
    localStorage.removeItem('userToken')
    // 跳转登录页面 不能是this.$router.push() this不是vue实例
    router.push({ name: 'login' })

  }
  return Promise.reject(err)
})

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    instance.get(url, {
      params: params
    }).then(res => resolve(res)).catch(err => reject(err))
  })
}

export function post(url, params = {}) {

  return new Promise((resolve, reject) => {
    instance.post(url, qs.stringify(params))
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
