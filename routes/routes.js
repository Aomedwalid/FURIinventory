const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers')

router.get('/' , controller.getIndex);

router.get('/dashboard' , controller.getDashboard);

//add item

router.get('/add-item' , controller.getAddItem);

router.post('/add-item' , controller.postAddItem);

//add category

router.get('/add-category' , controller.getAddCatigory);

router.get('/add-supplier' , controller.getAddSupplier);

router.get('/items' , controller.getItems);

router.get('/sell' , controller.getSell);

router.get('/profile' , controller.getProfile);

module.exports = router;