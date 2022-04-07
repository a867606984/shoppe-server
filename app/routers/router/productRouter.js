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
   *      product:
   *        type: 'object'
   *        properties:
   *          product_name:
   *            type: "string"
   *            description: 商品名称
   *          product_title:
   *            type: "string"
   *            description: 商品简介标题
   *          category_id:
   *            type: "number"
   *            description: 分类ID
   *          price:
   *            type: "number"
   *            description: 商品销售价格
   *          line_price:
   *            type: "number"
   *            description: 商品划线价
   *          is_hot:
   *            type: "number"
   *            description: 是否热门： 0否，1是
   *          publish_status:
   *            type: "number"
   *            description: 上下架状态：0下架，1上架
   *            default: 1
   *          audit_status:
   *            type: "number"
   *            description: 审核状态：0未审核，1已审核
   *            default: 1
   *          is_banner:
   *            type: "number"
   *            description: 是否为轮播图：1是，0否
   *          banner_url:
   *            type: "string"
   *            description: 轮播图片路径
   *          memory:
   *            type: "string"
   *            description: 商品内存信息
   *          color:
   *            type: "string"
   *            description: 商品颜色
   *          production_date:
   *            type: "string"
   *            description: 生产日期
   *            default: Thu Mar 31 2022 16:26:03 GMT+0800 (中国标准时间)
   *          shelf_life:
   *            type: "number"
   *            description: 商品有效期
   *          descript:
   *            type: "string"
   *            description: 商品描述
   *      product_pic:
   *        type: 'array'
   *        items:
   *            type: 'object'  
   *            properties:
   *              pic_url:
   *                type: "string"
   *                description: 图片URL
   *                defalut: http://cpipi.top/image/myshoppe/
   *              pic_desc:
   *                type: "string"
   *                description: 图片描述
   *              is_master:
   *                type: "number"
   *                description: 是否主图：0.非主图,1.主图
   *                defalut: 0
   *              pic_order:
   *                type: "number"
   *                description: 图片排序
   *                defalut: 0
   *              pic_status:
   *                type: "number"
   *                description: 图片是否有效：0无效 1有效
   *                defalut: 1
   *  getProductListParam:
   *    properties:
   *      pageSize:
   *        type: "number"
   *        description: 页数
   *      pageNum:
   *        type: "number"
   *        description: 页码
   *      is_hot:
   *        type: "number"
   *        description: 是否热门：1是，0否
   *        default:
   *      category_id:
   *        type: "number"
   *        description: 商品种类id
   *        default:
   *      query:
   *        type: "string"
   *        description: 查询参数
   *        default: ""
   *  collectProductParam:
   *    properties:
   *      product_id:
   *        type: "number"
   *        description: 商品id
   *      customer_id:
   *        type: "number"
   *        description: 用户id
   *      is_collect:
   *        type: "number"
   *        description: 是否收藏：0取消，1收藏
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
  .post('/product/getProductBySearch', productController.GetProductBySearch)
  /**
   * @swagger
   * /product/getProductList:
   *   post:
   *     summary: 获取商品列表
   *     description: ''
   *     tags:
   *       - 商品接口
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         description: 
   *         schema:
   *          $ref: '#/definitions/getProductListParam'
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .post('/product/getProductList', productController.GetProductList)
  /**
   * @swagger
   * /product/getCategory:
   *   get:
   *     summary: 获取商品种类
   *     description: ''
   *     tags:
   *       - 商品接口
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .get('/product/getCategory', productController.GetCategory)
  /**
   * @swagger
   * /product/getDetails:
   *   get:
   *     summary: 获取商品详情
   *     description: ''
   *     tags:
   *       - 商品接口
   *     parameters:
   *       - name: product_id
   *         in: query
   *         required: true
   *         description: 
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .get('/product/getDetails', productController.GetDetails)
  /**
   * @swagger
   * /product/getDetailsPicture:
   *   get:
   *     summary: 获取商品图片
   *     description: ''
   *     tags:
   *       - 商品接口
   *     parameters:
   *       - name: product_id
   *         in: query
   *         required: true
   *         description: 
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .get('/product/getDetailsPicture', productController.GetDetailsPicture)
  /**
   * @swagger
   * /product/collect:
   *   post:
   *     summary: 商品收藏
   *     description: ''
   *     tags:
   *       - 商品接口
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         description: 
   *         schema:
   *          $ref: '#/definitions/collectProductParam'
   *     responses:
   *       200:
   *         description: 成功获取
   */
   .post('/product/collect', productController.CollectProduct)
   /**
   * @swagger
   * /product/getUserCollect:
   *   get:
   *     summary: 获取该用户商品收藏
   *     description: ''
   *     tags:
   *       - 商品接口
   *     parameters:
   *       - name: customer_id
   *         in: query
   *         required: true
   *         description: 
   *     responses:
   *       200:
   *         description: 成功获取
   */
  .get('/product/getUserCollect', productController.GetUserCollect)
  
module.exports = productRouter;