import axios from  'axios';

// Criando uma instância para fornecer uma baseURL
const api = axios.create({
    baseURL: 'https://omnistack-bckend.herokuapp.com'
});

export default api;