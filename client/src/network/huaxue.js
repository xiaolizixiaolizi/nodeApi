import { get } from './request'

export async function getHxData() {
  let res = await get('/huaxue')
  return res
}