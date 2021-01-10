const Player = require('../models/player')

getAllPlayers = async (req, res) => {
    await Player.find({}, (err, players) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        } 
        else if (players.length === 0) {
            return res.status(404).json({ success: true, error: "No Players found" })
        }
        else {
            return res.status(200).json({ success: true, data: players })
        }
    }).catch(err => console.log(err))
}

module.exports = {
    getAllPlayers
}