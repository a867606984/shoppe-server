/*
 * @Description: 订单模块控制器
 * @Author: hai-27
 * @Date: 2020-02-24 16:35:22
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 14:32:16
 */
const orderDao = require('../models/dao/orderDao');
const shoppingCartDao = require('../models/dao/shoppingCartDao');
const warehouseDao = require('../models/dao/warehouseDao');
const productDao = require('../models/dao/productDao');
const checkLogin = require('../middleware/checkLogin');

module.exports = {
  /**
   * 获取用户的所有订单信息
   * @param {Object} ctx
   */
  GetOrder: async ctx => {
    let { user_id } = ctx.request.body;
    // 校验用户是否登录
    if (!checkLogin(ctx, user_id)) {
      return;
    }
    // 获取所有的订单id
    const ordersGroup = await orderDao.GetOrderGroup(user_id);

    // 该用户没有订单,直接返回信息
    if (ordersGroup.length == 0) {
      ctx.body = {
        code: '002',
        msg: '该用户没有订单信息'
      }
      return;
    }

    // 获取所有的订单详细信息
    const orders = await orderDao.GetOrder(user_id);

    let ordersList = [];
    // 生成每个订单的详细信息列表
    for (let i = 0; i < ordersGroup.length; i++) {
      const orderID = ordersGroup[i];
      let tempOrder = [];

      for (let j = 0; j < orders.length; j++) {
        const order = orders[j];

        if (orderID.order_id == order.order_id) {
          // 获取每个商品详细信息
          const product = await productDao.GetProductById(order.product_id);
          order.product_name = product[0].product_name;
          order.product_picture = product[0].product_picture;

          tempOrder.push(order);
        }
      }
      ordersList.push(tempOrder);
    }

    ctx.body = {
      code: '001',
      orders: ordersList
    }

  },
  /**
   * 添加用户订单信息
   * @param {Object} ctx
   */
  AddOrder: async (ctx) => {

    let { customer_id, products } = ctx.request.body;
    
    
    if(!customer_id || !products){
      ctx.fail('请填写正确的参数')
    }

    products = products.split(',').filter(item=>item); // [1, 2, 3]，商品id列表

    
    for(let i = 0; i < products.length; i++){
      let { product_name, limit_num } = await productDao.GetProductById(products[i]) //商品详情
      let whProduct = await warehouseDao.GetCacheProductCount(products[i]) //商品库存信息

      //检查库存是否卖完
      if(whProduct.current_cnt == 0){
        ctx.fail(`${product_name}： 该产品已经卖完了！`)
        return
      }

      //某件商品是否达到购买限制的数目
      let orderList = await orderDao.GetProductBuyCnt(customer_id, products[i]) //获取该用户该商品id的信息列表
      let sum = 0;
      orderList.forEach(item => {
        sum += item.product.cnt
      })
      if(sum >= limit_num) {
        ctx.fail(`${product_name}： 该产品你已超出购买数目！`)
        return 
      }

      //购买数 是否  超过了  库存数
      let { product_amount } = await shoppingCartDao.FindShoppingCart(customer_id, products[i]); //获取该用户该商品购物车信息
      if(product_amount > whProduct.current_cnt){
        ctx.fail(`${product_name}： 该产品仅剩${whProduct.current_cnt}！`)
        return 
      }


    }

    
    


  }
}