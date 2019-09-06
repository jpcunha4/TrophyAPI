const express = require('express');
const router = express.Router();
// CONTROLLER
const MonsterController = require('../controllers/MonsterController');

router.post('/createMonster/:name', MonsterController.createMonster);
router.post('/killPlayer/:id', MonsterController.killPlayer);

module.exports = router;
