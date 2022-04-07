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

 Date: 06/04/2022 16:56:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '商品信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_info
-- ----------------------------
INSERT INTO `product_info` VALUES (2, '010164872224337443', 'Redmi K30', '120Hz流速屏，全速热爱', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:19', 0, '120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67\'小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC', '2022-04-06 16:47:24');
INSERT INTO `product_info` VALUES (3, '010164872247015644', 'Redmi K30 5G', '双模5G,120Hz流速屏', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:25', 0, '双模5G / 三路并发 / 高通骁龙765G / 7nm 5G低功耗处理器 / 120Hz高帧率流速屏 / 6.67\'小孔径全面屏 / 索尼6400万前后六摄 / 最高可选8GB+256GB大存储 / 4500mAh+30W快充 / 3D四曲面玻璃机身 / 多功能NFC', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (4, '010164872252992445', '小米CC9 Pro', '1亿像素,五摄四闪', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:33', 0, '1亿像素主摄 / 全场景五摄像头 / 四闪光灯 / 3200万自拍 / 10 倍混合光学变焦，50倍数字变焦 / 5260mAh ⼤电量 / 标配 30W疾速快充 / ⼩米⾸款超薄屏下指纹 / 德国莱茵低蓝光认证 / 多功能NFC / 红外万能遥控 / 1216超线性扬声器', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (5, '010164872261071046', 'Redmi 8', '5000mAh超长续航', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:39', 0, '5000mAh超长续航 / 高通骁龙439八核处理器 / 4GB+64GB', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (6, '010164872270936147', 'Redmi 8A', '5000mAh超长续航', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:44', 0, '5000mAh超长续航 / 高通骁龙439八核处理器 / 4GB+64GB / 1200万AI后置相', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (7, '010164872278885848', 'Redmi Note8 Pro', '6400万全场景四摄', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:48', 0, '6400万四摄小金刚拍照新旗舰超强解析力，超震撼', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (8, '010164872294177849', 'Redmi Note8', '千元4800万四摄', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:52', 0, '千元4800万四摄 | 高通骁龙665 | 小金刚品质保证', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (9, '010164872348108950', 'Redmi 7A', '小巧大电量 持久流畅', 1, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '128G', '红', '2022-04-06 16:51:56', 0, '小巧大电量，持久又流畅骁龙8核高性能处理器 | 4000mAh超长续航 | AI人脸解锁 | 整机防泼溅', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (12, '010164879128926353', '小米电视4A 32英寸', '人工智能系统，高清液晶屏', 2, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:02', 0, '小米电视4A 32英寸 | 64位四核处理器 | 1GB+4GB大内存 | 人工智能系统', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (13, '010164879141437754', '小米全面屏电视E55A', '全面屏设计，人工智能语音', 2, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:06', 0, '全面屏设计 | 内置小爱同学 | 4K + HDR | 杜比DTS | PatchWall | 海量内容 | 2GB + 8GB大存储 | 64位四核处理器', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (14, '010164879409865455', '小米全面屏电视E65A', '全面屏设计，人工智能语音', 2, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:11', 0, '人工智能语音系统 | 海量影视内容 | 4K 超高清屏 | 杜比音效 | 64位四核处理器 | 2GB + 8GB大存储', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (15, '010164879411442456', '小米电视4X 43英寸', 'FHD全高清屏，人工智能语音', 2, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:15', 0, '人工智能语音系统 | FHD全高清屏 | 64位四核处理器 | 海量片源 | 1GB+8GB大内存 | 钢琴烤漆', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (16, '010164879412417457', '小米电视4C 55英寸', '4K HDR，人工智能系统', 2, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:19', 0, '人工智能 | 大内存 | 杜比音效 | 超窄边 | 4K HDR | 海量片源 | 纤薄机身| 钢琴烤漆', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (17, '010164879413530258', '小米电视4A 65英寸', '4K HDR，人工智能系统', 2, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:23', 0, '人工智能 | 大内存 | 杜比音效 | 超窄边 | 4K HDR | 海量片源 | 纤薄机身| 钢琴烤漆', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (18, '010164879415236059', '小米壁画电视 65英寸', '壁画外观，全面屏，远场语音', 2, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:28', 0, '纯平背板 | 通体13.9mm | 远场语音 | 4K+HDR | 杜比+DTS | 画框模式 | 内置小爱同学 | PatchWall | SoundBar+低音炮 | 四核处理器+大存储', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (19, '010164879416330960', '米家互联网空调C1（一级能效）', '变频节能省电，自清洁', 3, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:52:32', 0, '一级能效 | 1.5匹 | 全直流变频 | 高效制冷/热 | 静音设计 | 自清洁 | 全屋互联', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (20, '010164879417665161', '米家空调', '出众静音，快速制冷热', 3, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:53:00', 0, '大1匹 | 三级能效 | 静音 | 快速制冷热 | 广角送风 | 除湿功能 | 高密度过滤网 | 典雅外观', '2022-04-06 16:50:54');
INSERT INTO `product_info` VALUES (21, '010164879419226262', '米家互联网洗烘一体机 Pro 10kg', '智能洗烘，省心省力', 4, 2000.00, 1599.00, 0, 1, 1, 0, NULL, '', '红', '2022-04-06 16:53:05', 0, '国标双A+级洗烘能力 / 22种洗烘模式 / 智能投放洗涤剂 / 支持小爱同学语音遥控 / 支持OTA在线智能升级 / 智能空气洗 / 除菌率达99.9%+', '2022-04-06 16:50:54');

SET FOREIGN_KEY_CHECKS = 1;
