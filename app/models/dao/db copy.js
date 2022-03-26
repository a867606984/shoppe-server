/*
 * @Description: 数据库连接
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 13:20:11
 */
var mysql = require('mysql');
const { dbConfig } = require('../../../config');
var pool = mysql.createPool(dbConfig);

var db = {};

db.query = function (sql, params) {

  return new Promise((resolve, reject) => {
    // 取出链接
    pool.getConnection(function (err, connection) {

      if (err) {
        reject(err);
        return;
      }

      connection.query(sql, params, function (error, results, fields) {
        console.log(`${ sql }=>${ params }`);
        // 释放连接
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });

    });
  });
}

db.transaction = function(cb) {
  return  new Promise((resolve, reject) => {
    // 取出链接
    pool.getConnection(function (err, connection) {

      if (err) {
        reject(err);
        return;
      }

      connection.beginTransaction( err => {
        if(err) {
          return '开启事务失败'
        } else {
          resolve(connection);
          // query.then(res => {

          //   connection.commit((error) => {
          //     if(error) {
          //       console.log('事务提交失败')
          //     }
          //   })
          //   connection.release()  // 释放链接
          //   resolve({success: true})  // 返回数据库操作结果这里数据格式可根据个人或团队规范来定制

          // }).catch(err => {

          //   return connection.rollback(() => {
          //     console.log('插入失败数据回滚')
          //   })

          // })
          
        }
      })

    });
  })
}




// 导出对象
module.exports = db;
