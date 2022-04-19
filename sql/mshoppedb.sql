/*
 Navicat Premium Data Transfer

 Source Server         : test01
 Source Server Type    : MySQL
 Source Server Version : 50730
 Source Host           : localhost:3306
 Source Schema         : mshoppedb

 Target Server Type    : MySQL
 Target Server Version : 50730
 File Encoding         : 65001

 Date: 19/04/2022 18:56:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for customer_addr
-- ----------------------------
DROP TABLE IF EXISTS `customer_addr`;
CREATE TABLE `customer_addr`  (
  `customer_addr_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增主键ID',
  `customer_id` int(10) UNSIGNED NOT NULL COMMENT 'customer_login表的自增ID',
  `zip` int(6) NOT NULL COMMENT '邮编',
  `province` int(6) NOT NULL COMMENT '地区表中省份的ID',
  `city` int(6) NOT NULL COMMENT '地区表中城市的ID',
  `district` int(6) NOT NULL COMMENT '地区表中的区ID',
  `address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '具体的地址门牌号',
  `is_default` tinyint(4) NOT NULL COMMENT '是否默认',
  `modified_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '最后修改时间',
  PRIMARY KEY (`customer_addr_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '用户地址表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer_addr
-- ----------------------------
INSERT INTO `customer_addr` VALUES (1, 3, 518000, 440000, 440300, 440305, '高新园创维大厦18层', 1, '2022-04-19 18:54:29');

-- ----------------------------
-- Table structure for customer_inf
-- ----------------------------
DROP TABLE IF EXISTS `customer_inf`;
CREATE TABLE `customer_inf`  (
  `customer_inf_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增主键ID',
  `customer_id` int(10) UNSIGNED NOT NULL COMMENT 'customer_login表的自增ID',
  `customer_name` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '用户真实姓名',
  `identity_card_type` tinyint(4) NULL DEFAULT 1 COMMENT '证件类型：1 身份证，2 军官证，3 护照',
  `identity_card_no` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '证件号码',
  `mobile_phone` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '手机号',
  `customer_email` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '邮箱',
  `gender` char(1) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '性别',
  `register_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '注册时间',
  `birthday` datetime(0) NULL DEFAULT NULL COMMENT '会员生日',
  `user_money` decimal(8, 2) NULL DEFAULT 0.00 COMMENT '用户余额',
  `modified_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '最后修改时间',
  PRIMARY KEY (`customer_inf_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '用户信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer_inf
-- ----------------------------
INSERT INTO `customer_inf` VALUES (1, 3, NULL, 1, NULL, NULL, NULL, NULL, '2022-04-06 13:50:55', NULL, 0.00, '2022-04-06 13:50:55');

-- ----------------------------
-- Table structure for customer_login
-- ----------------------------
DROP TABLE IF EXISTS `customer_login`;
CREATE TABLE `customer_login`  (
  `customer_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `login_name` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '用户登录名',
  `password` char(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'md5加密的密码',
  `modified_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '最后修改时间',
  PRIMARY KEY (`customer_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '用户登录表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer_login
-- ----------------------------
INSERT INTO `customer_login` VALUES (3, 'liping', 'aa35144db2306fd7b459a159d1a40f2592aac10146fb5edf234810b4f7f1611a', '2022-04-06 13:50:55');

-- ----------------------------
-- Table structure for order_cart
-- ----------------------------
DROP TABLE IF EXISTS `order_cart`;
CREATE TABLE `order_cart`  (
  `cart_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '购物车ID',
  `customer_id` int(10) UNSIGNED NOT NULL COMMENT '用户ID',
  `product_id` int(10) UNSIGNED NOT NULL COMMENT '商品ID',
  `product_amount` int(11) NOT NULL COMMENT '加入购物车商品数量',
  `price` decimal(8, 2) NULL DEFAULT NULL COMMENT '商品价格',
  `add_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '加入购物车时间',
  `modified_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '最后修改时间',
  PRIMARY KEY (`cart_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '购物车表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_cart
-- ----------------------------
INSERT INTO `order_cart` VALUES (3, 3, 2, 1, NULL, '2022-04-13 16:15:24', '2022-04-13 17:06:48');
INSERT INTO `order_cart` VALUES (5, 3, 4, 1, NULL, '2022-04-13 17:02:19', '2022-04-13 17:02:19');

-- ----------------------------
-- Table structure for order_detail
-- ----------------------------
DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE `order_detail`  (
  `order_detail_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '订单详情表ID',
  `order_id` int(10) UNSIGNED NOT NULL COMMENT '订单表ID',
  `product_id` int(10) UNSIGNED NOT NULL COMMENT '订单商品ID',
  `product_name` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '商品名称',
  `product_cnt` int(11) NOT NULL DEFAULT 1 COMMENT '购买商品数量',
  `product_price` decimal(8, 2) NOT NULL COMMENT '购买商品单价',
  `memory` varchar(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '商品内存',
  `color` varchar(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '商品颜色',
  `w_id` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '仓库ID',
  `modified_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '最后修改时间',
  PRIMARY KEY (`order_detail_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '订单详情表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_detail
-- ----------------------------
INSERT INTO `order_detail` VALUES (2, 2, 3, '12', 1, 11.00, NULL, NULL, 1, '2022-04-17 23:23:03');
INSERT INTO `order_detail` VALUES (3, 3, 3, '1545', 1, 11.00, NULL, NULL, 1, '2022-04-17 23:31:38');

-- ----------------------------
-- Table structure for order_master
-- ----------------------------
DROP TABLE IF EXISTS `order_master`;
CREATE TABLE `order_master`  (
  `order_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '订单ID',
  `order_sn` char(25) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '订单编号 yyyymmddnnnnnnnn',
  `customer_id` int(10) UNSIGNED NOT NULL COMMENT '下单人ID',
  `shipping_user` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收货人姓名',
  `province` smallint(6) NOT NULL COMMENT '省',
  `city` smallint(6) NOT NULL COMMENT '市',
  `district` smallint(6) NOT NULL COMMENT '区',
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '地址',
  `payment_method` tinyint(4) NOT NULL COMMENT '支付方式：1现金，2余额，3网银，4支付宝，5微信',
  `order_money` decimal(8, 2) NOT NULL DEFAULT 0.00 COMMENT '订单金额',
  `district_money` decimal(8, 2) NOT NULL DEFAULT 0.00 COMMENT '优惠金额',
  `shipping_money` decimal(8, 2) NOT NULL DEFAULT 0.00 COMMENT '运费金额',
  `payment_money` decimal(8, 2) NOT NULL DEFAULT 0.00 COMMENT '支付金额',
  `shipping_comp_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '快递公司名称',
  `shipping_sn` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '快递单号',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '下单时间',
  `shipping_time` datetime(0) NULL DEFAULT NULL COMMENT '发货时间',
  `pay_time` datetime(0) NULL DEFAULT NULL COMMENT '支付时间',
  `receive_time` datetime(0) NULL DEFAULT NULL COMMENT '收货时间',
  `order_status` tinyint(4) NOT NULL DEFAULT 2 COMMENT '订单状态： 1未支付，2待发货，3待接收，4已接收',
  `invoice_time` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '发票抬头',
  `modified_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '最后修改时间',
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '订单主表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_master
-- ----------------------------
INSERT INTO `order_master` VALUES (2, '22', 3, '212', 22, 2, 22, '22', 1, 0.00, 0.00, 0.00, 0.00, '22', '22', '2022-04-17 23:22:42', NULL, '2022-04-17 23:22:38', NULL, 2, NULL, '2022-04-17 23:22:42');
INSERT INTO `order_master` VALUES (3, '14', 3, '144', 22, 2, 22, '22', 1, 0.00, 0.00, 0.00, 0.00, '12', '12', '2022-04-17 23:31:05', NULL, '2022-04-17 23:31:01', NULL, 2, NULL, '2022-04-17 23:31:05');

-- ----------------------------
-- Table structure for product_category
-- ----------------------------
DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category`  (
  `category_id` int(10) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `category_desc` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `category_order` tinyint(4) NULL DEFAULT NULL,
  `category_status` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_category
-- ----------------------------
INSERT INTO `product_category` VALUES (1, '手机', NULL, 0, 1);
INSERT INTO `product_category` VALUES (2, '电视机', NULL, 0, 1);
INSERT INTO `product_category` VALUES (3, '空调', NULL, 0, 1);
INSERT INTO `product_category` VALUES (4, '洗衣机', NULL, 0, 1);
INSERT INTO `product_category` VALUES (5, '保护套', NULL, 0, 1);
INSERT INTO `product_category` VALUES (6, '保护膜', NULL, 0, 1);
INSERT INTO `product_category` VALUES (7, '充电器', NULL, 0, 1);
INSERT INTO `product_category` VALUES (8, '充电宝', NULL, 0, 1);

-- ----------------------------
-- Table structure for product_collect
-- ----------------------------
DROP TABLE IF EXISTS `product_collect`;
CREATE TABLE `product_collect`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品收藏ID',
  `customer_id` int(10) NOT NULL COMMENT '用户ID',
  `product_id` int(10) NOT NULL COMMENT '商品ID',
  `is_collect` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否收藏：1收藏，0取消',
  `collect_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '商品收藏时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '商品收藏表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_collect
-- ----------------------------
INSERT INTO `product_collect` VALUES (2, 3, 3, 1, '2022-04-07 13:53:59');
INSERT INTO `product_collect` VALUES (3, 3, 4, 1, '2022-04-07 14:01:46');

-- ----------------------------
-- Table structure for product_info
-- ----------------------------
DROP TABLE IF EXISTS `product_info`;
CREATE TABLE `product_info`  (
  `product_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  `product_core` char(25) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '商品编码',
  `product_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `product_title` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品简介标题',
  `category_id` smallint(5) NOT NULL COMMENT '种类ID',
  `price` decimal(8, 2) NOT NULL COMMENT '商品销售价格',
  `line_price` decimal(8, 2) NULL DEFAULT NULL COMMENT '商品划线价格',
  `is_hot` tinyint(4) NULL DEFAULT NULL COMMENT '是否热门： 0否，1是',
  `publish_status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '上下架状态：0下架1上架',
  `audit_status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '审核状态：0未审核，1已审核',
  `is_banner` tinyint(4) NULL DEFAULT NULL COMMENT '是否为轮播图：1是，0否',
  `banner_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '轮播图片路径',
  `memory` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品内存信息',
  `color` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品颜色',
  `production_date` datetime(0) NULL DEFAULT NULL COMMENT '生产日期',
  `shelf_life` int(11) NULL DEFAULT NULL COMMENT '商品有效期',
  `descript` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品描述',
  `indate` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '商品录入时间',
  `limit_num` smallint(4) UNSIGNED NOT NULL DEFAULT 2 COMMENT '商品限购数目',
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '商品信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_info
-- ----------------------------
INSERT INTO `product_info` VALUES (2, '010164872224337443', 'Redmi K30', '120Hz流速屏，全速热爱', 1, 2000.00, 1599.00, 1, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:19', 0, '120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67\'小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC', '2022-04-06 16:47:24', 2);
INSERT INTO `product_info` VALUES (3, '010164872247015644', 'Redmi K30 5G', '双模5G,120Hz流速屏', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:25', 0, '双模5G / 三路并发 / 高通骁龙765G / 7nm 5G低功耗处理器 / 120Hz高帧率流速屏 / 6.67\'小孔径全面屏 / 索尼6400万前后六摄 / 最高可选8GB+256GB大存储 / 4500mAh+30W快充 / 3D四曲面玻璃机身 / 多功能NFC', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (4, '010164872252992445', '小米CC9 Pro', '1亿像素,五摄四闪', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:33', 0, '1亿像素主摄 / 全场景五摄像头 / 四闪光灯 / 3200万自拍 / 10 倍混合光学变焦，50倍数字变焦 / 5260mAh ⼤电量 / 标配 30W疾速快充 / ⼩米⾸款超薄屏下指纹 / 德国莱茵低蓝光认证 / 多功能NFC / 红外万能遥控 / 1216超线性扬声器', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (5, '010164872261071046', 'Redmi 8', '5000mAh超长续航', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:39', 0, '5000mAh超长续航 / 高通骁龙439八核处理器 / 4GB+64GB', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (6, '010164872270936147', 'Redmi 8A', '5000mAh超长续航', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:44', 0, '5000mAh超长续航 / 高通骁龙439八核处理器 / 4GB+64GB / 1200万AI后置相', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (7, '010164872278885848', 'Redmi Note8 Pro', '6400万全场景四摄', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:48', 0, '6400万四摄小金刚拍照新旗舰超强解析力，超震撼', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (8, '010164872294177849', 'Redmi Note8', '千元4800万四摄', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:52', 0, '千元4800万四摄 | 高通骁龙665 | 小金刚品质保证', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (9, '010164872348108950', 'Redmi 7A', '小巧大电量 持久流畅', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:56', 0, '小巧大电量，持久又流畅骁龙8核高性能处理器 | 4000mAh超长续航 | AI人脸解锁 | 整机防泼溅', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (12, '010164879128926353', '小米电视4A 32英寸', '人工智能系统，高清液晶屏', 2, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:02', 0, '小米电视4A 32英寸 | 64位四核处理器 | 1GB+4GB大内存 | 人工智能系统', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (13, '010164879141437754', '小米全面屏电视E55A', '全面屏设计，人工智能语音', 2, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:06', 0, '全面屏设计 | 内置小爱同学 | 4K + HDR | 杜比DTS | PatchWall | 海量内容 | 2GB + 8GB大存储 | 64位四核处理器', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (14, '010164879409865455', '小米全面屏电视E65A', '全面屏设计，人工智能语音', 2, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:11', 0, '人工智能语音系统 | 海量影视内容 | 4K 超高清屏 | 杜比音效 | 64位四核处理器 | 2GB + 8GB大存储', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (15, '010164879411442456', '小米电视4X 43英寸', 'FHD全高清屏，人工智能语音', 2, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:15', 0, '人工智能语音系统 | FHD全高清屏 | 64位四核处理器 | 海量片源 | 1GB+8GB大内存 | 钢琴烤漆', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (16, '010164879412417457', '小米电视4C 55英寸', '4K HDR，人工智能系统', 2, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:19', 0, '人工智能 | 大内存 | 杜比音效 | 超窄边 | 4K HDR | 海量片源 | 纤薄机身| 钢琴烤漆', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (17, '010164879413530258', '小米电视4A 65英寸', '4K HDR，人工智能系统', 2, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:23', 0, '人工智能 | 大内存 | 杜比音效 | 超窄边 | 4K HDR | 海量片源 | 纤薄机身| 钢琴烤漆', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (18, '010164879415236059', '小米壁画电视 65英寸', '壁画外观，全面屏，远场语音', 2, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:28', 0, '纯平背板 | 通体13.9mm | 远场语音 | 4K+HDR | 杜比+DTS | 画框模式 | 内置小爱同学 | PatchWall | SoundBar+低音炮 | 四核处理器+大存储', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (19, '010164879416330960', '米家互联网空调C1（一级能效）', '变频节能省电，自清洁', 3, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:32', 0, '一级能效 | 1.5匹 | 全直流变频 | 高效制冷/热 | 静音设计 | 自清洁 | 全屋互联', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (20, '010164879417665161', '米家空调', '出众静音，快速制冷热', 3, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:53:00', 0, '大1匹 | 三级能效 | 静音 | 快速制冷热 | 广角送风 | 除湿功能 | 高密度过滤网 | 典雅外观', '2022-04-06 16:50:54', 2);
INSERT INTO `product_info` VALUES (21, '010164879419226262', '米家互联网洗烘一体机 Pro 10kg', '智能洗烘，省心省力', 4, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:53:05', 0, '国标双A+级洗烘能力 / 22种洗烘模式 / 智能投放洗涤剂 / 支持小爱同学语音遥控 / 支持OTA在线智能升级 / 智能空气洗 / 除菌率达99.9%+', '2022-04-06 16:50:54', 2);

-- ----------------------------
-- Table structure for product_pic_info
-- ----------------------------
DROP TABLE IF EXISTS `product_pic_info`;
CREATE TABLE `product_pic_info`  (
  `product_pic_id` int(10) NOT NULL AUTO_INCREMENT,
  `product_id` int(10) NOT NULL,
  `pic_desc` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `pic_url` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `is_master` tinyint(4) NULL DEFAULT 0,
  `pic_order` tinyint(4) NULL DEFAULT 0,
  `pic_status` tinyint(4) NULL DEFAULT 1,
  PRIMARY KEY (`product_pic_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_pic_info
-- ----------------------------
INSERT INTO `product_pic_info` VALUES (1, 1, '', 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/4b1f3d1bf1b9329ff2e7f398bafa8f84.jpg?thumb=1&w=1405&h=527&f=webp&q=90', 0, 0, 1);
INSERT INTO `product_pic_info` VALUES (2, 2, '', 'http://cpipi.top/image/myshoppe/1/Redmi-k30.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (3, 3, '', 'http://cpipi.top/image/myshoppe/1/Redmi-k30-5G.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (4, 4, '', 'http://cpipi.top/image/myshoppe/1/Mi-CC9.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (5, 5, '', 'http://cpipi.top/image/myshoppe/1/Redmi-8.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (6, 6, '', 'http://cpipi.top/image/myshoppe/1/Redmi-8A.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (7, 7, '', 'http://cpipi.top/image/myshoppe/1/Redmi-Note8-pro.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (8, 8, '', 'http://cpipi.top/image/myshoppe/1/Redmi-Note8.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (9, 9, '', 'http://cpipi.top/image/myshoppe/1/Redmi-7A.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (12, 12, '', 'http://cpipi.top/image/myshoppe/2/MiTv-4A-32.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (13, 13, '', 'http://cpipi.top/image/myshoppe/2/MiTv-4A-65.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (14, 14, '', 'http://cpipi.top/image/myshoppe/2/MiTv-E65A.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (15, 15, '', 'http://cpipi.top/image/myshoppe/2/MiTv-4X-43.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (16, 16, '', 'http://cpipi.top/image/myshoppe/2/MiTv-4C-55.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (17, 17, '', 'http://cpipi.top/image/myshoppe/2/MiTv-4A-65.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (18, 18, '', 'http://cpipi.top/image/myshoppe/2/MiTv-ArtTv-65.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (19, 19, '', 'http://cpipi.top/image/myshoppe/3/AirCondition-V1C1.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (20, 20, '', 'http://cpipi.top/image/myshoppe/3/AirCondition-V1C1.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (21, 21, '', 'http://cpipi.top/image/myshoppe/4/Washer-Pro-10.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (22, 22, '', 'http://cpipi.top/image/myshoppe/5/protectingShell-RedMi-K20&pro.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (23, 23, '', 'http://cpipi.top/image/myshoppe/5/protectingShell-Mi-9.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (24, 24, '', 'http://cpipi.top/image/myshoppe/5/protectingShell-Mi-CC9Pro.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (25, 25, '', 'http://cpipi.top/image/myshoppe/5/protectingShell-RedMi-K20.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (26, 26, '', 'http://cpipi.top/image/myshoppe/5/protectingShell-Mi-9SE.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (27, 27, '', 'http://cpipi.top/image/myshoppe/5/protectingShell-Mi-9-red.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (28, 28, '', 'http://cpipi.top/image/myshoppe/5/protectingShell-Mix-3.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (29, 29, '', 'http://cpipi.top/image/myshoppe/6/protectingMen-Mi-CC9.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (30, 30, '', 'http://cpipi.top/image/myshoppe/6/protectingMen-Mi-CC9e.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (31, 31, '', 'http://cpipi.top/image/myshoppe/7/charger-30w.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (32, 32, '', 'http://cpipi.top/image/myshoppe/7/charger-18w.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (33, 33, '', 'http://cpipi.top/image/myshoppe/7/charger-60w.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (34, 34, '', 'http://cpipi.top/image/myshoppe/7/charger-36w.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (35, 35, '', 'http://cpipi.top/image/myshoppe/7/charger-car.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (36, 36, '', 'http://cpipi.top/image/myshoppe/7/charger-car-37w.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (37, 37, '', 'http://cpipi.top/image/myshoppe/7/charger-tio.png', 0, 0, 0);
INSERT INTO `product_pic_info` VALUES (38, 38, '', 'http://cpipi.top/image/myshoppe/8/charger-10000mAh.png', 0, 0, 0);

-- ----------------------------
-- Table structure for shipping_info
-- ----------------------------
DROP TABLE IF EXISTS `shipping_info`;
CREATE TABLE `shipping_info`  (
  `ship_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `ship_name` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '物流公司名称',
  `ship_contact` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '物流公司联系人',
  `telephone` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '物流公司联系电话',
  `price` decimal(8, 2) NOT NULL DEFAULT 0.00 COMMENT '配送价格',
  `modified_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '最后修改时间',
  PRIMARY KEY (`ship_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '物流公司信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'chenping');

-- ----------------------------
-- Table structure for warehouse_info
-- ----------------------------
DROP TABLE IF EXISTS `warehouse_info`;
CREATE TABLE `warehouse_info`  (
  `w_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '仓库ID',
  `warehouse_sn` char(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '仓库编码',
  `warehoust_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '仓库名称',
  `warehouse_phone` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '仓库电话',
  `contact` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '仓库联系人',
  `province` smallint(6) NULL DEFAULT NULL COMMENT '省',
  `city` smallint(6) NULL DEFAULT NULL COMMENT '市',
  `distrct` smallint(6) NULL DEFAULT NULL COMMENT '区',
  `address` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '仓库地址',
  `warehouse_status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '仓库状态：0禁用，1启用',
  `modified_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '最后修改时间',
  PRIMARY KEY (`w_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '仓库信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of warehouse_info
-- ----------------------------
INSERT INTO `warehouse_info` VALUES (1, '12201', '深圳仓', '13030112233', '李萍', NULL, NULL, NULL, NULL, 1, '2022-04-12 15:03:00');

-- ----------------------------
-- Table structure for warehouse_product
-- ----------------------------
DROP TABLE IF EXISTS `warehouse_product`;
CREATE TABLE `warehouse_product`  (
  `wp_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品库存ID',
  `product_id` int(10) UNSIGNED NOT NULL COMMENT '商品ID',
  `w_id` smallint(5) UNSIGNED NOT NULL COMMENT '仓库ID',
  `current_cnt` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '当前商品数量',
  `lock_cnt` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '当前占用数据',
  `in_transit_cnt` int(10) UNSIGNED NULL DEFAULT 0 COMMENT '在途数据',
  `modified_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '最后修改时间',
  PRIMARY KEY (`wp_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '商品库存表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of warehouse_product
-- ----------------------------
INSERT INTO `warehouse_product` VALUES (1, 2, 1, 100, 0, 0, '2022-04-12 17:13:17');
INSERT INTO `warehouse_product` VALUES (2, 3, 1, 500, 0, 0, '2022-04-12 17:14:14');
INSERT INTO `warehouse_product` VALUES (3, 4, 1, 500, 0, 0, '2022-04-12 17:14:21');
INSERT INTO `warehouse_product` VALUES (4, 5, 1, 500, 0, 0, '2022-04-12 17:14:25');
INSERT INTO `warehouse_product` VALUES (5, 6, 1, 500, 0, 0, '2022-04-12 17:14:30');
INSERT INTO `warehouse_product` VALUES (6, 7, 1, 500, 0, 0, '2022-04-12 17:14:35');
INSERT INTO `warehouse_product` VALUES (7, 8, 1, 500, 0, 0, '2022-04-12 17:14:41');
INSERT INTO `warehouse_product` VALUES (8, 9, 1, 500, 0, 0, '2022-04-12 17:14:47');
INSERT INTO `warehouse_product` VALUES (9, 10, 1, 500, 0, 0, '2022-04-12 17:14:54');
INSERT INTO `warehouse_product` VALUES (10, 11, 1, 500, 0, 0, '2022-04-12 17:14:58');
INSERT INTO `warehouse_product` VALUES (11, 12, 1, 500, 0, 0, '2022-04-12 17:15:02');
INSERT INTO `warehouse_product` VALUES (12, 13, 1, 500, 0, 0, '2022-04-12 17:15:07');
INSERT INTO `warehouse_product` VALUES (13, 14, 1, 500, 0, 0, '2022-04-12 17:15:11');
INSERT INTO `warehouse_product` VALUES (14, 15, 1, 500, 0, 0, '2022-04-12 17:15:21');
INSERT INTO `warehouse_product` VALUES (15, 15, 1, 500, 0, 0, '2022-04-12 17:15:40');
INSERT INTO `warehouse_product` VALUES (16, 16, 1, 500, 0, 0, '2022-04-12 17:15:50');
INSERT INTO `warehouse_product` VALUES (17, 17, 1, 500, 0, 0, '2022-04-12 17:15:54');
INSERT INTO `warehouse_product` VALUES (18, 18, 1, 500, 0, 0, '2022-04-12 17:16:00');
INSERT INTO `warehouse_product` VALUES (19, 19, 1, 500, 0, 0, '2022-04-12 17:16:04');
INSERT INTO `warehouse_product` VALUES (20, 20, 1, 500, 0, 0, '2022-04-12 17:16:09');
INSERT INTO `warehouse_product` VALUES (21, 21, 1, 500, 0, 0, '2022-04-12 17:16:13');

SET FOREIGN_KEY_CHECKS = 1;
