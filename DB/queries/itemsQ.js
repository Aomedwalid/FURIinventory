const pool = require('../pool');
const asyncHandler = require('express-async-handler');

const getLatestAddedItems = asyncHandler(async () => {
    const { rows } = await pool.query(`SELECT item_name , item_id , item_selling_price , item_category, item_image
        FROM items
        ORDER BY item_added_date ASC`)
    return rows
})


const getCategoriesItems = asyncHandler(async () => {
    const { rows } = await pool.query(`SELECT 
        c.category_name , i.item_id , i.item_name , i.item_selling_price , i.item_category , i.item_image
        FROM categories c LEFT JOIN items i 
        ON(i.item_category = c.category_id)
        ORDER BY c.category_name;`);
    const result = {}
    rows.forEach((row) => {
        const category = row.category_name;
        const item = {
            id: row.item_id,
            name: row.item_name,
            price: row.item_selling_price,
            image: row.item_image
        }
        if (result[category]) {
            result[category].push(item);
        }
        else {
            result[category] = [item];
        }
    })
    return result
})

const searchItems = asyncHandler(async (key) => {
    const { rows } = await pool.query(`SELECT item_id , item_name , item_selling_price , item_image
    FROM items
    WHERE item_name ILIKE $1 OR item_id::text ILIKE $1 OR item_selling_price::text ILIKE $1;`, [`%${key}%`]);
    return rows
});

const searchCategories = asyncHandler(async (key) => {
    const { rows } = await pool.query(`
        SELECT category_id , category_name 
        FROM categories
        WHERE category_id::text ILIKE $1  OR category_name ILIKE $1; 
        `, [`%${key}%`]);
    return rows
});


const itemDetails = asyncHandler(async (key) => {
    const { rows } = await pool.query(`
        SELECT c.category_name ,i.item_id , i.item_name , i.item_selling_price , i.item_amount
        , i.item_image , i.item_note , TO_CHAR(i.item_added_date , 'YYYY-MM-DD') AS item_added_date
        FROM items i JOIN categories c
        ON(i.item_category = c.category_id)
        WHERE i.item_id = $1 ;
        ` , [key]);

    return rows

})

const getItemById = asyncHandler(async (key) => {
    const { rows } = await pool.query('SELECT * FROM items WHERE item_id = $1', [key]);
    return rows[0];
})



module.exports = {
    getLatestAddedItems,
    getCategoriesItems,
    searchItems,
    searchCategories,
    itemDetails,
    getItemById
};