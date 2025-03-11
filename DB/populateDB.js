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
item_category INTEGER,
item_amount INTEGER,
item_image VARCHAR(255) DEFAULT 'https://mrwallpaper.com/images/hd/ios-13-dark-default-b87pdhc857zkxftr.jpg',
item_note VARCHAR(255),
item_added_date TIMESTAMP DEFAULT NOW(),
FOREIGN KEY (item_category) REFERENCES categories(category_id)
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
FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE RESTRICT
);

ALTER TABLE sales_items
DROP CONSTRAINT sales_items_item_id_fkey;

ALTER TABLE sales_items
ADD CONSTRAINT sales_items_item_id_fkey FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE SET NULL;

INSERT INTO categories (category_name, warehouse, category_feild, category_note) VALUES
('Cosmetics', 'Main Warehouse', 'Beauty', 'Cosmetic products for all skin types.'),
('Haircare', 'Branch Warehouse', 'Hair', 'Products for hair treatment and care.'),
('Skincare', 'Main Warehouse', 'Skin', 'Various skincare solutions.');


INSERT INTO items (item_name, item_cost_price, item_selling_price, item_category, item_amount, item_note) VALUES
('Lipstick', 50, 80, 1, 100, 'Matte lipstick in various shades.'),
('Shampoo', 30, 50, 2, 200, 'Herbal shampoo for all hair types.'),
('Face Cream', 70, 120, 3, 150, 'Moisturizing face cream.');


INSERT INTO sales (sale_date) VALUES
(NOW() - INTERVAL '2 days'),
(NOW() - INTERVAL '1 day'),
(NOW());


INSERT INTO sales_items (sale_id, item_id, quantity_sold, sale_price) VALUES
(1, 1, 2, 80),
(2, 2, 3, 50),
(3, 3, 1, 120);

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