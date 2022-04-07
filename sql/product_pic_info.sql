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

 Date: 07/04/2022 11:08:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

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

SET FOREIGN_KEY_CHECKS = 1;
