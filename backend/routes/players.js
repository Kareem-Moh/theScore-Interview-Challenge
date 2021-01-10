const express = require('express');
const router = express.Router();
const PlayerController = require('../controllers/player-controller')

router.get('/', (req, res, next) => {
  res.send('Connected to Express!');
});
router.get('/all-players', PlayerController.getAllPlayers);

module.exports = router;
