const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/createUser/:name', UserController.createUser);
router.get('/getUserById/:id', UserController.getUserById);

module.exports = router;
