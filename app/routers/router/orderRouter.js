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
   *        type: "string"
   *        description: 用户id
   *      products:
   *        type: "array"
   *        description: 
   *        items: 
   *          type: "string"
   *          description: 商品id
   *      shipping_user:
   *        type: "string"
   *        description: 收货人姓名
   *      province:
   *        type: "number"
   *        description: 省
   *      city:
   *        type: "number"
   *        description: 市
   *      district:
   *        type: "number"
   *        description: 地区
   *      address:
   *        type: "string"
   *        description: 地址
   *      payment_method:
   *        type: "number"
   *        description: 支付方式
   *        default: 4
   *      district_money:
   *        type: "number"
   *        description: 优惠金额
   *        default: 0.00
   *      shipping_money:
   *        type: "number"
   *        description: 运费金额
   *        default: 0.00
   *      shipping_comp_name:
   *        type: "string"
   *        description: 快递公司名称
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