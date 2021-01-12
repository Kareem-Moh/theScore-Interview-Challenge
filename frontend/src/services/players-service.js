import axios from 'axios';

const apiURL = "http://localhost:9000"

const getAllPlayers = () => axios.get(`${apiURL}/list-players`)
const getPlayerByName = (name) => axios.get(`${apiURL}/player/${name}`)
const getPlayersByYards = () => axios.get(`${apiURL}/sort-players/yards`)
const getPlayersByLongestRun = () => axios.get(`${apiURL}/sort-players/longest-run`)
const getPlayersByTouchdowns = () => axios.get(`${apiURL}/sort-players/touchdowns`)

export {
    getAllPlayers,
    getPlayerByName,
    getPlayersByYards,
    getPlayersByLongestRun,
    getPlayersByTouchdowns
}