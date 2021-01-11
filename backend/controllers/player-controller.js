const Player = require('../models/player')

getAllPlayers = async (req, res) => {
    await Player.find({}, (err, players) => {
        if (err) {
            return res.status(500).json({ success: false, error: err })
        } else if (!players.length) {
            return res
                .status(404)
                .json({ success: false, error: `Players not found` })
        }
        return res.status(200).json({ success: true, data: players })
    }).catch(err => console.log(err))
}

getPlayerByName = async (req, res) => {
    await Player.find({ "Player": `/.*${req.params.name}.*/`}, (err, players) => {
        if (err) {
            return res.status(500).json({ success: false, error: err })
        } else if (!players.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Player not found' })
        }
        return res.status(200).json({ success: true, data: players })
    })
}

module.exports = {
    getAllPlayers,
    getPlayerByName
}