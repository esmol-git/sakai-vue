import api from './api';

const getProducts = ({ name, category, inventoryStatus, rating, status, page, limit, sortBy }) => {
    return api.get('/products', {
        params: {
            name: name ? '*' + name + '*' : null,
            category,
            'inventoryStatus.value': inventoryStatus,
            rating,
            status,
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
const delCart = (id) => {
    return api.delete(`/cart/${id}`);
};

const getInfo = () => {
    return api.get('/main');
};

const getIntro = () => {
    return api.get('/intro');
};

const getCollections = () => {
    return api.get('/collections');
};

const getFeatures = () => {
    return api.get('/features');
};

const getOffers = () => {
    return api.get('/offers');
};

export { addFavorite, addProductCart, createProduct, delCart, delFavorite, delProduct, getCart, getCollections, getFavorites, getFeatures, getInfo, getIntro, getOffers, getProduct, getProducts, updateProduct, updatedFavorites };

