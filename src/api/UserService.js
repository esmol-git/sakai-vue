import api from './api';

const getUsers = () => {
    return api.get(`/users`);
};
const getUser = (_id) => {
    return api.get(`/user/${_id}`);
};

export { getUser, getUsers };
