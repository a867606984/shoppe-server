/*
 * @Description: 用户模块路由
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-27 12:41:14
 */
const Router = require('koa-router');
const userController = require('../../controllers/userController')

let userRouter = new Router();

/**
   * @swagger
   * definitions:
   *  loginparam:
   *    properties:
   *      login_name:
   *        type: "string"
   *        description: 用户名
   *      password:
   *        type: "string"
   *        description: 密码
   *  usernameparam:
   *    properties:
   *      login_name:
   *        type: "string"
   *        description: 用户名
   *  userInfoByIdparam:
   *    properties:
   *      customer_id:
   *        type: "string"
   *        description: 用户名
   *   
   */

userRouter
  /**
   * @swagger
   * /users/login:
   *   post:
   *     summary: 用户登录
   *     description: ''
   *     tags:
   *       - 用户接口
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         description: 账号密码
   *         schema:
   *          $ref: '#/definitions/loginparam'
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .post('/users/login', userController.Login)
  .post('/users/miniProgramLogin', userController.miniProgramLogin)
  /**
   * @swagger
   * /users/findUserName:
   *   get:
   *     summary: 根据用户名查询用户信息
   *     description: ''
   *     tags:
   *       - 用户接口
   *     parameters:
   *       - name: login_name
   *         in: quer
   *         required: true
   *         description: 用户名
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .get('/users/findUserName', userController.FindUserName)
  /**
   * @swagger
   * /users/findUserInfoById:
   *   get:
   *     summary: 根据用户id查询用户信息
   *     description: ''
   *     tags:
   *       - 用户接口
   *     parameters:
   *       - name: customer_id
   *         in: query
   *         required: true
   *         description: 用户id
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .get('/users/findUserInfoById', userController.FindUserInfoById)
  /**
   * @swagger
   * /users/register:
   *   post:
   *     summary: 用户注册
   *     description: ''
   *     tags:
   *       - 用户接口
   *     parameters:
   *       - name: body
   *         in: body
   *         required: false
   *         description: 
   *         schema:
   *          $ref: '#/definitions/loginparam'
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .post('/users/register', userController.Register)
  .get('/users/sessionTest', userController.SessionTest)
  .get('/users/test', userController.Test)

module.exports = userRouter;