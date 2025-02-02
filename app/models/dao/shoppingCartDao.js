/*
 * @Description: 购物车模块数据持久层
 * @Author: hai-27
 * @Date: 2020-02-19 16:17:19
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 15:58:55
 */
const db = require('./db.js');
const productDao = require('./productDao')
let Redis = require('../../middleware/RedisStore')
let redis = new Redis({db: 1}) //索引为1的redis数据库

module.exports = {
  // 获取购物车信息
  GetShoppingCart: async (customer_id) => {
    return await db.order_cart.findAll({
      where: {
        customer_id
      }
    })
  },
  // 查询用户的购物车的某个商品
  FindShoppingCart: async (customer_id, product_id) => {
    return await db.order_cart.findOne({
      where: {
        customer_id,
        product_id
      }
    })
  },
  // 新插入购物车信息
  AddShoppingCart: async (customer_id, product_id) => {
    let product = await productDao.GetProductById(product_id)
    console.log("????????0", product)
    if(product) {
      return await db.order_cart.create({
        product_amount: 1,
        customer_id,
        product_id,
        price: product.line_price
      })
    }
    return null;
  },
  // 更新购物车商品数量
  UpdateShoppingCart: async (NewNum, customer_id, product_id) => {
    return await db.order_cart.update({
        product_amount: NewNum,   
    }, {
      where: {
        customer_id,
        product_id
      }
    })
  },
  // 删除购物车信息
  DeleteShoppingCart: async (customer_id, product_id) => {
    return await db.order_cart.destroy({
      where: {
        customer_id,
        product_id
      }
    })
  }
}