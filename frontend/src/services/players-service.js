import axios from 'axios';
// import { apiURL } from './service-constants'


export const getAllPlayers = () => axios.get(`http://localhost:9000/list-players`)