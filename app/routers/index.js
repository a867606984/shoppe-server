/*
 * @Description: 汇总模块子路由
 * @Author: hai-27
 * @Date: 2020-04-07 22:51:48
 * @LastEditors: hai-27
 * @LastEditTime: 2020-04-07 22:57:35
 */
const Router = require('koa-router');

let Routers = new Router();

const userRouter = require('./router/userRouter');
const resourcesRouter = require('./router/resourcesRouter');
const productRouter = require('./router/productRouter');
const shoppingCartRouter = require('./router/shoppingCartRouter');
const orderRouter = require('./router/orderRouter');
const collectRouter = require('./router/collectRouter');
const warehouseRouter = require('./router/warehouseRouter');
const userAddressRouter = require('./router/userAddressRouter');

Routers.use(userRouter.routes());
Routers.use(resourcesRouter.routes());
Routers.use(productRouter.routes());
Routers.use(shoppingCartRouter.routes());
Routers.use(orderRouter.routes());
Routers.use(collectRouter.routes());
Routers.use(warehouseRouter.routes());
Routers.use(userAddressRouter.routes());

module.exports = Routers;