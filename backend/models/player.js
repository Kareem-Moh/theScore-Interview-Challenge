const mongoose = require('mongoose');
const { Positions, Teams } = require('./constants')

const Schema = mongoose.Schema

const Player = new Schema(
    {
        Player: { 
            type: String, 
            required: [true, "Error: Player Name Required"]
        },
        Team: { 
            type: String, 
            required: [true, "Error: Team Name Required"],
            enum: Teams
        },
        Pos: { 
            type: String, 
            required: [true, "Error: Position Required"],
            enum: Positions
        },
        Att: { type: Number },
        AttPerG: { type: Number },
        Yds: Schema.Types.Mixed,
        Avg: { type: Number },
        YdsPerG: { type: Number },
        TD: { type: Number },
        Lng: Schema.Types.Mixed,
        First: { type: Number },
        FirstPercentage: { type: Number },
        TwentyPlus: { type: Number },
        FourtyPlus: { type: Number },
        FUM: { type: Number }
    },
    { timestamps: true }
)

module.exports = mongoose.model('players', Player)