const addingQ = require('../DB/queries/addingQ');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// adding item


exports.getAddItem = asyncHandler(async (req, res) => {
    const categories = await addingQ.existedCategories();
    res.render('addItem', {
        title: 'AddItem',
        categories: categories,
        errors: null,
        item:{}
    });
});

exports.postAddItem = [
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

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        const itemData = {
            itemName: req.body.itemName,
            itemSellingPrice: req.body.itemSellingPrice,
            itemCostPrice: req.body.itemCostPrice,
            itemCategory: req.body.itemCategory,
            itemAmount: req.body.itemAmount,
            itemNotes: req.body.itemNotes,
            categoryId: req.body.itemCategory
        };
        if (!errors.isEmpty()) {
            const categories = await addingQ.existedCategories();
            res.render('addItem', {
                title: 'AddItem',
                categories: categories,
                errors: errors.isEmpty() ? [] : errors.array(),
                item: req.body
            });
        }
        else {
            await addingQ.addItem(itemData);
            const categories = await addingQ.existedCategories();
            console.log(req.body);
            res.render('addItem', {
                title: 'AddItem',
                categories: categories,
                errors: [],
                item: {}
            });
            console.log('done');
        }
    })
];


//adding category
exports.getAddCatigory = (req, res) => {
    res.render('addCatigory');
}

exports.getAddSupplier = (req, res) => {
    res.render('addSupplier');
}