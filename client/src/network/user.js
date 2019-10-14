import { post } from "./request";


// 注册 http://localhost:3000/api/user/register
export async function checkReg(params = {}) {
  let result = await post('/user/register', params)
  return result
}

// 登录 
export async function checkLogin(params = {}) {
  let result = await post('/user/login', params)
  return result
}

