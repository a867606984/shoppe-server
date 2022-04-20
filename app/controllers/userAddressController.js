/*
 * @Description: 用户地址模块控制器
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-27 16:03:09
 */
const addressDao = require('../models/dao/addressDao');

module.exports = {
  /**
   * 获取用户地址
   * @param {Object}} ctx 
   * @returns 
   */
  GetUserAddress: async ctx => {
    let { customer_id } = ctx.request.query
    if(!customer_id){
      ctx.fail('参数不正确');
      return
    }

    let result = await addressDao.GetUserAddress(customer_id);

    ctx.success(result)
  },
  /**
   * 添加用户地址
   * @param {Object}} ctx 
   * @returns 
   */
  AddAddress: async ctx => {

  }
};