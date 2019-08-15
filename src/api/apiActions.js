import axios from 'axios';

export const query = (query) => {
    return axios.post('http://localhost:7000/games/query', query)
}

