const Redis = require('koa-redis');
let { redisConfig } = require('../../config');

class RedisStore {
    constructor(opts) {
        this.redis = new Redis({
            ...redisConfig,
            ...opts
        });
    }
 
    async get(sid, ctx) {
        let data = await this.redis.get(`${sid}`);
        return data;
    }
 
    async set(sid, val) {
        try {
            await this.redis.client.set(`${sid}`, JSON.stringify(val));
        } catch (e) {}
        return sid;
    }
    async setex(sid, val, maxAge){
        try {
            await this.redis.client.setex(`${sid}`, maxAge, maxAgeJSON.stringify(val));
        } catch (e) {}
        return sid;
    }
    async incrBy(sid, increment){
        try {
            await this.redis.client.incrby(sid, increment)

        } catch (e) {
            console.log(e, 'incrby:error')
        }
        return sid;
    }
    async hexists(sid, field) {
        let data = await this.redis.hexists(`${sid}`, field);
        return data;
    }
    async hmset(sid, fields = {}){
        try {
            await this.redis.client.hmset(`${sid}`, fields);
            return true
        } catch (e) {
            
        }
        return false;
    }
    async hget(sid, field) {
        let data = await this.redis.client.hget(`${sid}`, field);
        return data;
    }
    async hgetall(sid) {
        let data = await this.redis.client.hgetall(`${sid}`);
        return data;
    }
    async destroy(sid, ctx) {
        return await this.redis.destroy(`${sid}`);
    }
}
 
module.exports = RedisStore;