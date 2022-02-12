import { createSlice } from '@reduxjs/toolkit';
// import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { register, logIn, logOut } from './auth-operations';

const initialState = {
  user: { password: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { email: '', password: '' },
    token: '',
    error: null,
    isLoading: false,
    isAuth: false,
    myProp: 'Hi',
  },
  // личный наш actions
  //   reducers: {
  //     test: (state, action) => {
  //       return {
  //         ...state,
  //         myProp: action.payload,
  //       };
  //     },
  //   },
  extraReducers: {
    //     [register.pending](state, actions) {
    //         return {
    //             ...state,
    //             isLoading: true,
    //         }
    //   }
    [register.fulfilled](state, action) {
      //   console.log(action);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuth: true,
      };
    },

    [logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },

    [logOut.fulfilled](state, _) {
      state.user = { password: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

//достали actions
// export const {test} = authSlice.actions;
//достали reducer
export default authSlice.reducer;
