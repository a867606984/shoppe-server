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

 Date: 23/03/2022 01:31:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for customer_login
-- ----------------------------
DROP TABLE IF EXISTS `customer_login`;
CREATE TABLE `customer_login`  (
  `customer_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `login_name` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '用户登录名',
  `password` char(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'md5加密的密码',
  `user_stats` tinyint(4) NOT NULL DEFAULT 1 COMMENT '用户状态',
  `modified_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '最后修改时间',
  PRIMARY KEY (`customer_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '用户登录表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer_login
-- ----------------------------
INSERT INTO `customer_login` VALUES (1, 'admin', 'aaa', 1, '2022-03-22 18:47:39');

SET FOREIGN_KEY_CHECKS = 1;
