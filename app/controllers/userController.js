/*
 * @Description: 用户模块控制器
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-27 16:03:09
 */
const rp = require('request-promise');
const userDao = require('../models/dao/userDao');
const { checkUserInfo, checkUserName } = require('../middleware/checkUserInfo');
let {  COOKIEKEY, SESSIONKEY } = require('../../config');
const doCrypto = require('../utils/crypto')

module.exports = {

  /**
   * 用户登录
   * @param {Object} ctx
   */
  Login: async ctx => {

    let { login_name, password } = ctx.request.body;

    // 校验用户信息是否符合规则
    if (!checkUserInfo(ctx, login_name, password)) {
      ctx.fail('请填写正确的账号或密码')
      return;
    }
    
    let result = await userDao.FindUserName(login_name);
    
    //用户不存在
    if(result.length == 0 ){
      ctx.fail('该用户不存在')
      return
    }

    //用户存在

    if(doCrypto(password) != result[0].password){
      ctx.fail('密码不正确')
      return
    }

    ctx.session.uid = result[0].customer_id;
    
    ctx.success({
      id: result[0].customer_id,
      name: result[0].login_name,
      token: ctx.cookies.get(COOKIEKEY)
    }, '登录成功')
   
  },
  /**
   * 微信小程序用户登录
   * @param {Object} ctx
   */
  miniProgramLogin: async ctx => {
    const appid = 'wxeb6a44c58ffde6c6';
    const secret = '9c40f33cf627f2e3a42f38b25e0687cc';
    let { code } = ctx.request.body;

    const api = `https://api.weixin.qq.com/sns/jscode2session?appid=${ appid }&secret=${ secret }&js_code=${ code }&grant_type=authorization_code`;
    // 通过 wx.login 接口获得临时登录凭证 code 后
    // 传到开发者服务器调用此接口完成登录流程。
    const res = await rp.get({
      json: true,
      uri: api
    })
    const { session_key, openid } = res;

    // 连接数据库根据用户名查询用户信息
    let user = await userDao.FindUserName(openid);
    if (user.length === 0) {
      // 结果集长度为0则代表不存在该用户,先注册
      try {
        // 连接数据库插入用户信息
        let registerResult = await userDao.Register(openid, openid);
        if (registerResult.affectedRows === 1) {
          // 操作所影响的记录行数为1,则代表注册成功
          await login();// 登录
        }
      } catch (error) {
        console.log(error)
      }
    } else if (user.length === 1) {
      // 如果已经存在，直接登录
      await login();
    } else {
      ctx.body = {
        code: '500',
        msg: '未知错误'
      }
    }
    async function login () {
      // 连接数据库根据用户名和密码查询用户信息
      let tempUser = await userDao.Login(openid, openid);
      if (tempUser.length === 0) {
        // 登录失败
        ctx.body = {
          code: '004',
          msg: '登录失败'
        }
        return;
      }
      if (tempUser.length === 1) {
        // 登录成功
        const loginUser = {
          user_id: tempUser[0].user_id,
          openId: openid,
          sessionKey: session_key
        };
        // 保存用户信息到session
        ctx.session.user = loginUser;

        ctx.body = {
          code: '001',
          userId: tempUser[0].user_id,
          msg: '登录成功'
        }
        return;
      }
    }
  },
  /**
   * 查询是否存在某个用户名,用于注册时前端校验
   * @param {Object} ctx
   */
  FindUserName: async ctx => {

    let { login_name } = ctx.request.query;

    let result = await userDao.FindUserName(login_name); 

    ctx.success({
      login_name: result.length == 1 ? result[0].name : ''
    })
    return result;
  },
  /**
   * 查询用户信息
   * @param {Object} ctx
   */
  FindUserInfoById: async ctx => {
    let { customer_id } = ctx.request.query;
    
    let result = await userDao.FindUserInfoById(customer_id);

    if(!result){
      ctx.fail('没有该用户')
      return
    }
    
    let login_name = await userDao.FindUserNameById(customer_id);
    
    result.setDataValue('login_name', login_name)
     
    ctx.success(result)
  },
  SessionTest: async ctx => {
    if(ctx.session.viewCount == null){
      ctx.session.viewCount = 0;
    }
    ctx.session.viewCount++;
    ctx.body = {
      code: '001',
      msg: ctx.session.viewCount
    }

  },
  Test: async ctx => {
    ctx.success(a)
  },
  Register: async ctx => {
    let { login_name, password } = ctx.request.body;
   
    // 校验用户信息是否符合规则
    if (!checkUserInfo(ctx, login_name, password)) {
      return;
    }
    let result = await userDao.FindUserName(login_name)

    //用户存在
    if(result.length == 1){
      ctx.fail('用户已注册')
      return 
    }

    //用户不存在
    let isSucc = await userDao.Register(login_name, doCrypto(password));

    if(isSucc){
    
      ctx.success(null, '注册成功')
    }else{
      ctx.fail('注册失败')
    }

   
  }
};