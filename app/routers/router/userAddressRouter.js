/*
 * @Description: 用户模块路由
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-27 12:41:14
 */
const Router = require('koa-router');
const userAddressController = require('../../controllers/userAddressController')

let userAddressRouter = new Router();

/**
   * @swagger
   * definitions:
   *  addUserAddressParam:
   *    properties:
   *      customer_id:
   *        type: "number"
   *        description: 用户id
   *      province:
   *        type: "number"
   *        description: 省id
   *      city:
   *        type: "number"
   *        description: 市id
   *      district:
   *        type: "number"
   *        description: 地区id
   *      address:
   *        type: "string"
   *        description: 具体地址
   *      is_default:
   *        type: "number"
   *        description: 是否默认.  1是，0否
   *        default: 0
   *   
   */

 userAddressRouter
  /**
   * @swagger
   * /user/address/addUserAddress:
   *   post:
   *     summary: 添加用户地址
   *     description: ''
   *     tags:
   *       - 地址接口
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         description: 账号密码
   *         schema:
   *          $ref: '#/definitions/addUserAddressParam'
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .post('/user/address/addUserAddress', userAddressController.AddAddress)
  /**
   * @swagger
   * /user/address/getAddressById:
   *   get:
   *     summary: 根据用户id查询用户地址信息
   *     description: ''
   *     tags:
   *       - 地址接口
   *     parameters:
   *       - name: customer_id
   *         in: query
   *         required: true
   *         description: 用户id
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .get('/user/address/getAddressById', userAddressController.GetUserAddress)



module.exports = userAddressRouter;