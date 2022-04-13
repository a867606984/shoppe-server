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
   *        description: 商品id
   *  deleteShoppingCartParam:
   *    properties:
   *      customer_id:
   *        type: "number"
   *        description: 用户id
   *      product_id:
   *        type: "number"
   *        description: 商品id
   *  updateShoppingCartParam:
   *    properties:
   *      customer_id:
   *        type: "number"
   *        description: 用户id
   *      product_id:
   *        type: "number"
   *        description: 商品id
   *      num:
   *        type: "number"
   *        description: 商品数量
   *   
   */
shoppingCartRouter
  /**
   * @swagger
   * /user/shoppingCart/getShoppingCart:
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
  .get('/user/shoppingCart/getShoppingCart', shoppingCartController.GetShoppingCart)
  /**
   * @swagger
   * /user/shoppingCart/addShoppingCart:
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
  /**
   * @swagger
   * /user/shoppingCart/deleteShoppingCart:
   *   post:
   *     summary: 从购物车删除商品
   *     description: ''
   *     tags:
   *       - 购物车接口
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         description: 
   *         schema:
   *          $ref: '#/definitions/deleteShoppingCartParam'
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .post('/user/shoppingCart/deleteShoppingCart', shoppingCartController.DeleteShoppingCart)
  /**
   * @swagger
   * /user/shoppingCart/updateShoppingCart:
   *   post:
   *     summary: 从购物车更新商品
   *     description: ''
   *     tags:
   *       - 购物车接口
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         description: 
   *         schema:
   *          $ref: '#/definitions/updateShoppingCartParam'
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .post('/user/shoppingCart/updateShoppingCart', shoppingCartController.UpdateShoppingCart)

module.exports = shoppingCartRouter;