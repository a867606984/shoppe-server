/*
 * @Description: 物流公司模块数据持久层
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 02:12:30
 */
const db = require('./db');

module.exports = {
  //连接数据库查询物流公司信息
  GetShipInfoById: async (ship_id) => {
    return await db.shipping_info.findOne({
      where: {
        ship_id
      }
    })
  },
}