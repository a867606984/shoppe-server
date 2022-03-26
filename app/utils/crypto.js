const crypto = require('crypto');
// const crypto = require('crypto');
const CRYPTO_SCERET_KEY = '#SU199410030731wen_hao$*@&'

/**
 * sha256 加密
 * @param {string} content 明文
 */
const _sha256 = (content) => {
  const sha256 = crypto.createHash('sha256')
  return sha256.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 明文
 */
const doCrypto = (content) => {
  const str = `password=${content}&key=${CRYPTO_SCERET_KEY}`
  return _sha256(str)
}

module.exports = doCrypto