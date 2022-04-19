/*
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-04-07 23:40:51
 */
const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaBody = require('koa-body');
// const Session = require('koa-session');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const cors = require('@koa/cors');
const swagger = require('./swagger')
const { koaSwagger } = require('./public/swagger-ui')
const checkIsLogin = require('./app/middleware/checkIsLogin')
const routerResponse = require('./app/middleware/routerResponse')
let { Port, staticDir, swaggerDir, redisConfig, COOKIEKEY, SESSIONKEY } = require('./config');

let app = new Koa();

//响应ctx.body
app.use(routerResponse);

//跨域处理
app.use(cors());

// 处理异常
const error = require('./app/middleware/error');
app.use(error);

// 为静态资源请求重写url
const rewriteUrl = require('./app/middleware/rewriteUrl');
app.use(rewriteUrl);
// 使用koa-static处理静态资源
app.use(KoaStatic(staticDir));

// session
// const CONFIG = require('./app/middleware/session');
// app.keys = ['session app keys'];
// app.use(Session(CONFIG, app));

//session
app.keys = ['keys', 'keykeys'];
app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: '30 * 24 * 60 * 60 * 1000'
  },
  key: COOKIEKEY,
  prefix: SESSIONKEY,
  ttl: 30 * 24 * 60 * 60 * 1000,
  store: redisStore({
    ...redisConfig,
    
    
    // sentinels: [
    //   { host: '42.194.195.99', port: 9527 },
    // ],
    // name: 'mymaster'
  })
  
}))




// 判断是否登录
// const isLogin = require('./app/middleware/isLogin');
// app.use(isLogin);

app.use(checkIsLogin);

app.use(async (ctx, next) => {
  ctx.state.user = ctx.session.user;
  await next();
});


// 处理请求体数据
const koaBodyConfig = require('./app/middleware/koaBodyConfig');
app.use(KoaBody(koaBodyConfig));

//swagger
app.use(swagger.routes(), swagger.allowedMethods())
app.use(koaSwagger({
  routePrefix: '/swagger', // host at /swagger instead of default /docs
  swaggerOptions: {
    url: '/swagger.json', // example path to json 其实就是之后swagger-jsdoc生成的文档地址
 },
}))

// 使用路由中间件
const Routers = require('./app/routers');
app.use(Routers.routes()).use(Routers.allowedMethods());


// const TestRedis = require('ioredis');
// const { default: Redlock } = require('redlock');
// const client = new TestRedis({...redisConfig})
// const redlock = new Redlock([client])

// const testlock = async () => {
//   const lock = await redlock.acquire(["testLock111"], 5000);
//   await client.set('testLock', '444')
//   console.log('lock.value---------------', lock);
// }
// testlock();


app.listen(Port, () => {
  console.log(`服务器启动在${ Port }端口`);
});