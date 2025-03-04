const pool = require('../pool');

const addItem = async (item)=>{
    await pool.query(`INSERT INTO items 
        (item_name , item_cost_price , item_selling_price ,item_category , item_amount , item_size , item_weight , item_note , category_id) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);` , 
        [item.item_name , item.item_cost_price , item.item_selling_price ,item.item_category, item.item_amount, item.item_size, item.item_weight, item.item_note, item.category_id]);
}

const addCatigory = async (category)=>{
    await pool.query(`INSERT INTO categories 
        (category_name , warehouse , category_feild , category_note)
        VALUES ($1,$2,$3,$4);` ,
        [category.category_name , category.warehouse , category.category_feild , category.category_note]);
};

const existedCategories = async () => {
    const {rows} = await pool.query('SELECT category_name , category_id FROM categories');
    return rows;
}

module.exports = {addItem , addCatigory , existedCategories}

