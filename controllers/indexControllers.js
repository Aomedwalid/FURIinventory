const indexQ = require('../DB/queries/indexQ');
const asyncHandler = require('express-async-handler');

//showing the home

exports.getIndex =asyncHandler( async (req,res)=>{
    const itemsCount =await indexQ.itemsCount();
    const categoriesCount =await indexQ.categoriesCount();
    const totalCostPrice =await indexQ.totalCostPrice();
    const profit =await indexQ.monthlyProfite();
    const categories = await indexQ.latestAddedCategories();
    const items = await indexQ.latestAddedItems();
    console.log(itemsCount)
    res.render('index' , {
        title : 'home',
        itemsCount,
        categoriesCount,
        totalCostPrice,
        profit,
        categories,
        items
    });
});


//dashboard

exports.getDashboard =asyncHandler(async (req, res) =>{
    res.render('dashboard');
});