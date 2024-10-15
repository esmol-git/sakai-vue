import api from './api';

const getProducts = ({ name, category, inventoryStatus, rating, page, limit, sortBy }) => {
    return api.get('/products', {
        params: {
            name: name ? '*' + name + '*' : null,
            category,
            'inventoryStatus.value': inventoryStatus,
            rating,
            page,
            limit,
            sortBy
        }
    });
};

const addFavorite = (data) => {
    return api.post(`/favorites`, data);
};

const delFavorite = (id) => {
    return api.delete(`/favorites/${id}`);
};

const getFavorites = () => {
    return api.get(`/favorites`);
};

const updatedFavorites = (id, data) => {
    return api.patch(`/favorites/${id}`, data);
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

const addProductCart = (data) => {
    return api.post('/cart', data);
};
const getCart = () => {
    return api.get('/cart');
};

export { addFavorite, createProduct, delFavorite, delProduct, getFavorites, getProduct, getProducts, updateProduct, updatedFavorites, addProductCart, getCart };
