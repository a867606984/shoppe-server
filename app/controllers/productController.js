/*
 * @Description: 商品模块控制器
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 15:41:11
 */
const { result } = require('lodash');
const productDao = require('../models/dao/productDao');
module.exports = {
  /**
   * 添加商品
   * @param {Object} ctx
   */
   AddProduct: async ctx => {

    let { product, product_pic } = ctx.request.body

    if(!product || !product_pic){
      ctx.fail('请填写正确的参数');
      return
    }

    let result = await productDao.AddProduct(product, product_pic);

    if(result) ctx.success();
    else ctx.fail('添加失败');
  },
  /**
   * 获取商品分类
   * @param {Object} ctx
   */
  GetCategory: async ctx => {
    const result = await productDao.GetCategory();

    ctx.success(result)
  },
  /**
   * 根据条件获取商品列表
   * @param {Object} ctx
   */
  GetProductList: async ctx => {
    let { pageNum, pageSize, is_hot, category_id, query } = ctx.request.body;
    
    if(!Number(pageNum)  || !Number(pageSize)){
      ctx.fail("参数不正确");
      return 
    }

    let result = await productDao.GetProductList(ctx.request.body);

    if(!!result && result.length > 0){
      for(let i = 0; i < result.length; i++){
        let { product_id } = result[i];

        let picArr = await productDao.GetDetailsPicture(product_id);

        if(picArr.length > 0) result[i].setDataValue('pic_url', picArr[0].pic_url)
      }

    }

    ctx.success({
      pageNum,
      pageSize,
      total: result.length,
      content: result
    });

  },
  /**
   * 根据商品分类名称获取首页展示的商品信息
   * @param {Object} ctx
   */
  GetPromoProduct: async ctx => {
    let { categoryName } = ctx.request.body;
    // 根据商品分类名称获取分类id
    const categoryID = await productDao.GetCategoryId(categoryName);
    // 根据商品分类id获取首页展示的商品信息
    const Product = await productDao.GetPromoProduct(categoryID);

    ctx.body = {
      code: '001',
      Product
    }
  },
  /**
   * 根据商品分类名称获取热门商品信息
   * @param {Object} ctx
   */
  GetHotProduct: async ctx => {
    let { categoryName } = ctx.request.body;
    const categoryID = [];

    for (let i = 0; i < categoryName.length; i++) {
      // 根据商品分类名称获取分类id
      const category_id = await productDao.GetCategoryId(categoryName[i]);
      categoryID.push(category_id);
    }
    // 根据商品分类id获取商品信息
    const Product = await productDao.GetProductByCategory(categoryID, 0, 7);

    ctx.body = {
      code: '001',
      Product
    }
  },
  /**
   * 分页获取所有的商品信息
   * @param {Object} ctx
   */
  GetAllProduct: async ctx => {
    let { currentPage, pageSize } = ctx.request.body;
    // 计算开始索引
    const offset = (currentPage - 1) * pageSize;
    const Product = await productDao.GetAllProduct(offset, pageSize);
    // 获取所有的商品数量,用于前端分页计算
    const total = (await productDao.GetAllProduct()).length;
    ctx.body = {
      code: '001',
      Product,
      total
    }
  },
  /**
   * 根据分类id,分页获取商品信息
   * @param {Object} ctx
   */
  GetProductByCategory: async ctx => {
    let { categoryID, currentPage, pageSize } = ctx.request.body;
    // 计算开始索引
    const offset = (currentPage - 1) * pageSize;
    // 分页获取该分类的商品信息
    const Product = await productDao.GetProductByCategory(categoryID, offset, pageSize);
    // 获取该分类所有的商品数量,用于前端分页计算
    const total = (await productDao.GetProductByCategory(categoryID)).length;

    ctx.body = {
      code: '001',
      Product,
      total
    }
  },
  /**
   * 根据搜索条件,分页获取商品信息
   * @param {Object} ctx
   */
  GetProductBySearch: async ctx => {
    let { search, currentPage, pageSize } = ctx.request.body;
    // 计算开始索引
    const offset = (currentPage - 1) * pageSize;
    // 获取分类列表
    const category = await productDao.GetCategory();

    let Product;
    let total;

    for (let i = 0; i < category.length; i++) {
      // 如果搜索条件为某个分类名称,直接返回该分类的商品信息
      if (search == category[i].category_name) {
        // 获取该分类的商品信息
        Product = await productDao.GetProductByCategory(category[i].category_id, offset, pageSize);
        // 获取该分类所有的商品数量,用于前端分页计算
        total = (await productDao.GetProductByCategory(category[i].category_id)).length;

        ctx.body = {
          code: '001',
          Product,
          total
        }
        return;
      }
    }
    // 否则返回根据查询条件模糊查询的商品分页结果
    Product = await productDao.GetProductBySearch(search, offset, pageSize);
    // 获取模糊查询的商品结果总数
    total = (await productDao.GetProductBySearch(search)).length;

    ctx.body = {
      code: '001',
      Product,
      total
    }
  },
  /**
   * 根据商品id,获取商品详细信息
   * @param {Object} ctx
   */
  GetDetails: async ctx => {
    let { product_id } = ctx.request.query;

    if(!product_id){
      ctx.fail('请填写正确的参数')
      return
    }

    const result = await productDao.GetProductById(product_id);

    ctx.success(result)
  },
  /**
   * 根据商品id,获取商品图片,用于食品详情的页面展示
   * @param {Object} ctx
   */
  GetDetailsPicture: async ctx => {
    let { product_id } = ctx.request.query;

    if(!product_id){
      ctx.fail('请填写正确的参数')
      return
    }

    const result = await productDao.GetDetailsPicture(product_id);

    ctx.success(result)
  },
  /**
   * 根据商品id,用户id进行收藏
   * @param {Object} ctx
   */
  CollectProduct: async ctx => {
    let { is_collect, product_id, customer_id } = ctx.request.body;

    if(!product_id || !customer_id) {
      ctx.fail('请填写正确参数')
      return
    }

    let isCollect = await productDao.GetCollectProduct(ctx.request.body);

    let result = null;

    if(!isCollect && is_collect == 1){
      result = await productDao.CollectProduct(ctx.request.body);
    }

    if(isCollect && is_collect == 0){
      result = await productDao.DestroyCollectProduct(ctx.request.body);
    }

    ctx.success('操作成功');
  },
  /**
   * 根据用户id获取商品收藏
   * @param {Object} ctx
   */
   GetUserCollect: async ctx => {
    let { customer_id } = ctx.request.query;

    if(!customer_id) {
      ctx.fail('请填写正确参数')
      return
    }

    let result = await productDao.GetUserCollect(customer_id);

    for(let i = 0; i < result.length; i++){
      let { product_id } = result[i];

      let data = await productDao.GetProductById(product_id)

      if(data) {
        result[i].setDataValue('product_name', data.product_name);
        result[i].setDataValue('product_title', data.product_title);
        result[i].setDataValue('price', data.price);
      }
    }

    ctx.success(result);
  },
}