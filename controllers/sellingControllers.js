const asyncHandler = require('express-async-handler');
const sellingQ = require('../DB/queries/sellingQ');
const { itemDetails } = require('../DB/queries/itemsQ');


exports.getSell =asyncHandler( async (req,res) =>{
    const searchKey = req.query.key;
    const items = await sellingQ.getItems(searchKey);
    res.render('sell',{
        title : 'selling',
        items : items,
    });
});


exports.postSell = asyncHandler(async(req,res)=>{
    const data = req.body.items;
    await sellingQ.addSell(data);
    res.redirect('/')
})