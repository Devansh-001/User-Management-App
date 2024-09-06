import axios from 'axios'

const Base_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = () => axios.get(Base_URL);
export const fetchUser = (id) => axios.get(`${Base_URL}/${id}`)
export const createUser = (user) => axios.post(Base_URL, user);
export const updateUser = (id, user) => axios.put(`${Base_URL}/${id}`, user);
export const deleteUser = (id) => axios.delete(`${Base_URL}/${id}`);