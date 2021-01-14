const Player = require('../models/player')

const pageCount = 50;

getAllPlayers = async (req, res) => {
    let page = req.query.page
    let sortPromise = Player.find().sort({ "Player": 1 })
    if (!page || page <= 1) {
        await sortPromise.limit(pageCount).exec((err, players) => {
            if (err) {
                return res.status(500).json({ success: false, error: err })
            } else if (!players.length) {
                return res
                    .status(404)
                    .json({ success: false, data: [], error: `Players not found` })
            }
            return res.status(200).json({ success: true, data: players })
        })
    } else {
        await sortPromise.skip(pageCount*(page - 1)).limit(pageCount).exec((err, players) => {
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
}

getPlayersByYards = async (req, res) => {
    let page = req.query.page
    //Include id to stabilize the sort
    let sortPromise = Player.find().sort({ "Yds": -1, "_id": 1 })
    let filterCount = await Player.find().sort({ "Yds": -1, "_id": 1 }).countDocuments()
    if (!page || page <= 1) { 
        await sortPromise.limit(pageCount).exec((err, players) => {
            if (err) {
                return res.status(500).json({ success: false, error: err })
            } else if (!players.length) {
                return res
                    .status(404)
                    .json({ success: false, data: [], error: `Players not found`})
            }
            return res.status(200).json({ success: true, data: players, count: filterCount })
        })
    } else {
        await sortPromise.skip(pageCount*(page - 1)).limit(pageCount).exec((err, players) => {
            if (err) {
                return res.status(500).json({ success: false, error: err })
            } else if (!players.length) {
                return res
                    .status(404)
                    .json({ success: false, data: [], error: `Players not found`})
            }
            return res.status(200).json({ success: true, data: players, count: filterCount })
        })
    }
}

getPlayersByLongestRun = async (req, res) => {
    let page = req.query.page
    //Include id to stabilize the sort
    let sortPromise = Player.find().sort({ "Lng": -1, "_id": 1 })
    let filterCount = await Player.find().sort({ "Lng": -1, "_id": 1 }).countDocuments()
    if (!page || page <= 1){
        await sortPromise.limit(pageCount).exec((err, players) => {
            if (err) {
                return res.status(500).json({ success: false, error: err })
            } else if (!players.length) {
                return res
                    .status(404)
                    .json({ success: false, data: [], error: `Players not found`})
            }
            return res.status(200).json({ success: true, data: players, count: filterCount })
        })
    } else {
        await sortPromise.skip(pageCount*(page - 1)).exec((err, players) => {
            if (err) {
                return res.status(500).json({ success: false, error: err })
            } else if (!players.length) {
                return res
                    .status(404)
                    .json({ success: false, data: [], error: `Players not found`})
            }
            return res.status(200).json({ success: true, data: players, count: filterCount })
        })
    }
}

getPlayersByTouchdowns = async (req, res) => {
    let page = req.query.page
    //Include id to stabilize the sort
    let sortPromise = Player.find().sort({ "TD": -1, "_id": 1 })
    let filterCount = await Player.find().sort({ "TD": -1, "_id": 1 }).countDocuments()
    if (!page || page <= 1) {
        await sortPromise.limit(pageCount).exec((err, players) => {
            if (err) {
                return res.status(500).json({ success: false, error: err })
            } else if (!players.length) {
                return res
                    .status(404)
                    .json({ success: false, data: [], error: `Players not found`})
            }
            return res.status(200).json({ success: true, data: players, count: filterCount })
        })
    } else {
        await sortPromise.skip(pageCount*(page - 1)).limit(pageCount).exec((err, players) => {
            if (err) {
                return res.status(500).json({ success: false, error: err })
            } else if (!players.length) {
                return res
                    .status(404)
                    .json({ success: false, data: [], error: `Players not found`})
            }
            return res.status(200).json({ success: true, data: players, count: filterCount })
        })
    }
}

getPlayerByName = async (req, res) => {
    let page = req.query.page
    let filterCount = await Player.find({ "Player": { $regex: new RegExp(req.params.name, "i") }}).countDocuments()
    let filterPromise = Player.find({ "Player": { $regex: new RegExp(req.params.name, "i") }})
    if (!page || page <= 1) {
        await filterPromise.limit(pageCount).exec((err, players) => {
            if (err) {
                return res.status(500).json({ success: false, error: err })
            } else if (!players.length) {
                return res
                    .status(404)
                    .json({ success: false, data: [], error: `No player with the name "${req.params.name}" found` })
            }
            return res.status(200).json({ success: true, data: players, count: filterCount })
        })
    } else {
        await filterPromise.skip(pageCount*(page - 1)).limit(pageCount).exec((err, players) => {
            if (err) {
                return res.status(500).json({ success: false, error: err })
            } else if (!players.length) {
                return res
                    .status(404)
                    .json({ success: false, data: [], error: `No player with the name "${req.params.name}" found` })
            }
            return res.status(200).json({ success: true, data: players, count: filterCount })
        })
    }
}

module.exports = {
    getAllPlayers,
    getPlayerByName,
    getPlayersByYards,
    getPlayersByLongestRun,
    getPlayersByTouchdowns
}