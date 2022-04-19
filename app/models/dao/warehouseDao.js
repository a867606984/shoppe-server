/*
 * @Description: 库存模块数据持久层
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 02:12:30
 */
const db = require('./db');

module.exports = {

  // 连接数据库根据仓库id和产品ID和数量 添加库存
  AddProduct: async ({ product_id, w_id, count }) => {
    return await db.warehouse_product.create({
      product_id,
      w_id,
      current_cnt: count
    })
  },
  // 连接数据库根据产品ID查询库存信息
  GetProductInfo: async (product_id) => {
    return await db.warehouse_product.findOne({
      where: {
        product_id
      }
    })
  },
  // 连接数据库根据产品ID查询库存信息
  updateWarehouse: async (product_id, decrCount, isTransations) => {
    
  }
}