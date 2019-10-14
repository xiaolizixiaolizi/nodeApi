import { get } from './request'
export async function getGoodsDetail(id) {
   // http://123.207.32.32:8000/api/v1/detail?iid=1m745k0
  let res = await get('/detail', { iid: id })
  return res.result
}
// 因为res数据很多比较杂，所以需要挑选出需要的数据在返回。通过构造函数方式。也可以直接通过对象方式
// 好处是到时候直接把这个对象给解构赋值
export class GoodsDetail {
  constructor(itemInfo, columns, services) {
    this.banner = itemInfo.topImages
    this.desc = itemInfo.desc
    this.price = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
  }
}
// 商店信息
export class GoodsShop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}
// 商品参数信息
export class GoodsParams {
  constructor(info, rule) {
    // 有的info有images属性有的没有images
    this.image = info.images ? info.images[0] : null
    this.infos = info.set
    this.sizes = rule.tables[0]

  }
}