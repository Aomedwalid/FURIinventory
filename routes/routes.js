const express = require('express');
const router = express.Router();
const indexControllers = require('../controllers/indexControllers');
const addingControllers = require('../controllers/addingControllers');
const itemsControllers = require('../controllers/itemsControllers');
const sellingControllers = require('../controllers/sellingControllers');
const profileControllers = require('../controllers/profileControllers');



router.get('/' , indexControllers.getIndex);

router.get('/dashboard' , indexControllers.getDashboard);

//add item

router.get('/add-item' , addingControllers.getAddItem);

router.post('/add-item' , addingControllers.postAddItem);

//add category

//there's an error here I named the /add-category with i not e that is a mistake

router.get('/add-catigory' , addingControllers.getAddCatigory);

router.get('/add-supplier' , addingControllers.getAddSupplier);

router.get('/items' , itemsControllers.getItems);

router.get('/sell' , sellingControllers.getSell);

router.get('/profile' , profileControllers.getProfile);

module.exports = router;