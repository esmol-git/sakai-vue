import api from './api';

const getProducts = ({ name, page, limit, sortBy }) => {
    return api.get('/products', {
        params: {
            name: '*' + name + '*',
            page,
            limit,
            sortBy
        }
    });
};

const getProduct = (id) => {
    return api.get(`/products/${id}`);
};

const createProduct = (data) => {
    return api.post('/products', data);
};

const updateProduct = (id, data) => {
    return api.patch(`/products/${id}`, data);
};

const delProduct = (id) => {
    return api.delete(`/products/${id}`);
};

export { createProduct, delProduct, getProduct, getProducts, updateProduct };
