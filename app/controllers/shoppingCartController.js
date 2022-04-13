/*
 * @Description: 购物车模块控制器
 * @Author: hai-27
 * @Date: 2020-02-19 16:15:14
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 15:58:46
 */
const shoppingCartDao = require('../models/dao/shoppingCartDao');
const productDao = require('../models/dao/productDao');
const checkLogin = require('../middleware/checkLogin');
const { product_good_pix } = require('../../config');

let methods = {
  /**
   * 生成购物车详细信息
   * @param {Object} data
   */
  ShoppingCartData: async data => {
    let shoppingCartData = [];
    for (let i = 0; i < data.length; i++) {
      const temp = data[i];
      const product = await productDao.GetProductById(temp.product_id);
      const product_pic = await productDao.GetDetailsPicture(temp.product_id)

      let shoppingCartDataTemp = {
        id: temp.id,
        product_id: temp.product_id,
        product_name: product.product_name,
        productImg: product_pic[0].pic_url,
        price: product.price,
        num: temp.product_amount,
        limit_num: product.limit_num,
        check: false
      };

      shoppingCartData.push(shoppingCartDataTemp);
    }
    return shoppingCartData;
  }
}

module.exports = {
  /**
   * 获取购物车信息
   * @param {Object} ctx
   */
  GetShoppingCart: async ctx => {
    let { customer_id } = ctx.request.query;
    
    // 获取购物车信息
    const shoppingCart = await shoppingCartDao.GetShoppingCart(customer_id);
    // 生成购物车详细信息
    const data = await methods.ShoppingCartData(shoppingCart);

    ctx.success(data)
  },
  /**
   * 插入购物车信息
   * @param {Object} ctx
   */
  AddShoppingCart: async ctx => {
    let { customer_id, product_id } = ctx.request.body;

    let tempShoppingCart = await shoppingCartDao.FindShoppingCart(customer_id, product_id);
    //判断该用户的购物车是否存在该商品
    if (tempShoppingCart) {
      //如果存在则把数量+1
      const tempNum = tempShoppingCart.product_amount + 1;

      const product = await productDao.GetProductById(tempShoppingCart.product_id);
      const limit_num = product.limit_num;

      //判断数量是否达到限购数量
      if (tempNum > limit_num) {
        ctx.fail('数量达到限购数量 ' + limit_num, '003')
        return;
      } 

      try {
        // 更新购物车信息,把数量+1
        const result = await shoppingCartDao.UpdateShoppingCart(tempNum, customer_id, product_id);

        if (result) {
          ctx.success(null, '该商品已在购物车，数量 +1')
          return;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //不存在则添加
      try {
        // 新插入购物车信息
        const res = await shoppingCartDao.AddShoppingCart(customer_id, product_id);
        // 判断是否插入成功
        if (res) {
          ctx.success(null, '添加购物车成功')
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }

    ctx.fail('添加购物车失败,未知错误', '005')
  },
  /**
   * 删除购物车信息
   * @param {Object} ctx
   */
  DeleteShoppingCart: async ctx => {
    let { customer_id, product_id } = ctx.request.body;


    // 判断该用户的购物车是否存在该商品
    let tempShoppingCart = await shoppingCartDao.FindShoppingCart(customer_id, product_id);

    if (tempShoppingCart) {
      // 如果存在则删除
      try {
        const result = await shoppingCartDao.DeleteShoppingCart(customer_id, product_id);
        // 判断是否删除成功
        if (result) {
          ctx.success(null, '删除购物车成功')
          return;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // 不存在则返回信息
      ctx.fail('该商品不在购物车')
    }
  },
  /**
   * 更新购物车商品数量
   * @param {Object} ctx
   */
  UpdateShoppingCart: async ctx => {
    let { customer_id, product_id, num } = ctx.request.body;

    // 判断数量是否小于1
    if (num < 1) {
      ctx.fail('数量不合法', '004')
      return;
    }
    // 判断该用户的购物车是否存在该商品
    let tempShoppingCart = await shoppingCartDao.FindShoppingCart(customer_id, product_id);

    if (tempShoppingCart) {
      // 如果存在则修改

      // 判断数量是否有变化
      if (tempShoppingCart.product_amount == num) {
      
        ctx.fail('数量没有发生变化', '003')
        return;
      }
      const product = await productDao.GetProductById(product_id);
      const limit_num = product.limit_num;
      // 判断数量是否达到限购数量
      if (num > limit_num) {

        ctx.fail('数量达到限购数量 ' + limit_num, '004')
        return;
      }

      try {
        // 修改购物车信息
        const result = await shoppingCartDao.UpdateShoppingCart(num, customer_id, product_id);
        // 判断是否修改成功
        if (result) {
          ctx.success(null, '修改购物车数量成功')
          return;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //不存在则返回信息
      ctx.fail('该商品不在购物车')
    }
  }
}