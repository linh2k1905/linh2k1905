import axios from '../axios';
const handelLoginAPI = (email, password) => {
    return axios.post('/api/login', {
        email: email
        , password: password
    });
}
const getAllUser = (idUser) => {
    return axios.get(`/api/get-all-users?id=${idUser}`)
}
export { handelLoginAPI, getAllUser }
