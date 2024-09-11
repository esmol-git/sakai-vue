import api from './api';

const login = (userData) => {
    return api.post('/auth/', userData);
};

const register = (userData) => {
    return api.post('/register', userData);
};

export { login, register };
