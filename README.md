# shoppe-server

## 前言
- 采用 Koa 框架根据原型图写出商城的相关接口，实现高并发的商品查询、加入购物车、下订单、减库存、商品收藏等功能 
- Koa 项目中使用并封装中间件、RESTful API、Sequeize 库、 Redis 库
- 使用 Redis+Session 实践分布式的登陆会话共享，使用 Redlock 分布式锁实践高并发下商品的秒杀下单、减库存功能 
- Swagger 提供相关接口文档 


## 运行项目
```
1. Clone project

git clone https://github.com/a867606984/shoppe-server.git

2. Project setup

cd store-server
npm install

3. Run project

npm start
```
## Swagger接口文档

http://localhost:3000/swagger