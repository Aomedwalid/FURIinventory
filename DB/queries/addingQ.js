const pool = require('../pool');
const asyncHandler = require('express-async-handler');

const addItem = asyncHandler(async (item) => {
    await pool.query(`INSERT INTO items 
        (item_name , item_cost_price , item_selling_price ,item_category ,
        item_amount ,item_image , item_note) 

        VALUES ($1,$2,$3,$4,$5,$6,$7);` ,
        [item.itemName,
        item.itemCostPrice,
        item.itemSellingPrice,
        item.itemCategory,
        item.itemAmount,
         item.itemImage === '' 
                ? 'https://mrwallpaper.com/images/hd/ios-13-dark-default-b87pdhc857zkxftr.jpg'
                : item.itemImage,
        item.itemNote
        ]);

});

const addCatigory = asyncHandler(async (category) => {
    await pool.query(`INSERT INTO categories 
        (category_name , warehouse , category_feild , category_note)
        VALUES ($1,$2,$3,$4);` ,
        [category.categoryName,
        category.warehouse,
        category.categoryFeild,
        category.categoryNote]);
});

const existedCategories = asyncHandler(async () => {
    const { rows } = await pool.query('SELECT category_name , category_id FROM categories');
    return rows;
});

const existedCategory = asyncHandler(async (name) => {
    const { rows } = await pool.query('SELECT category_name FROM categories WHERE category_name = $1', [name]);
    return rows.length > 0;
});

const updatingItem = asyncHandler(async (updatedData) => {
    await pool.query(`UPDATE items 
        SET item_name = $1, item_cost_price = $2, item_selling_price = $3,
        item_category = $4, item_amount = $5, item_image = $6, item_note = $7
        WHERE item_id = $8` , [
        updatedData.itemName,
        updatedData.itemCostPrice,
        updatedData.itemSellingPrice,
        updatedData.itemCategory,
        updatedData.itemAmount,
        updatedData.itemImage,
        updatedData.itemNote,
        updatedData.itemId
    ]);
});

const deleteItem = asyncHandler(async(id)=>{
    await pool.query('DELETE FROM sales_items WHERE item_id = $1;' , [id]);

    await pool.query('DELETE FROM items WHERE item_id = $1;', [id]);
})

module.exports = { addItem, addCatigory, existedCategories , existedCategory, updatingItem,deleteItem}