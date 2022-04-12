/*
 * @Description: 用户模块数据持久层
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 02:12:30
 */
const db = require('./db');
let Redis = require('../../middleware/RedisStore')
let redis = new Redis({db: 1}) //索引为1的redis数据库
const { product_good_pix } = require('../../../config');

module.exports = {

  // 连接数据库根据仓库id和产品ID和数量 添加库存
  AddProductCount: async ({ product_id, w_id, count }) => {
    let t = await db.sequelize.transaction()
    try {
      let result = await db.warehouse_product.create({
        product_id,
        w_id,
        current_cnt: count
      }, { transaction: t})

      let isSuccess = false;
      if(result){
        let redisParam = {
          product_id,
          w_id,
          is_valid: 1, //是否有效
          current_cnt: count
        }
        isSuccess = await redis.hmset(`${product_good_pix}${product_id}`, redisParam)
      }
      
      if(isSuccess){
        await t.commit();
        return true
      }else{
        t.rollback();
      }

    } catch (error) {
      console.log(error)
      t.rollback();
    }
    return false
  },

}