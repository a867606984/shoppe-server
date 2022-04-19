/*
 * @Description: 商品模块数据持久层
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 15:42:52
 */
const db = require('./db.js');
const { product_no_pix, productIncreKey} = require('../../../config');
let Redis = require('../../middleware/RedisStore')
let redis = new Redis({db: 1}) //索引为1的redis数据库
const clearNull = require('../../utils/clearProtoOfNull')

module.exports = {
  // 添加商品
  AddProduct: async (product = {}, product_pic = []) => {
    let t = await db.sequelize.transaction()

    try {

      let incre = await redis.get(productIncreKey);

      let { product_id } = await db.product_info.create({
        ...product,
        indate: new Date(),
        product_core: `${product_no_pix}${(new Date()).getTime()}${incre}`
      }, { transaction: t})

      for(let i = 0; i < product_pic.length; i++){
        
        await db.product_pic_info.create({
          product_id,
          ...product_pic[i]
        }, { transaction: t})
       
      }
      
      await t.commit();

      //redis,商品编号后缀数字递增
      await redis.incrBy(productIncreKey, 1);

      return true
    } catch (error) {
      console.log(error)
      t.rollback();
      return false
    }
  },
  // 连接数据库获取商品分类
  GetCategory: async () => {
    return await db.product_category.findAll()
  },
  // 连接数据库根据条件获取商品列表
  GetProductList: async ({pageNum, pageSize, is_hot, category_id, query}) => {
    let where = {
        is_hot,
        category_id,
        product_name: {
          $like: `%${query}`  // LIKE '%query'
        },
        // [db.sequelize.Op.or]: {
        //   product_name: {
        //     [db.sequelize.Op.startsWith]: query  // LIKE 'query%'
        //   },
        //   product_title: {
        //     [db.sequelize.Op.startsWith]: query  // LIKE 'query%'
        //   } 
        // }
    }

    clearNull(where, [`${!query ? 'product_name' : null}`])

    return await db.product_info.findAll({
      attributes: ['product_id', 'product_name', 'product_title', 'category_id', 'is_hot'],
      where,
      offset: (pageNum - 1) * pageSize, 
      limit: pageSize - 1
    })
  },
  // 连接数据库根据商品分类名称获取分类id
  GetCategoryId: async (categoryName) => {
    const sql = "select * from category where category_name = ?";
    const category = await db.query(sql, [categoryName]);
    return category[0].category_id;
  },
  // 连接数据库,根据商品分类id获取首页展示的商品信息
  GetPromoProduct: async (categoryID) => {
    const sql = "select * from product where category_id = ? order by product_sales desc limit 7";
    return await db.query(sql, categoryID);
  },
  // 连接数据库,分页获取所有的商品信息
  GetAllProduct: async (offset = 0, rows = 0) => {
    let sql = "select * from product ";
    if (rows != 0) {
      sql += "limit " + offset + "," + rows;
    }
    return await db.query(sql, []);
  },
  // 连接数据库,根据商品分类id,分页获取商品信息
  GetProductByCategory: async (categoryID, offset = 0, rows = 0) => {
    let sql = "select * from product where category_id = ? ";

    for (let i = 0; i < categoryID.length - 1; i++) {
      sql += "or category_id = ? ";
    }
    if (rows != 0) {
      sql += "order by product_sales desc limit " + offset + "," + rows;
    }

    return await db.query(sql, categoryID);
  },
  // 连接数据库,根据搜索条件,分页获取商品信息
  GetProductBySearch: async (search, offset = 0, rows = 0) => { 
    let sql = `select * from product where product_name like "%${ search }%" or product_title like "%${ search }%" or product_intro like "%${ search }%"`;

    if (rows != 0) {
      sql += "order by product_sales desc limit " + offset + "," + rows;
    }
    
    return await db.query(sql, []);
  },
  // 连接数据库,根据商品id,获取商品详细信息
  GetProductById: async (product_id) => {
    return await db.product_info.findOne({
      where: {
        product_id
      },
    })
  },
  // 连接数据库,根据商品id,获取商品图片
  GetDetailsPicture: async (product_id) => {
    return await db.product_pic_info.findAll({
      where: {
        product_id,
      },
    })
  },
  //连接数据库,根据商品id,用户id进行商品收藏
  CollectProduct: async ({ is_collect, product_id, customer_id }) => {
    return await db.product_collect.create({
      product_id,
      customer_id
    })
  },
  //连接数据库,根据商品id,用户id查找商品收藏
  GetCollectProduct: async ({ is_collect, product_id, customer_id }) => {
    return await db.product_collect.findOne({
      where: {
        product_id,
        customer_id
      }
    })
  },
  //连接数据库,根据商品id,用户id删除商品收藏
  DestroyCollectProduct: async ({ is_collect, product_id, customer_id }) => {
    return await db.product_collect.destroy({
      where: {
        $and: [
          { product_id },
          { customer_id },
        ]
      }
    })
  },
  GetUserCollect: async (customer_id) => {
    return await db.product_collect.findAll({
      where: {
        customer_id
      }
    })
  },
}