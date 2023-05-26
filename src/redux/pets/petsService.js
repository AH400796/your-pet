import axios from 'axios';
// import { setAuthHeader, clearAuthHeader } from 'redux/auth/utility/authUtility';

const baseServerURL = `https://your-pet-api.onrender.com`;
const baseAPIEndpoint = '/api/v1';
axios.defaults.baseURL = baseServerURL + baseAPIEndpoint;

export const getFriends = async () => {
  const response = await axios.get('/friends');
  return response;
};

export const getPets = async () => {
  const response = await axios.get('/pets');
  return response;
};

export const createPet = async body => {
  return await axios.post(`/pets`, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deletePet = async id => {
  return await axios.delete(`/pets/${id}`);
};

export const createNotice = async body => {
  return await axios.post(`/notices`, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// export const registerUser = async function (body) {
//   return await axios.post('/users/register', body);
// };

// export const verify = async function (body) {
//   return await axios.post('/users/verify', body);
// };

// export const reVerify = async function (body) {
//   return await axios.post('/users/reverify', body);
// };

// export const loginUser = async function (body) {
//   const result = await axios.post('/users/login', body);
//   setAuthHeader(result.data.token);
//   return result;
// };

// export const loginOut = async function () {
//   const result = await axios.post('/users/logout');
//   clearAuthHeader();
//   return result;
// };

// export const getCurrentUser = async function (token) {
//   setAuthHeader(token);
//   const result = await axios.get('/users/currentUser');
//   return result;
// };
