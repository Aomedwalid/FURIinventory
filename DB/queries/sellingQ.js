const aysncHandler = require("express-async-handler");
const pool = require("../pool");

const getItems = aysncHandler(async (key) => {
    key = key || "";
    const { rows } = await pool.query(
        `
        SELECT item_id , item_name , item_amount , item_selling_price
        FROM items
        WHERE item_name ILIKE $1 OR item_id::text ILIKE $1 OR item_selling_price::text ILIKE $1
        ORDER BY item_added_date ASC;
        `,
        [`%${key}%`]
    );
    return rows;
});

const addSell = aysncHandler(async (data) => {
    const saleResult = await pool.query(
        "INSERT INTO sales (sale_date) VALUES (DEFAULT) RETURNING sale_id;"
    );

    const saleId = saleResult.rows[0].sale_id;
    console.log(data);
    for (const item of data) {
        await pool.query(
            "INSERT INTO sales_items (sale_id, item_id, quantity_sold, sale_price) VALUES ($1, $2, $3, $4);",
            [
                saleId,
                parseInt(item.id, 10),
                parseInt(item.quantity, 10),
                parseInt(item.price, 10),
            ]
        );
        await pool.query(
            "UPDATE items SET item_amount = item_amount - $1 WHERE item_id = $2;",
            [parseInt(item.quantity, 10), item.id]
        );
    }
});

module.exports = { getItems, addSell };
