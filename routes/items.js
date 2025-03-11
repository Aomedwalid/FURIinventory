const express = require('express');
const router = express.Router();
const indexControllers = require('../controllers/indexControllers');
const itemsControllers = require('../controllers/itemsControllers');


router.get('/items/:id' , itemsControllers.itemInfo);

router.get('/items/:id/update', itemsControllers.getUpdate);

router.post('/items/:id/update', itemsControllers.postUpdateItem);

router.post('/items/:id/delete' , itemsControllers.deleteItem);


router.get('/search' , itemsControllers.search);

module.exports = router