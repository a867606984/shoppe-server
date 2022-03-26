const Redis = require('koa-redis');
let { redisConfig } = require('../../config');

class RedisStore {
    constructor() {
        this.redis = new Redis(redisConfig);
    }
 
    async get(sid, ctx) {
        let data = await this.redis.get(`${sid}`);
        return data;
    }
 
    async set(sid, val, maxAge) {
        try {
            console.log(`${sid}`);
            // Use redis set EX to automatically drop expired sessions
            await this.redis.set(`${sid}`, JSON.stringify(val), 'EX', maxAge);
        } catch (e) {}
        return sid;
    }
 
    async destroy(sid, ctx) {
        return await this.redis.destroy(`${sid}`);
    }
}
 
module.exports = RedisStore;