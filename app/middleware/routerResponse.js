

module.exports = async function(ctx, next) {
  ctx.success = function(data = {}, msg = null , code = '001') {
    ctx.body = {
      code: code || '001',
      msg,
      data
    }
  }

  ctx.fail = function(msg = null, code = '002') {
    ctx.body = {
      code: code || '002',
      msg: msg
    }
  }

  await next()
}
