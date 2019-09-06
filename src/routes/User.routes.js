const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/', UserController.getAllUser);
router.post('/createUser/:name', UserController.createUser);
router.get('/getUserByName/:name', UserController.getUserByName);
router.post('/collectCoin', UserController.collectCoin);
router.post('/killMonster', UserController.killMonster);

module.exports = router;
