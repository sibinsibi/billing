

CREATE TABLE `brand_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand_id` varchar(500) NOT NULL,
  `brand_name` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO brand_master VALUES("1","BRD1","Fsfd");
INSERT INTO brand_master VALUES("2","BRD2","Kdk");
INSERT INTO brand_master VALUES("3","BRD3","Horlicks");
INSERT INTO brand_master VALUES("4","BRD4","Red chikke");
INSERT INTO brand_master VALUES("5","BRD5","Lop");
INSERT INTO brand_master VALUES("6","BRD6","Kj");
INSERT INTO brand_master VALUES("7","BRD7","uuuuuuuuu");
INSERT INTO brand_master VALUES("8","BRD8","kidu");
INSERT INTO brand_master VALUES("9","BRD9","Boost");
INSERT INTO brand_master VALUES("10","BRD10","Sisisis");
INSERT INTO brand_master VALUES("11","BRD11","Jillebi");



CREATE TABLE `company_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mob` varchar(500) NOT NULL,
  `land_phone` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(500) NOT NULL,
  `gst_no` varchar(500) NOT NULL,
  `address1` varchar(500) NOT NULL,
  `address2` varchar(500) NOT NULL,
  `place` varchar(500) NOT NULL,
  `pin` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO company_details VALUES("3","Wallmart","9393939393","47474747472","ss@dd.com","urur88","jdjd","sdkndknsd sds","kannur","890202");
INSERT INTO company_details VALUES("4","Wallmart","9393939393","47474747472","ss@dd.com","urur88","jdjd","sdkndknsd sds","kannur","890202");



CREATE TABLE `customer_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `c_id` varchar(500) NOT NULL,
  `c_name` varchar(500) NOT NULL,
  `mob` varchar(500) NOT NULL,
  `address` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO customer_master VALUES("1","CTR1","Him jim","838383838","djd");
INSERT INTO customer_master VALUES("2","CTR2","Sibin","878966547","");
INSERT INTO customer_master VALUES("3","CTR3","Sss","222222222","ccc");
INSERT INTO customer_master VALUES("4","CTR4","Lou","2212121212","");
INSERT INTO customer_master VALUES("5","CTR5","Xxxxxx","","");
INSERT INTO customer_master VALUES("6","CTR6","Aksj","8745214752","");



CREATE TABLE `gst` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `percentage` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO gst VALUES("1","5");
INSERT INTO gst VALUES("2","12");
INSERT INTO gst VALUES("6","22");
INSERT INTO gst VALUES("5","18");



CREATE TABLE `item_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `item_name` varchar(500) NOT NULL,
  `brand` varchar(500) NOT NULL,
  `unit` varchar(500) NOT NULL,
  `unit_price` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO item_master VALUES("1","ITM1","Horlicks","Horlicks","Bottle","200");
INSERT INTO item_master VALUES("2","ITM2","Boost","Boost","","0");
INSERT INTO item_master VALUES("3","ITM3","Chilli","Red chikke","Kg","250");
INSERT INTO item_master VALUES("4","ITM4","Sisis","Sisisis","","100");
INSERT INTO item_master VALUES("5","ITM5","Jillebi","Jillebiiii","Kg","0");
INSERT INTO item_master VALUES("6","ITM6","S","Horlicks","Bottle","0");



CREATE TABLE `item_price_details` (
  `item_id` varchar(500) NOT NULL,
  `name` varchar(500) NOT NULL,
  `brand` varchar(500) NOT NULL,
  `unit_price` double NOT NULL,
  `purchase_rate` double NOT NULL,
  `selling_price` double NOT NULL,
  `discount` double NOT NULL,
  `gst` double NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO item_price_details VALUES("ITM1","Horlicks","Horlicks","200","150","200","30","12");
INSERT INTO item_price_details VALUES("ITM2","Boost","Boost","0","150","150","5","5");
INSERT INTO item_price_details VALUES("ITM3","Chilli","Red chikke","250","300","250","50","12");
INSERT INTO item_price_details VALUES("ITM4","Sisis","Sisisis","100","100","100","0","5");
INSERT INTO item_price_details VALUES("ITM5","Jillebi","Jillebi","0","100","101","1","5");
INSERT INTO item_price_details VALUES("ITM6","S","Horlicks","0","150","200","30","12");



CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO login VALUES("1","sibin","s");



CREATE TABLE `purchase_details` (
  `voucher_no` varchar(500) NOT NULL,
  `item_id` varchar(500) NOT NULL,
  `item` varchar(500) NOT NULL,
  `brand` varchar(500) NOT NULL,
  `selling_price` double NOT NULL,
  `purchase_rate` double NOT NULL,
  `qty` int(11) NOT NULL,
  `gst` double NOT NULL,
  `tax_amount` double NOT NULL,
  `discount` double NOT NULL,
  `total` double NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO purchase_details VALUES("PCH8","","Horlicks","Horlicks","200","150","1","12","18","30","138");
INSERT INTO purchase_details VALUES("PCH9","","Horlicks","Horlicks","200","150","1","12","18","30","138");
INSERT INTO purchase_details VALUES("PCH10","ITM2","Boost","Boost","150","150","1","5","7.5","5","152.5");
INSERT INTO purchase_details VALUES("PCH10","ITM1","Horlicks","Horlicks","200","150","1","12","18","30","138");



CREATE TABLE `purchase_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `voucher_no` varchar(500) NOT NULL,
  `voucher_date` date NOT NULL,
  `invoice_no` varchar(500) NOT NULL,
  `invoice_date` date NOT NULL,
  `s_id` varchar(500) NOT NULL,
  `s_name` varchar(500) NOT NULL,
  `cash_credit` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `net_amount` float NOT NULL,
  `total_tax` float NOT NULL,
  `discount` float NOT NULL,
  `grand_total` float NOT NULL,
  `round_off` float NOT NULL,
  `paid` float NOT NULL,
  `balance` float NOT NULL,
  `remarks` int(11) NOT NULL,
  `transaction_completed` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO purchase_master VALUES("2","PCH1","2020-10-16","a","2020-10-01","SPR3","Jio","cash","150","18","30","138","138","138","0","0","1");
INSERT INTO purchase_master VALUES("3","PCH2","2020-10-22","a","2020-10-08","SPR3","Jio","cash","150","18","30","138","138","138","0","0","1");
INSERT INTO purchase_master VALUES("4","PCH3","2020-10-09","a","2020-10-20","SPR2","Xibin","cash","150","18","30","138","138","138","0","0","1");
INSERT INTO purchase_master VALUES("5","PCH4","2020-10-02","s","2020-10-21","SPR2","Xibin","cash","150","18","30","138","138","138","0","0","1");
INSERT INTO purchase_master VALUES("6","PCH5","2020-10-03","s","2020-10-14","SPR2","Xibin","cash","150","7.5","5","152.5","152.5","152.5","0","0","1");
INSERT INTO purchase_master VALUES("7","PCH6","2020-10-09","s","2020-10-12","SPR2","Xibin","cash","150","18","30","138","138","138","0","0","1");
INSERT INTO purchase_master VALUES("8","PCH7","2020-10-08","s","2020-10-13","SPR2","Xibin","cash","150","18","30","138","138","138","0","0","1");
INSERT INTO purchase_master VALUES("9","PCH8","2020-10-23","x","2020-10-07","SPR2","Xibin","cash","150","18","30","138","138","138","0","0","1");
INSERT INTO purchase_master VALUES("10","PCH9","2020-10-09","s","2020-10-28","SPR2","Xibin","cash","150","18","30","138","138","138","0","0","1");
INSERT INTO purchase_master VALUES("11","PCH10","2020-10-02","s","2020-10-05","SPR2","Xibin","cash","300","25.5","35","290.5","290.5","290.5","0","0","1");



CREATE TABLE `sales_details` (
  `invoice_no` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `item` varchar(500) NOT NULL,
  `brand` varchar(500) NOT NULL,
  `selling_price` double NOT NULL,
  `qty` int(11) NOT NULL,
  `gst` double NOT NULL,
  `tax_amount` double NOT NULL,
  `discount` double NOT NULL,
  `total` double NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO sales_details VALUES("INV1","Horlicks","Horlicks","200","1","12","24","2","222");
INSERT INTO sales_details VALUES("INV1","Chilli","Red Chikke","250","1","12","30","50","230");
INSERT INTO sales_details VALUES("INV2","Boost","Boost","150","1","5","7.5","5","152.5");
INSERT INTO sales_details VALUES("INV2","Horlicks","Horlicks","200","1","12","24","2","222");
INSERT INTO sales_details VALUES("INV3","Horlicks","Horlicks","200","1","12","24","2","222");
INSERT INTO sales_details VALUES("INV3","Boost","Boost","150","1","5","7.5","5","152.5");
INSERT INTO sales_details VALUES("INV3","Chilli","Red Chikke","250","1","12","30","50","230");
INSERT INTO sales_details VALUES("INV4","Horlicks","Horlicks","200","3","12","72","2","670");
INSERT INTO sales_details VALUES("INV4","Boost","Boost","150","1","5","7.5","5","152.5");
INSERT INTO sales_details VALUES("INV4","Chilli","Red Chikke","250","1","12","30","50","230");
INSERT INTO sales_details VALUES("INV4","Sisis","Sisisis","100","1","5","5","0","105");



CREATE TABLE `sales_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(500) NOT NULL,
  `invoice_date` date NOT NULL,
  `c_id` varchar(500) NOT NULL,
  `c_name` varchar(500) NOT NULL,
  `cash_credit` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `net_amount` float NOT NULL,
  `total_tax` float NOT NULL,
  `discount` float NOT NULL,
  `grand_total` float NOT NULL,
  `round_off` float NOT NULL,
  `paid` float NOT NULL,
  `balance` float NOT NULL,
  `remarks` float NOT NULL,
  `transaction_completed` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO sales_master VALUES("1","INV1","2020-09-09","CTR6","Aksj","cash","450","54","52","452","452","452","0","0","1");
INSERT INTO sales_master VALUES("2","INV2","2020-09-17","CTR5","Xxxxxx","cash","350","31.5","7","374.5","374","364.5","10","0","0");
INSERT INTO sales_master VALUES("3","INV3","2020-09-25","CTR2","Sibin","cash","600","61.5","57","604.5","604.5","604.5","0","0","1");
INSERT INTO sales_master VALUES("4","INV4","2020-09-07","CTR2","Sibin","cash","700","114.5","57","757.5","757.5","747.5","10","0","0");



CREATE TABLE `stock_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` varchar(500) NOT NULL,
  `item_name` varchar(500) NOT NULL,
  `brand` varchar(500) NOT NULL,
  `stock` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO stock_master VALUES("1","ITM1","Horlicks","Horlicks","0");
INSERT INTO stock_master VALUES("2","ITM2","Boost","Boost","23");
INSERT INTO stock_master VALUES("5","ITM3","Chilli","Red Chikke","20");
INSERT INTO stock_master VALUES("6","ITM4","Sisis","Sisisis","50");
INSERT INTO stock_master VALUES("7","ITM6","S","Horlicks","1");



CREATE TABLE `supplier_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_id` varchar(500) NOT NULL,
  `s_name` varchar(500) NOT NULL,
  `mob` varchar(500) NOT NULL,
  `gst_no` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO supplier_master VALUES("1","SPR3","Jio","8745214752","65lop");
INSERT INTO supplier_master VALUES("2","SPR2","Xibin","7895788850","55dd");
INSERT INTO supplier_master VALUES("3","SPR3","Kol","45455","696585");
INSERT INTO supplier_master VALUES("4","SPR4","Jio care","878545562","25ss88");
INSERT INTO supplier_master VALUES("5","SPR5","jdddddddd","3333","3333333");
INSERT INTO supplier_master VALUES("6","SPR6","Reliance","985858745","25ss");



CREATE TABLE `unit_master` (
  `unit_id` varchar(500) NOT NULL,
  `unit_name` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO unit_master VALUES("UT1","Kg");
INSERT INTO unit_master VALUES("UT2","Liter");
INSERT INTO unit_master VALUES("UT3","Bottle");
INSERT INTO unit_master VALUES("UT4","Pack");
INSERT INTO unit_master VALUES("UT5","Sds");
INSERT INTO unit_master VALUES("UT6","Adad");
INSERT INTO unit_master VALUES("UT7","Sdlsdlds");

