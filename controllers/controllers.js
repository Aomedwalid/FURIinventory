const indexQ = require('../DB/queries/indexQ');
const addingQ = require('../DB/queries/addingQ');


exports.getIndex =async (req,res)=>{
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
}


//dashboard

exports.getDashboard = async (req, res) =>{
    res.render('dashboard');
}

// adding item


exports.getAddItem = async (req,res) => {
    const categories = await addingQ.existedCategories();
    res.render('addItem' , {
        title:'AddItem',
        categories : categories
    });
}

exports.postAddItem = (req, res)=>{
    const itemData = {
    itemName: req.body.itemName,
    itemSellingPrice: req.body.itemSellingPrice,
    itemCostPrice: req.body.itemCostPrice,
    itemCategory: req.body.itemCategory,
    itemAmount: req.body.itemAmount,
    itemSize: req.body.itemSize,
    itemWeight: req.body.itemWeight,
    itemNotes: req.body.itemNotes
    };
    addingQ.addItem(itemData);
    res.redirect('/');
    console.log('done')
}

//adding category
exports.getAddCatigory = (req,res) => {
    res.render('addCatigory');
}
exports.getAddSupplier = (req,res) =>{
    res.render('addSupplier');
}
exports.getItems = (req,res) =>{
    res.render('items2');
}
exports.getSell = (req,res) =>{
    res.render('sell');
}
exports.getProfile = (req,res) => {
    res.render('profile');
}

