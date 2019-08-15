import axios from 'axios';

export const query = (query) => {
    return axios.post('https://zero-games-server.herokuapp.com/games/query', query)
}

