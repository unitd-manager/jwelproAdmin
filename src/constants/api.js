import axios from 'axios'

const api = axios.create({
    
baseURL: 'https://jewelpro.unitdtechnologies.com:2024',
//  baseURL: 'http://localhost:5009',


});

export default api