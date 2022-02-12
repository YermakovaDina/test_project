import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'https://capusta2.herokuapp.com/api/transactions/:id';
axios.defaults.baseURL = 'https://connections-api.herokuapp.com/users';
// const BASE_URL = 'https://connections-api.herokuapp.com';

// const userRegister = '/users/signup';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

// export const register = createAsyncThunk(
//   '/signup',
//   async (user, { rejectWithValue }) => {
//     try {
//       const response = await fetch(BASE_URL + userRegister, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user),
//       });
//       // console.log('response', response);
//       const data = await response.json();
//       console.log('response', data); // возвращает объект {token: "", user: {email: "", password: ""}}
//       return data; // action.payload
//     } catch (error) {
//       rejectWithValue({ error: error.message });
//       console.log(error.response);
//     }
//   },
// );

export const register = createAsyncThunk(
  '/signup',
  async (credentials, { rejectWithValue }) => {
    // async credentials => {
    try {
      const { data } = await axios.post('/signup', credentials);
      console.log(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue({ error: error.message });
    }
  },
);

export const logIn = createAsyncThunk(
  '/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/login', credentials);

      token.set(data.token);
      return data;
    } catch (error) {
      console.warn(error);
      rejectWithValue({ error: error.message });
    }
  },
);

export const logOut = createAsyncThunk('/logout', async () => {
  try {
    await axios.post('/logout');
    token.unset();
  } catch (error) {}
});
