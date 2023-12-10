const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// 유저 등록
router.post('/', userController.createUser);
router.post('/login',userController.login);
// router.get('/logout',userController.logout);
router.get('/session',userController.checkSession);
router.get('/select',userController.selectOne);
router.get('/reset',userController.reset);
module.exports = router;