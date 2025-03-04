require("dotenv").config();
const { Client } = require("pg");
require("dotenv").config({ path: '../.env' });

const sql = `
CREATE TABLE IF NOT EXISTS categories(
category_id SERIAL PRIMARY KEY ,
category_name VARCHAR(100) ,
warehouse VARCHAR(100),
category_feild VARCHAR(100) ,
category_note VARCHAR(255),
category_added_date TIMESTAMP DEFAULT NOW());


CREATE TABLE IF NOT EXISTS items( 
item_id SERIAL PRIMARY KEY, 
item_name VARCHAR(100),
item_cost_price INTEGER,
item_selling_price INTEGER,
item_category VARCHAR(100) UNIQUE,
item_amount INTEGER,
item_size INTEGER,
item_weight INTEGER, 
item_note VARCHAR(255),
category_id INTEGER,
item_added_date TIMESTAMP DEFAULT NOW(),
FOREIGN KEY (category_id) REFERENCES categories(category_id)
);


CREATE TABLE IF NOT EXISTS sales(
sale_id SERIAL PRIMARY KEY,
sale_date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sales_items(
sale_item_id SERIAL PRIMARY KEY,
sale_id INTEGER,
item_id INTEGER,
quantity_sold INTEGER NOT NULL,
sale_price INTEGER NOT NULL,
total_price INTEGER GENERATED ALWAYS AS (quantity_sold * sale_price) STORED,
FOREIGN KEY (sale_id) REFERENCES sales(sale_id),
FOREIGN KEY (item_id) REFERENCES items(item_id)
);



INSERT INTO categories (category_name, warehouse, category_feild, category_note) VALUES
('Cosmetics', 'Main Warehouse', 'Beauty', 'Cosmetic products for all skin types.'),
('Haircare', 'Branch Warehouse', 'Hair', 'Products for hair treatment and care.'),
('Skincare', 'Main Warehouse', 'Skin', 'Various skincare solutions.');



INSERT INTO items (item_name, item_cost_price, item_selling_price, item_category, item_amount, item_size, item_weight, item_note, category_id) VALUES
('Lipstick', 50, 80, 'Cosmetics', 100, 5, 10, 'Matte lipstick in various shades.', 1),
('Shampoo', 30, 50, 'Haircare', 200, 500, 600, 'Herbal shampoo for all hair types.', 2),
('Face Cream', 70, 120, 'Skincare', 150, 50, 60, 'Moisturizing face cream.', 3);


INSERT INTO sales (sale_date) VALUES
(NOW() - INTERVAL '2 days'),
(NOW() - INTERVAL '1 day'),
(NOW());


INSERT INTO sales_items (sale_id, item_id, quantity_sold, sale_price) VALUES
(1, 1, 2, 80),  -- 2 Lipsticks sold at 80 each
(2, 2, 3, 50),   -- 3 Shampoos sold at 50 each
(3, 3, 1, 120);  -- 1 Face Cream sold at 120


`;

async function main(){
    console.log('seeding');
    const client = new Client({
        connectionString :process.env.DB_URL,
    });
    await client.connect();
    await client.query(sql);
    await client.end();
    console.log('done');
}

main();