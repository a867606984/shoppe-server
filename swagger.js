const path = require('path')
const router = require('koa-router')() //引入路由函数
const swaggerJSDoc = require('swagger-jsdoc')
const { Port } = require('./config')

const swaggerDefinition = {
    info: {
        title: '个人网站api接口口',
        version: '1.0.0',
        description: 'API',
    },
    host: `localhost:${Port}`,
    basePath: '/', // Base path (optional)
    schemes: ['http', 'https'],
    securityDefinitions: {
        server_auth: {
          type: 'oauth2',
          description: '登录账号密码鉴权',
          tokenUrl: `http://localhost:${Port}/image/oauth`,
          flow: 'password',
          scopes: {
            token: 'modify pets in your account'
          }
        },
        token: {
          type: 'apiKey',
          name: 'token',
          in: 'header'
        }
      }
};
const options = {
    swaggerDefinition,
    apis: ['./app/routers/router/*.js'], // 写有注解的router的存放地址, 最好path.join()
};
const swaggerSpec = swaggerJSDoc(options)
// 通过路由获取生成的注解文件
router.get('/swagger.json', async function (ctx) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = swaggerSpec;
})
module.exports = router
