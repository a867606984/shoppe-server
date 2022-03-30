/*
 * @Description: 商品模块路由
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-04-07 22:52:56
 */
const Router = require('koa-router');
const productController = require('../../controllers/productController')

let productRouter = new Router();

/**
   * @swagger
   * definitions:
   *  addProductParam:
   *    properties:
   *      login_name:
   *        type: "string"
   *        description: 用户名
   *      password:
   *        type: "string"
   *        description: 密码
   *   
   */

productRouter
  /**
   * @swagger
   * /product/addProduct:
   *   post:
   *     summary: 添加商品
   *     description: ''
   *     tags:
   *       - 商品接口
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         description: 
   *         schema:
   *          $ref: '#/definitions/addProductParam'
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .post('/product/addProduct', productController.AddProduct)
  .post('/product/getAllProduct', productController.GetAllProduct)
  .post('/product/getPromoProduct', productController.GetPromoProduct)
  .post('/product/getHotProduct', productController.GetHotProduct)
  .post('/product/getProductByCategory', productController.GetProductByCategory)
  .post('/product/getCategory', productController.GetCategory)
  .post('/product/getProductBySearch', productController.GetProductBySearch)
  .post('/product/getDetails', productController.GetDetails)
  .post('/product/getDetailsPicture', productController.GetDetailsPicture)
  
module.exports = productRouter;