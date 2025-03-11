const itemsQ = require('../DB/queries/itemsQ');
const asyncHandler = require('express-async-handler');
const addingQ = require('../DB/queries/addingQ');

const { body, validationResult } = require('express-validator');

exports.getItems = asyncHandler(async (req,res) =>{
    const LatestItems = await itemsQ.getLatestAddedItems();
    const categoriesItems = await itemsQ.getCategoriesItems();
    console.log(categoriesItems);

    res.render('items2',{
        title:'galary',
        latest : LatestItems,
        category : categoriesItems,
    });
});

exports.search = asyncHandler(async (req,res)=>{
    const searchKey = req.query.query;
    const resultItems = await itemsQ.searchItems(searchKey);
    const resultCategories = await itemsQ.searchCategories(searchKey);
    
    res.render('searchItems' , {
        title: 'search',
        items: resultItems,
        categories : resultCategories
    });
});


exports.itemInfo = asyncHandler(async (req,res)=>{
    const itemId = parseInt(req.params.id);
    const itemDetails =await itemsQ.itemDetails(itemId);

    if (!itemDetails) {
        return res.status(404).render('Item not found');
    }

    res.render('itemDetails' , {
        title : itemDetails[0].item_name,
        item : itemDetails,
    })
});


exports.getUpdate = asyncHandler( async (req,res)=>{
   const categories = await addingQ.existedCategories();
   const itemData = await itemsQ.getItemById(req.params.id);
    res.render('updateItem', {
        title: 'AddItem',
        categories: categories,
        errors: null,
        item: itemData
    }); 
});

exports.postUpdateItem = [
    body('itemName')
        .trim()
        .isLength({ min: 1, max: 23 })
        .withMessage('Fill the name feild')
        .escape()


    , body('itemSellingPrice')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Fill the selling price feild')
        .bail()
        .escape()
        .isNumeric()
        .withMessage('selling price must be numbric')
        .bail()
        .isFloat({ min: 0.01 })
        .withMessage('Selling price must be a positive number')


    , body('itemCostPrice')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Fill th item cost feild')
        .bail()
        .escape()
        .isNumeric()
        .withMessage('item cost price must be numric')
        .bail()
        .isFloat({ min: 0.01 })
        .withMessage('Cost price must be a positive number')


    , body('itemCategory')
        .custom((value) => {
            if (value === '') {
                throw new Error();
            }
            return true;
        })


    , body('itemAmount')
        .isLength({ min: 1 })
        .withMessage('amount must be filled')
        .bail()
        .isNumeric()
        .withMessage('amount must be numiric')
        .bail()
        .isFloat({ min: 0.01 })
        .withMessage('Item amount must be a positive number')
    ,

    body('itemImage')
        .optional({ checkFalsy: true })
        .isURL()
        .trim()
    ,

    body('itemNote')
        .trim()
        .escape()
    ,

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        const itemData = {
            itemName: req.body.itemName,
            itemSellingPrice: req.body.itemSellingPrice,
            itemCostPrice: req.body.itemCostPrice,
            itemCategory: req.body.itemCategory,
            itemAmount: req.body.itemAmount,
            itemImage: req.body.itemImage,
            itemNotes: req.body.itemNotes,
            categoryId: req.body.itemCategory,
            itemId : req.params.id
        };
        if (!errors.isEmpty()) {
            const categories = await addingQ.existedCategories();
            const itemData = await itemsQ.getItemById(req.params.id);
            res.render('updateItem', {
                title: 'UpdateItem',
                categories: categories,
                errors: errors.isEmpty() ? [] : errors.array(),
                item: itemData
            });
        }
        else {
            await addingQ.updatingItem(itemData);
            res.redirect('/items');
            console.log('done');
        }
    })
];



exports.deleteItem = asyncHandler(async(req,res)=>{
    const itemId = req.params.id;
    await addingQ.deleteItem(itemId);
    res.redirect('/items')
})