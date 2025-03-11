const pool = require('../pool');
const asyncHandler = require('express-async-handler');

const categoriesCount =asyncHandler( async () =>{
    const {rows} = await pool.query('SELECT COUNT(*) FROM categories;');
    return parseInt(rows[0].count,10);
} );

const itemsCount =asyncHandler( async () =>{
    const {rows} = await pool.query('SELECT COUNT(*) FROM items;');
    return parseInt(rows[0].count,10);
});

const totalCostPrice =asyncHandler( async () =>{
    const {rows} = await pool.query('SELECT SUM(item_cost_price*item_amount) FROM items;');
    return parseInt(rows[0].sum,10);
});

const monthlyProfite =asyncHandler( async () =>{
    const {rows} = await pool.query(`
        SELECT 
        SUM(s.sale_price * s.quantity_sold) - SUM(i.item_cost_price *s.quantity_sold) AS profit
        from  sales_items s 
        join items i ON(s.item_id = i.item_id)
        join sales sa ON(s.sale_id = sa.sale_id)
        WHERE EXTRACT(YEAR FROM sa.sale_date) = EXTRACT(YEAR FROM CURRENT_DATE);`);
    return parseInt(rows[0].profit,10);
})

const latestAddedItems =asyncHandler( async () =>{
    const {rows} = await pool.query(`
        SELECT item_id , item_name , item_amount ,  TO_CHAR(item_added_date, 'YYYY-MM-DD') AS added_date
        FROM items
        ORDER BY item_added_date ASC
        LIMIT 6;
        `)
    return rows;
});
const latestAddedCategories =asyncHandler( async () =>{
    const {rows} = await pool.query(`
        SELECT category_id , category_name , warehouse , TO_CHAR(category_added_date, 'YYYY-MM-DD') AS added_date
        FROM categories
        ORDER BY category_added_date ASC
        LIMIT 6;`)
    return rows;
});

module.exports = {
    categoriesCount , itemsCount , totalCostPrice , monthlyProfite , latestAddedItems , latestAddedCategories
}