-- BentaHub Product Database Seeding Script
-- This script populates the products table with the complete product catalog

-- Coffee Category
INSERT INTO products (id, name, description, category, price, bulk_price, weight, stock_status, quantity, branch, sku, is_active) VALUES
('coffee-001', 'Kopiko Blanca TWIN', '2 sachets of premium instant coffee', 'Coffee', 15.00, 135.00, '2x20g', 'in-stock', 150, 'Main Branch', 'SKU-KOPIKO-BLANCA-TWIN', true),
('coffee-002', 'Kopiko Brown TWIN', '2 sachets of robust brown coffee', 'Coffee', 15.00, 135.00, '2x20g', 'in-stock', 150, 'Main Branch', 'SKU-KOPIKO-BROWN-TWIN', true),
('coffee-003', 'Kopiko Black TWIN', '2 sachets of strong black coffee', 'Coffee', 15.00, 135.00, '2x20g', 'in-stock', 150, 'Main Branch', 'SKU-KOPIKO-BLACK-TWIN', true),
('coffee-004', 'Birch Tree Coffee 8g', 'Individual sachet instant coffee', 'Coffee', 5.00, NULL, '8g', 'in-stock', 200, 'Main Branch', 'SKU-BIRCH-8G', true),
('coffee-005', 'Birch Tree Coffee 21g', 'Premium instant coffee sachet', 'Coffee', 15.00, NULL, '21g', 'in-stock', 180, 'Main Branch', 'SKU-BIRCH-21G', true),
('coffee-006', 'Birch Tree Coffee 55g', 'Large coffee sachet pack', 'Coffee', 32.00, NULL, '55g', 'in-stock', 120, 'Main Branch', 'SKU-BIRCH-55G', true),
('coffee-007', 'Birch Tree Coffee 150g', 'Family pack instant coffee', 'Coffee', 75.00, NULL, '150g', 'in-stock', 80, 'Main Branch', 'SKU-BIRCH-150G', true);

-- Baking Ingredients Category
INSERT INTO products (id, name, description, category, price, bulk_price, weight, stock_status, quantity, branch, sku, is_active) VALUES
('baking-001', 'Graham (Crushed)', 'Crushed graham for baking', 'Baking Ingredients', 50.00, NULL, '200g', 'in-stock', 100, 'Main Branch', 'SKU-GRAHAM-CRUSHED', true),
('baking-002', 'Graham (Cracker)', 'Graham cracker sheets', 'Baking Ingredients', 45.00, NULL, '200g', 'in-stock', 100, 'Main Branch', 'SKU-GRAHAM-CRACKER', true),
('baking-003', 'All-Purpose Flour 1kg', 'Premium baking flour', 'Baking Ingredients', 35.00, NULL, '1kg', 'in-stock', 120, 'Main Branch', 'SKU-FLOUR-1KG', true),
('baking-004', 'All-Purpose Flour 500g', 'Medium pack baking flour', 'Baking Ingredients', 18.00, NULL, '500g', 'in-stock', 140, 'Main Branch', 'SKU-FLOUR-500G', true),
('baking-005', 'All-Purpose Flour 250g', 'Small pack baking flour', 'Baking Ingredients', 9.00, NULL, '250g', 'in-stock', 160, 'Main Branch', 'SKU-FLOUR-250G', true),
('baking-006', 'Angel Evaporated Milk 410ml', 'Rich evaporated milk for baking', 'Baking Ingredients', 34.00, NULL, '410ml', 'in-stock', 100, 'Main Branch', 'SKU-ANGEL-EVAP', true),
('baking-007', 'Angel Krem Densada 410ml', 'Sweetened condensed milk', 'Baking Ingredients', 63.00, NULL, '410ml', 'in-stock', 90, 'Main Branch', 'SKU-ANGEL-KREM', true);

-- Condiments Category
INSERT INTO products (id, name, description, category, price, bulk_price, weight, stock_status, quantity, branch, sku, is_active) VALUES
('condiment-001', 'Ajinamoto 11g', 'Monosodium glutamate seasoning', 'Condiments', 5.00, NULL, '11g', 'in-stock', 250, 'Main Branch', 'SKU-AJINA-11G', true),
('condiment-002', 'Ajinamoto 24g', 'Single sachet seasoning pack', 'Condiments', 7.00, NULL, '24g', 'in-stock', 200, 'Main Branch', 'SKU-AJINA-24G', true),
('condiment-003', 'Ajinamoto 50g', 'Regular seasoning pack', 'Condiments', 15.00, NULL, '50g', 'in-stock', 150, 'Main Branch', 'SKU-AJINA-50G', true),
('condiment-004', 'Ajinamoto 100g', 'Large seasoning pack', 'Condiments', 28.00, NULL, '100g', 'in-stock', 120, 'Main Branch', 'SKU-AJINA-100G', true),
('condiment-005', 'Ajinamoto 270g', 'Family size seasoning', 'Condiments', 70.00, NULL, '270g', 'in-stock', 80, 'Main Branch', 'SKU-AJINA-270G', true),
('condiment-006', 'Ajinamoto 500g', 'Large seasoning container', 'Condiments', 130.00, NULL, '500g', 'in-stock', 60, 'Main Branch', 'SKU-AJINA-500G', true),
('condiment-007', 'Ajinamoto 1kg', 'Bulk seasoning pack', 'Condiments', 230.00, NULL, '1kg', 'in-stock', 40, 'Main Branch', 'SKU-AJINA-1KG', true),
('condiment-008', 'Cocomama Gata 200ml', 'Coconut cream for cooking', 'Condiments', 36.00, NULL, '200ml', 'in-stock', 100, 'Main Branch', 'SKU-COCOMAMA-200', true),
('condiment-009', 'Cocomama Gata 400ml', 'Large coconut cream container', 'Condiments', 70.00, NULL, '400ml', 'in-stock', 80, 'Main Branch', 'SKU-COCOMAMA-400', true),
('condiment-010', 'Knorr Seasoning 12ml', 'Premium seasoning sachet', 'Condiments', 7.00, NULL, '12ml', 'in-stock', 200, 'Main Branch', 'SKU-KNORR-12', true),
('condiment-011', 'Knorr Seasoning 130ml', 'Liquid seasoning bottle', 'Condiments', 70.00, NULL, '130ml', 'in-stock', 100, 'Main Branch', 'SKU-KNORR-130', true),
('condiment-012', 'Knorr Seasoning 250ml Liquid', 'Premium liquid seasoning', 'Condiments', 115.00, NULL, '250ml', 'in-stock', 90, 'Main Branch', 'SKU-KNORR-250-LIQ', true),
('condiment-013', 'Knorr Seasoning 250ml Pouch', 'Convenient seasoning pouch', 'Condiments', 98.00, NULL, '250ml', 'in-stock', 95, 'Main Branch', 'SKU-KNORR-250-POUCH', true),
('condiment-014', 'Knorr Seasoning 500ml', 'Economy size seasoning', 'Condiments', 165.00, NULL, '500ml', 'in-stock', 70, 'Main Branch', 'SKU-KNORR-500', true),
('condiment-015', 'Knorr Seasoning 1L', 'Large seasoning bottle', 'Condiments', 320.00, NULL, '1L', 'low-stock', 30, 'Main Branch', 'SKU-KNORR-1L', true),
('condiment-016', 'Magic Sarap 8g', 'All-purpose seasoning sachet', 'Condiments', 5.00, NULL, '8g', 'in-stock', 250, 'Main Branch', 'SKU-MAGIC-8G', true),
('condiment-017', 'Magic Sarap 21g', 'Standard seasoning pack', 'Condiments', 15.00, NULL, '21g', 'in-stock', 180, 'Main Branch', 'SKU-MAGIC-21G', true),
('condiment-018', 'Magic Sarap 55g', 'Family size seasoning', 'Condiments', 32.00, NULL, '55g', 'in-stock', 120, 'Main Branch', 'SKU-MAGIC-55G', true),
('condiment-019', 'Magic Sarap 150g', 'Large seasoning container', 'Condiments', 75.00, NULL, '150g', 'in-stock', 80, 'Main Branch', 'SKU-MAGIC-150G', true),
('condiment-020', 'Datu Toyo 200ml', 'Soy sauce bottle', 'Condiments', 12.00, NULL, '200ml', 'in-stock', 150, 'Main Branch', 'SKU-DATU-TOYO-200', true),
('condiment-021', 'Datu Toyo 385ml', 'Regular soy sauce bottle', 'Condiments', 25.00, NULL, '385ml', 'in-stock', 120, 'Main Branch', 'SKU-DATU-TOYO-385', true),
('condiment-022', 'Datu Toyo 1L', 'Family size soy sauce', 'Condiments', 60.00, NULL, '1L', 'in-stock', 80, 'Main Branch', 'SKU-DATU-TOYO-1L', true),
('condiment-023', 'Datu Suka 200ml', 'Vinegar bottle', 'Condiments', 10.00, NULL, '200ml', 'in-stock', 150, 'Main Branch', 'SKU-DATU-SUKA-200', true),
('condiment-024', 'Datu Suka 385ml', 'Regular vinegar bottle', 'Condiments', 23.00, NULL, '385ml', 'in-stock', 120, 'Main Branch', 'SKU-DATU-SUKA-385', true),
('condiment-025', 'Datu Suka 1L', 'Family size vinegar', 'Condiments', 50.00, NULL, '1L', 'in-stock', 80, 'Main Branch', 'SKU-DATU-SUKA-1L', true);

-- Household & Laundry Supplies Category
INSERT INTO products (id, name, description, category, price, bulk_price, weight, stock_status, quantity, branch, sku, is_active) VALUES
('household-001', 'Sunsilk Pink 15ml', 'Premium shampoo sachet', 'Household & Laundry Supplies', 8.00, 80.00, '15ml', 'in-stock', 200, 'Main Branch', 'SKU-SUNSILK-15', true),
('household-002', 'Maxglow Dishwashing 330ml', 'Liquid dishwashing detergent', 'Household & Laundry Supplies', 20.00, 400.00, '330ml', 'in-stock', 120, 'Main Branch', 'SKU-MAXGLOW-330', true),
('household-003', 'Maxglow Dishwashing 1L', 'Economical liquid detergent', 'Household & Laundry Supplies', 35.00, 400.00, '1L', 'in-stock', 100, 'Main Branch', 'SKU-MAXGLOW-1L', true),
('household-004', 'Maxglow Dishwashing 1.5L', 'Large dishwashing detergent', 'Household & Laundry Supplies', 50.00, 400.00, '1.5L', 'in-stock', 80, 'Main Branch', 'SKU-MAXGLOW-1.5L', true),
('household-005', 'Maxglow Dishwashing 1 Gallon', 'Bulk dishwashing detergent', 'Household & Laundry Supplies', 135.00, 535.00, '1 Gallon', 'in-stock', 40, 'Main Branch', 'SKU-MAXGLOW-GALLON', true),
('household-006', 'Maxglow Powder Pink 1kg', 'Powdered laundry detergent', 'Household & Laundry Supplies', 42.00, 1000.00, '1kg', 'in-stock', 90, 'Main Branch', 'SKU-MAXGLOW-POWDER-PINK', true),
('household-007', 'Maxglow Powder Blue 1kg', 'Powdered laundry detergent', 'Household & Laundry Supplies', 42.00, 1000.00, '1kg', 'in-stock', 90, 'Main Branch', 'SKU-MAXGLOW-POWDER-BLUE', true);

-- Sauces Category
INSERT INTO products (id, name, description, category, price, bulk_price, weight, stock_status, quantity, branch, sku, is_active) VALUES
('sauce-001', 'Tomato Sauce Original 115g', 'Pure tomato sauce', 'Sauces', 22.00, NULL, '115g', 'in-stock', 120, 'Main Branch', 'SKU-TOMATO-115', true),
('sauce-002', 'Tomato Sauce Original 200g', 'Medium tomato sauce can', 'Sauces', 26.00, NULL, '200g', 'in-stock', 100, 'Main Branch', 'SKU-TOMATO-200', true),
('sauce-003', 'Tomato Sauce Original 250g', 'Regular tomato sauce can', 'Sauces', 30.00, NULL, '250g', 'in-stock', 100, 'Main Branch', 'SKU-TOMATO-250', true),
('sauce-004', 'Tomato Sauce Original 900g', 'Large tomato sauce can', 'Sauces', 95.00, NULL, '900g', 'in-stock', 60, 'Main Branch', 'SKU-TOMATO-900', true),
('sauce-005', 'Delmonte Party Pack 1kg Filipino', 'Filipino-style tomato sauce party pack', 'Sauces', 150.00, NULL, '1kg', 'in-stock', 50, 'Main Branch', 'SKU-DELMONTE-FILO', true),
('sauce-006', 'Delmonte Party Pack 1kg Sweets', 'Sweet-style tomato sauce party pack', 'Sauces', 150.00, NULL, '1kg', 'in-stock', 50, 'Main Branch', 'SKU-DELMONTE-SWEET', true);

-- Canned Goods Category
INSERT INTO products (id, name, description, category, price, bulk_price, weight, stock_status, quantity, branch, sku, is_active) VALUES
('canned-001', 'Ligo Sardines Red 425g', 'Premium canned sardines in tomato sauce', 'Canned Goods', 68.00, NULL, '425g', 'in-stock', 100, 'Main Branch', 'SKU-LIGO-RED-425', true),
('canned-002', 'Ligo Sardines Green 425g', 'Canned sardines in brine', 'Canned Goods', 67.00, NULL, '425g', 'in-stock', 100, 'Main Branch', 'SKU-LIGO-GREEN-425', true),
('canned-003', 'Ligo Sardines Red 155g', 'Regular size red sardines', 'Canned Goods', 28.00, NULL, '155g', 'in-stock', 150, 'Main Branch', 'SKU-LIGO-RED-155', true),
('canned-004', 'Ligo Sardines Green 155g', 'Regular size green sardines', 'Canned Goods', 28.00, NULL, '155g', 'in-stock', 150, 'Main Branch', 'SKU-LIGO-GREEN-155', true);

-- Verification Query (uncomment to verify insertions)
-- SELECT category, COUNT(*) as product_count, MIN(price) as min_price, MAX(price) as max_price 
-- FROM products 
-- WHERE sku LIKE 'SKU-%' 
-- GROUP BY category 
-- ORDER BY category;
