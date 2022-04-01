let { COOKIEKEY, SESSIONKEY } = require('../../config');

let Redis = require('./RedisStore')
let redis = new Redis()

const filterUrl = function (url) {

        let bool = false;
        let arr = [
            'users/login',
            'users/register',
            'users/findUserName',
            'users/findUserInfoById',
            'swagger',
            'test',
            '.png',
            '.css',
            '.js'
        ]

        arr.forEach(item => {
            if(url.indexOf(item) > -1){
                bool = true;
            }
        })
        
        return bool
}

module.exports = async function(ctx, next){

    console.log('/-------------')
    
    //过滤不需要验证的url
    if(filterUrl(ctx.url)){
        await next();
        return
    }

    // 判断用户是否登录，获取cookie里的SESSIONID
    const SESSIONID = ctx.cookies.get(COOKIEKEY);

    if (!SESSIONID) {
        console.log('没有携带SESSIONID，去登录吧~');
        ctx.status = 401;
        ctx.fail('请先登录')
        return
    }

    // 如果有SESSIONID，就去redis里拿数据
    const redisData = await redis.get(SESSIONKEY + SESSIONID);

    if (!redisData) {
        console.log('登录已过期');
        ctx.status = 401;
        ctx.fail('登录已过期,请先登录')
        return
    }

    if (redisData && redisData.uid) {
        console.log(`登录了，uid为${redisData.uid}`);
    }

    
    // 根据session里的uid 处理业务逻辑
    //

    await next();
}