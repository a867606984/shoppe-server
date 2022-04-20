const Redis = require('ioredis');
let { redisConfig } = require('../../config');

class RedisStore {
    constructor(opts) {
        this.redis = new Redis({
            ...redisConfig,
            ...opts
        });
    }
    getRedis(){
        return this.redis
    }
    async get(sid, ctx) {
        let data = await this.redis.get(`${sid}`);
        return data;
    }
    async set(sid, val) {
        try {
            await this.redis.set(`${sid}`, JSON.stringify(val));
        } catch (e) {}
        return sid;
    }
    async setex(sid, val, maxAge){
        try {
            await this.redis.setex(`${sid}`, maxAge, maxAgeJSON.stringify(val));
        } catch (e) {}
        return sid;
    }
    async incrBy(sid, increment){
        try {
            await this.redis.incrby(sid, increment)

        } catch (e) {
            console.log(e, 'incrby:error')
        }
        return sid;
    }
    async hexists(sid, field) {
        let data = await this.rediss(`${sid}`, field);
        return data;
    }
    async hmset(sid, fields = {}){
        try {
            await this.redis.hmset(`${sid}`, fields);
            return true
        } catch (e) {
            
        }
        return false;
    }
    async hget(sid, field) {
        let data = await this.redis.hget(`${sid}`, field);
        return data;
    }
    async hgetall(sid) {
        let data = await this.redis.hgetall(`${sid}`);
        return data;
    }
    async destroy(sid) {
        return await this.redis.del(`${sid}`);
    }
}
 
module.exports = RedisStore;