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

 Date: 07/04/2022 11:08:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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

SET FOREIGN_KEY_CHECKS = 1;
