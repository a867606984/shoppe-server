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
const addressDao = require('../models/dao/addressDao');
const shippingDao = require('../models/dao/shippingDao');
const productDao = require('../models/dao/productDao');
const checkLogin = require('../middleware/checkLogin');

const db = require('../models/dao/db')


//初始化redis分布式锁
const Redis = require('../middleware/RedisStore');
const { default: Redlock } = require('redlock');
const redis = new Redis({db: 1})
const redlock = new Redlock([redis.getRedis()])

const { order_no_pix, orderIncreKey} = require('../../config')

/*
*获取某个商品在订单的数量
*@param {Number}} customer_id
* @param {Number}} product_id
* @return {Number} sum
*/
const getProductCntByShopCart = async function (customer_id, product_id) {
  let sum = 0;
  let orderList = await orderDao.GetUserProductList(customer_id, product_id) //获取该用户该商品id的信息列表

  orderList.forEach(item => {
    sum += item.product_cnt
  })

  return sum;
}

/*
*获取当前用户购物车的总价格
*/
const getOrderTotalPrice = async function(customer_id, product_id) {
  let totalPrice = 0;
  const shopCartList = await shoppingCartDao.GetShoppingCart(customer_id);
  shopCartList.forEach(item => {
    totalPrice += item.product_amount * item.price;
  })

  return totalPrice;
}

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
    let params = ctx.request.body
    
    if(!customer_id || !products){
      ctx.fail('请填写正确的参数')
    }

    products = products.split(',').filter(item=>item); // [1, 2, 3]，商品id列表

    
    for(let i = 0; i < products.length; i++){
      let product_id = products[i];

      let { product_name, limit_num } = await productDao.GetProductById(product_id) //商品详情
      let whProduct = await warehouseDao.GetProductInfo(product_id) //商品库存信息

      //检查库存是否卖完
      if(whProduct.current_cnt == 0){
        ctx.fail(`${product_name}： 该产品已经卖完了！`)
        return
      }

      //某件商品是否达到购买限制的数目
      let sum = await getProductCntByShopCart(customer_id, product_id);
      if(sum >= limit_num) {
        ctx.fail(`${product_name}： 该产品你已超出购买数目！`)
        return 
      }

      //购买数 是否  超过了  库存数
      let { product_amount } = await shoppingCartDao.FindShoppingCart(customer_id, product_id); //获取该用户该商品购物车信息
      if(product_amount > whProduct.current_cnt){
        ctx.fail(`${product_name}： 该产品仅剩${whProduct.current_cnt}件！`)
        return 
      }

    }

    let lock = null
    let t = null
    
    try {
      //获取锁
      lock = await redlock.acquire(["goods_lock"], 10000);

      // Extend the lock.
      // lock = await lock.extend(5000);
      
      let addrObj = await addressDao.GetUserAddressById(params.customer_addr_id); //获取地址
      if(!addrObj){
        ctx.fail("未获取到收货人信息")
        throw new Error('未获取到收货人信息')
      }
      
      let shipping = await shippingDao.GetShipInfoById(1) //获取快递公司名称
      if(!shipping){
        ctx.fail("未获取到快递公司信息")
        throw new Error('未获取到快递公司信息')
      }
      
      let payment_money = await getOrderTotalPrice(customer_id) - params.district_money + params.shipping_money //总金额 - 优惠金额 + 运费金额

      //开启mysql事务
      t = await db.sequelize.transaction()

      let incre = await redis.get(orderIncreKey);
      await redis.incrBy(orderIncreKey, 1); //redis,订单编号后缀数字递增


      //下订单
      const { order_id } = await db.order_master.create({
        ...params,
        order_sn: `${order_no_pix}${Date.now()}${incre}`, //订单编号
        shipping_user: addrObj.shipping_user,
        province: addrObj.province,
        city: addrObj.city,
        district: addrObj.district,
        address: addrObj.address,
        shipping_comp_name: shipping.ship_name,
        payment_method: '4', //'支付方式：1现金，2余额，3网银，4支付宝，5微信'
        payment_money //支付金额
      }, { transaction: t })

      
      for(let i = 0; i < products.length; i++){
        let product_id = products[i]

        let sum = await getProductCntByShopCart(customer_id, product_id);
        let whProduct = await warehouseDao.GetProductInfo(product_id) //商品库存信息

        //减库存
        await db.warehouse_product.update({
          current_cnt: whProduct.current_cnt - sum
        }, {
          where: {
            product_id
          }
        }, {
          transaction: t
        })

        //新增订单详情
        let { product_amount, price } = await shoppingCartDao.FindShoppingCart(customer_id, product_id);
        let { product_name } = await productDao.GetProductById(product_id);
        await db.order_detail.create({
          order_id,
          product_id,
          product_name,
          product_cnt: product_amount,
          product_price: price
        }, { transaction: t })

        //删除购物车相应商品
        await db.order_cart.destroy({
          where: {
            customer_id,
            product_id
          }
        }, { transaction: t })
      }

      //提交事务
      await t.commit();

    } catch (error) {
      ctx.fail('服务器繁忙，请稍后重试');

      console.log(error)
      t.rollback();
      return
    } finally {
      
      await lock.release();
    }

    
    ctx.success(null, '下单成功！')

  }
}