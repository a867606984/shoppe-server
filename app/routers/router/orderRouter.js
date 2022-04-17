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
   *      product_id:
   *        type: "string"
   *        description: 商品id
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