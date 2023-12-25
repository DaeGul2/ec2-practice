const express = require('express');
const router = express.Router();
const foodController = require('../controller/foodChoiceController');

router.post('/', foodController.createFood);
router.get('/',foodController.getFood);
router.delete('/',foodController.deleteAll);
router.delete('/one',foodController.deleteOne);
module.exports = router;