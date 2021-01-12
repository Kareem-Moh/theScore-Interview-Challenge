const Player = require('../models/player')

getAllPlayers = async (req, res) => {
    await Player.find().sort({ "Player": 1 }).exec((err, players) => {
        if (err) {
            return res.status(500).json({ success: false, error: err })
        } else if (!players.length) {
            return res
                .status(404)
                .json({ success: false, data: [], error: `Players not found` })
        }
        return res.status(200).json({ success: true, data: players })
    })
}

getPlayersByYards = async (req, res) => {
    //Include id to stabilize the sort
    await Player.find().sort({ "Yds": -1, "_id": 1 }).exec((err, players) => {
        if (err) {
            return res.status(500).json({ success: false, error: err })
        } else if (!players.length) {
            return res
                .status(404)
                .json({ success: false, data: [], error: `Players not found`})
        }
        return res.status(200).json({ success: true, data: players })
    })
}

getPlayersByLongestRun = async (req, res) => {
    //Include id to stabilize the sort
    await Player.find().sort({ "Lng": -1, "_id": 1 }).exec((err, players) => {
        if (err) {
            return res.status(500).json({ success: false, error: err })
        } else if (!players.length) {
            return res
                .status(404)
                .json({ success: false, data: [], error: `Players not found`})
        }
        return res.status(200).json({ success: true, data: players })
    })
}

getPlayersByTouchdowns = async (req, res) => {
    //Include id to stabilize the sort
    await Player.find().sort({ "TD": -1, "_id": 1 }).exec((err, players) => {
        if (err) {
            return res.status(500).json({ success: false, error: err })
        } else if (!players.length) {
            return res
                .status(404)
                .json({ success: false, data: [], error: `Players not found`})
        }
        return res.status(200).json({ success: true, data: players })
    })
}

getPlayerByName = async (req, res) => {
    let query = new RegExp((req.params.name).toLowerCase())
    await Player.find({ "Player": { $regex: new RegExp(req.params.name, "i") }}, (err, players) => {
        if (err) {
            return res.status(500).json({ success: false, error: err })
        } else if (!players.length) {
            return res
                .status(404)
                .json({ success: false, data: [], error: `No player with the name "${req.params.name}" found` })
        }
        return res.status(200).json({ success: true, data: players })
    }).catch(err => console.log(err))
}

module.exports = {
    getAllPlayers,
    getPlayerByName,
    getPlayersByYards,
    getPlayersByLongestRun,
    getPlayersByTouchdowns
}