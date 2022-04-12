/*
 * @Description: 购物车模块路由
 * @Author: hai-27
 * @Date: 2020-02-19 16:11:18
 * @LastEditors: hai-27
 * @LastEditTime: 2020-04-07 22:53:07
 */
const Router = require('koa-router');
const shoppingCartController = require('../../controllers/shoppingCartController')

let shoppingCartRouter = new Router();
/**
   * @swagger
   * definitions:
   *  addShoppingCartParam:
   *    properties:
   *      customer_id:
   *        type: "number"
   *        description: 用户id
   *      product_id:
   *        type: "number"
   *        description: 产品id
   *   
   */
shoppingCartRouter
  /**
   * @swagger
   * /shoppingCart/getShoppingCart:
   *   get:
   *     summary: 获取该用户购物车
   *     description: ''
   *     tags:
   *       - 购物车接口
   *     parameters:
   *       - name: customer_id
   *         in: query
   *         required: true
   *         description: 
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .get('/user/shoppingCart/addShoppingCart', shoppingCartController.GetShoppingCart)
  /**
   * @swagger
   * /shoppingCart/addShoppingCart:
   *   post:
   *     summary: 添加商品到购物车
   *     description: ''
   *     tags:
   *       - 购物车接口
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         description: 
   *         schema:
   *          $ref: '#/definitions/addShoppingCartParam'
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .post('/user/shoppingCart/addShoppingCart', shoppingCartController.AddShoppingCart)
  .post('/user/shoppingCart/deleteShoppingCart', shoppingCartController.DeleteShoppingCart)
  .post('/user/shoppingCart/updateShoppingCart', shoppingCartController.UpdateShoppingCart)

module.exports = shoppingCartRouter;