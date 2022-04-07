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

 Date: 07/04/2022 11:24:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for product_collect
-- ----------------------------
DROP TABLE IF EXISTS `product_collect`;
CREATE TABLE `product_collect`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品收藏ID',
  `customer_id` int(10) NOT NULL COMMENT '用户ID',
  `product_id` int(10) NOT NULL COMMENT '商品ID',
  `is_collect` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否收藏：1收藏，0取消',
  `collect_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '商品收藏时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '商品收藏表' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
