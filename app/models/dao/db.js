//https://sequelize.org/v6/index.html  文档

const { Sequelize, DataTypes, QueryTypes   } = require('sequelize');
const { dbConfig } = require('../../../config');

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
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
  mobile_email: {
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

(async () => {
  await sequelize.sync();
  // 这里是代码
 
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
  customer_inf
}