/*
 * @Description: 订单模块路由
 * @Author: hai-27
 * @Date: 2020-02-24 16:29:26
 * @LastEditors: hai-27
 * @LastEditTime: 2020-04-07 22:52:48
 */
const Router = require('koa-router');
const orderController = require('../../controllers/orderController')

let orderRouter = new Router();

/**
   * @swagger
   * definitions:
   *  addOrderParam:
   *    properties:
   *      customer_id:
   *        type: "number"
   *        description: 用户id
   *      products:
   *        type: "string"
   *        description: 商品id，多个商品id用逗号隔开
   *      customer_addr_id:
   *        type: "number"
   *        description: 收货信息id
   *        default: 1
   *      payment_method:
   *        type: "number"
   *        description: 支付方式：1现金，2余额，3网银，4支付宝，5微信
   *        default: 4
   *      district_money:
   *        type: "number"
   *        description: 优惠金额
   *        default: 0.00
   *      shipping_money:
   *        type: "number"
   *        description: 运费金额
   *        default: 0.00
   *      order_status:
   *        type: "string"
   *        description: 订单状态： 1未支付，2待发货，3待接收，4已接收
   *        default: 2
   *   
   */
orderRouter
  .post('/user/order/getOrder', orderController.GetOrder)
  /**
   * @swagger
   * /user/order/addOrder:
   *   post:
   *     summary: 添加订单
   *     description: ''
   *     tags:
   *       - 订单接口
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         description: 
   *         schema:
   *          $ref: '#/definitions/addOrderParam'
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .post('/user/order/addOrder', orderController.AddOrder)

module.exports = orderRouter;