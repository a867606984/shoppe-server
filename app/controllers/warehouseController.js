/*
 * @Description: 仓库模块控制器
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-27 16:03:09
 */
const warehouseDao = require('../models/dao/warehouseDao');
const { checkUserInfo, checkUserName } = require('../middleware/checkUserInfo');

module.exports = {

  /**
   * 根据仓库id和产品ID和数量添加库存
   * @param {Object} ctx
   */
  AddProduct: async ctx => {

    let { product_id, w_id, count } = ctx.request.body;
    
    if(!product_id || !w_id || !count){
      ctx.fail('参数不正确')
      return
    }
    let result = await warehouseDao.AddProduct(ctx.request.body)
    
    if(result) ctx.success();
    else ctx.fail('添加失败')
   
  },

};