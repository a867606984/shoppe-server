//https://sequelize.org/v6/index.html  文档

const { Sequelize, DataTypes, QueryTypes, Op  } = require('sequelize');
const { dbConfig } = require('../../../config');

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  operatorsAliases: {
    $like: Op.like,
    $and: Op.and
  }
});

const customerLogin = sequelize.define('customer_login', {
  customer_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  login_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.CHAR,
    allowNull: false
  },
},
{ 
  freezeTableName: true,
  timestamps: false,
}
);

const customer_inf = sequelize.define('customer_inf', {
  customer_inf_id: {
    type: DataTypes.INTEGER(10),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  customer_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  customer_name: {
    type: DataTypes.STRING(20),
  },
  identity_card_type: {
    type: DataTypes.TINYINT(4),
  },
  identity_card_no: {
    type: DataTypes.STRING(20),
  },
  mobile_phone: {
    type: DataTypes.INTEGER(10),
  },
  customer_email: {
    type: DataTypes.STRING(50),
  },
  gender: {
    type: DataTypes.CHAR(1),
  },
  register_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
},

{ 
  freezeTableName: true,
  timestamps: false,
}
);

const product_info = sequelize.define('product_info', {
  product_id: {
    type: DataTypes.INTEGER(10),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },  
  product_name: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  product_title: {
    type: DataTypes.STRING(30),
  },
  product_core: {
    type: DataTypes.CHAR(25),
    allowNull: false
  },
  category_id: {
    type: DataTypes.SMALLINT(5),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false
  },
  line_price: {
    type: DataTypes.DECIMAL(8, 2),
  },
  is_hot: {
    type: DataTypes.TINYINT(4),
  },
  publish_status: {
    type: DataTypes.TINYINT(4),
  },
  audit_status: {
    type: DataTypes.TINYINT(4),
  },
  is_banner: {
    type: DataTypes.TINYINT(4),
  },
  banner_url: {
    type: DataTypes.STRING,
  },
  memory  : {
    type: DataTypes.STRING(5),
  },
  color: {
    type: DataTypes.STRING(5),
  },
  production_date: {
    type: DataTypes.DATE
  },
  shelf_life: {
    type: DataTypes.INTEGER(11)
  },
  descript: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  indate: {
    type: DataTypes.DATE
  },
  limit_num: {
    type: DataTypes.SMALLINT(4)
  }

},
{ 
  freezeTableName: true,
  timestamps: false,
}
);

const product_pic_info = sequelize.define('product_pic_info', {
  product_pic_id: {
    type: DataTypes.INTEGER(10),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  pic_desc: {
    type: DataTypes.STRING(50),
  },
  pic_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_master: {
    type: DataTypes.TINYINT(4),
    defaultValue: 0
  },
  pic_order: {
    type: DataTypes.TINYINT(4),
    defaultValue: 0
  },
  pic_status: {
    type: DataTypes.TINYINT(4),
    defaultValue: 1
  },
},
{ 
  freezeTableName: true,
  timestamps: false,
}
);

const product_category = sequelize.define('product_category', {
  category_id: {
    type: DataTypes.INTEGER(10),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  category_name: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  category_desc: {
    type: DataTypes.STRING(50),
  },
  category_order: {
    type: DataTypes.TINYINT(4),
  },
  category_status: {
    type: DataTypes.TINYINT(4),
  },
},
{ 
  freezeTableName: true,
  timestamps: false,
}
);

const product_collect = sequelize.define('product_collect', {
  id: {
    type: DataTypes.INTEGER(10),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  customer_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  is_collect: {
    type: DataTypes.TINYINT(1),
    defaultValue: 1
  },
},
{ 
  freezeTableName: true,
  timestamps: false,
}
);

const warehouse_product = sequelize.define('warehouse_product', {
  wp_id: {
    type: DataTypes.INTEGER(10),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  w_id: {
    type: DataTypes.SMALLINT(5),
    allowNull: false
  },
  current_cnt: {
    type: DataTypes.TINYINT(1),
    allowNull: false
  },
},
{ 
  freezeTableName: true,
  timestamps: false,
}
);

const order_cart = sequelize.define('order_cart', {
  cart_id: {
    type: DataTypes.INTEGER(10),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  customer_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  product_amount: {
    type: DataTypes.TINYINT(11),
    allowNull: false
  },

},
{ 
  freezeTableName: true,
  timestamps: false,
}
);

const order_master = sequelize.define('order_master', {
  order_id: {
    type: DataTypes.INTEGER(10),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  order_sn: {
    type: DataTypes.CHAR(25),
    allowNull: false
  },
  customer_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  shipping_user: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  province: {
    type: DataTypes.SMALLINT(6),
    allowNull: false
  },
  city: {
    type: DataTypes.SMALLINT(6),
    allowNull: false
  },
  district: {
    type: DataTypes.SMALLINT(6),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  payment_method: {
    type: DataTypes.TINYINT(4),
    allowNull: false
  },
  district_money: {
    type: DataTypes.DECIMAL(8, 2),
  },
  shipping_money: {
    type: DataTypes.DECIMAL(8, 2),
  },
  payment_money: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false
  },
  shipping_comp_name: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  shipping_sn: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  pay_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  order_status: {
    type: DataTypes.TINYINT(4),
  },
  invoice_time: {
    type: DataTypes.STRING(100),
  },
},
{ 
  freezeTableName: true,
  timestamps: false,
}
);

const order_detail = sequelize.define('order_detail', {
  order_id: {
    type: DataTypes.INTEGER(10),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  product_cnt: {
    type: DataTypes.TINYINT(11),
    allowNull: false
  },
  product_price: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false
  },
},
{ 
  freezeTableName: true,
  timestamps: false,
}
);


(async () => {
  await sequelize.sync(); //参数force不能设置为true，不然会删除数据库数据！！！
  // 这里是代码
 
  await order_master.hasOne(order_detail, {
      foreignKey: 'order_id'
  });
  await order_detail.belongsTo(order_master, {
    foreignKey: 'order_id'
  });
})()

const query = function (sql, replacements, type = 'SELECT'){
  return new Promise((resolve, reject) => {
    sequelize.query(sql, { 
      replacements,
      type: QueryTypes[type] 
    }).then(res => {
      resolve(res)
    })
  })
}

module.exports = {
  sequelize,
  query,
  customerLogin,
  customer_inf,
  product_info,
  product_pic_info,
  product_category,
  product_collect,
  warehouse_product,
  order_cart,
  order_master,
  order_detail
}