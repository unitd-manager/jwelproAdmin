import axios from 'axios'

const api = axios.create({
    
baseURL: 'http://192.64.114.83:2023',
// baseURL: 'http://localhost:5009',


});

export default api