const express = require('express');
const router = express.Router();
const foodController = require('../controller/foodChoiceController');

router.post('/', foodController.createFood);
router.get('/',foodController.getFood)
router.delete('/',foodController.deleteAll)
module.exports = router;