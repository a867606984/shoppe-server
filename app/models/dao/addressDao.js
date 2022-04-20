/*
 * @Description: 用户地址模块数据持久层
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 02:12:30
 */
const db = require('./db');

module.exports = {
  //连接数据库查询用户的地址列表
  GetUserAddress: async (customer_id) => {
    return await db.customer_addr.findAll({
      where: {
        customer_id
      }
    })
  },
  //连接数据库查询用户的默认地址
  GetUserDefaultAddress: async (customer_id) => {
    return await db.customer_addr.findAll({
      where: {
        customer_id,
        is_default: 1  //1是， 0否
      }
    })
  },
  //连接数据库查询用户的地址
  GetUserAddressById: async (customer_addr_id) => {
    return await db.customer_addr.findAll({
      where: {
        customer_addr_id,
      }
    })
  },
  //连接数据库添加用户地址
  AddAddress: async (params) => {
 
  },
}