/*
 * @Description: 用户模块路由
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-27 12:41:14
 */
const Router = require('koa-router');
const warehouseController = require('../../controllers/warehouseController')

let warehouseRouter = new Router();

/**
   * @swagger
   * definitions:
   *  addProductCountParam:
   *    properties:
   *      product_id:
   *        type: "number"
   *        description: 产品id
   *      w_id:
   *        type: "number"
   *        description: 仓库id
   *      count:
   *        type: "number"
   *        description: 数量
   *   
   */

warehouseRouter
  /**
   * @swagger
   * /warehouse/addProductCount:
   *   post:
   *     summary: 添加库存
   *     description: ''
   *     tags:
   *       - 仓库接口
   *     parameters:
   *       - name: body
   *         in: body
   *         required: false
   *         description: 
   *         schema:
   *          $ref: '#/definitions/addProductCountParam'
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .post('/warehouse/addProductCount', warehouseController.AddProductCount)
 

module.exports = warehouseRouter;