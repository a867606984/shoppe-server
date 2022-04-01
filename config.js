/*
 * @Description: 全局配置信息
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-28 23:21:30
 */
const path = require('path');

module.exports = {
  Port: 3000, // 启动端口
  staticDir: path.resolve('./public'), // 静态资源路径
  swaggerDir: path.resolve('./public/swagger'), //swagger路径
  uploadDir: path.join(__dirname, path.resolve('public/')), // 上传文件路径
  // 数据库连接设置
  dbConfig: {
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'mshoppedb'
  },
  //redis连接设置
  redisConfig: {
    host: "42.194.195.99",
    port: 9527,
    password: 'chenping960728'
  },
  COOKIEKEY: 'sess:store:', //cookie的key
  SESSIONKEY: 'sess:store:',
  product_pix: '010', //商品编号前缀
  productIncreKey: 'product_no_incre', //商品编号自增后缀
  order_pix: '011', //订单编号前缀
  orderIncreKey: 'order_no_incre', //订单编号自增后缀
  warehouse_pix: '012' //仓库编号前缀

}