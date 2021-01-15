import axios from 'axios';

const apiURL = "http://localhost:9000"

const getAllPlayers = (page = 1) => axios.get(`${apiURL}/list-players?page=${page}`)
const getPlayerByName = (name, page = 1) => axios.get(`${apiURL}/player/${name}?page=${page}`)
const getPlayersByYards = (page = 1) => axios.get(`${apiURL}/sort-players/yards?page=${page}`)
const getPlayersByLongestRun = (page = 1) => axios.get(`${apiURL}/sort-players/longest-run?page=${page}`)
const getPlayersByTouchdowns = (page = 1) => axios.get(`${apiURL}/sort-players/touchdowns?page=${page}`)

export {
    getAllPlayers,
    getPlayerByName,
    getPlayersByYards,
    getPlayersByLongestRun,
    getPlayersByTouchdowns
}