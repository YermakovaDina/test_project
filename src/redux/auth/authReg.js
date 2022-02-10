import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_USER_URL = 'http://localhost:3000';
const userLogin = '/api/auth/login';
const userRegister = '/api/auth/registration';
const userLogOut = '/api/auth/logout';
const userCurrent = '/api/users/';

export const authRegister = createAsyncThunk(
  'users/register',
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_USER_URL + userRegister, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (data.code === 409) {
        alert('Такой пользователь уже есть, попробуйте другое имя');
        throw new Error('Required');
      }
      return data.data;
    } catch (error) {
      return rejectWithValue({
        error: error.message,
      });
    }
  },
);
