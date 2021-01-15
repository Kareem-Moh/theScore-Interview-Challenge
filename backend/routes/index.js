var express = require('express');
var router = express.Router();
const PlayerController = require('../controllers/player-controller')

/* GET home page. */
router.get('/', function(req, res) {
  res.send('Express Server running...');
});
router.get('/list-players', PlayerController.getAllPlayers);
router.get('/player/:name', PlayerController.getPlayerByName);
router.get('/sort-players/yards', PlayerController.getPlayersByYards);
router.get('/sort-players/longest-run', PlayerController.getPlayersByLongestRun);
router.get('/sort-players/touchdowns', PlayerController.getPlayersByTouchdowns);

module.exports = router;
