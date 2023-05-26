import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthHeader, clearAuthHeader } from './utility/authUtility';

axios.defaults.baseURL = 'https://your-pet-api.onrender.com/api/v1/';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    // console.log(credentials);
    try {
      const { data } = await axios.post('auth/register', credentials);
      setAuthHeader(data.body.accessToken);
      return data;
    } catch (error) {
      const { message } = error;
      alert(message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async ({ values }, thunkAPI) => {
    try {
      const { data } = await axios.post('auth/login', values);
      console.log('Запит на логін:', data.body.accessToken);
      setAuthHeader(data.body.accessToken);
      return data;
    } catch (error) {
      const { message } = error;
      alert(message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('auth/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const userCurrent = createAsyncThunk(
  'auth/userCurrent',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const { data } = await axios.get('auth/current');
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const refreshTokens = createAsyncThunk(
  'auth/refreshTokens',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const oldRefreshToken = state.auth.refreshToken;

    try {
      const { data } = await axios.post('auth/refresh', {
        refreshToken: oldRefreshToken,
      });
      setAuthHeader(data.body.accessToken);
      console.log('REFRESH:', data.body.accessToken);
      console.log(axios.defaults.headers.common.Authorization);
      return data;
    } catch (error) {
      if (error.response.data.code === 401) {
        clearAuthHeader();
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/update',
  async (formData, thunkAPI) => {
    console.log(333, formData);
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;
    // console.log('token', token);
    setAuthHeader(token);
    try {
      const { data } = await axios.put('auth/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(888, data);
      return data;
    } catch (error) {
      if (error.response.data.code === 401) {
        clearAuthHeader();
      }
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
