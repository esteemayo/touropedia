import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as authApi from 'services/authService';
import * as userApi from 'services/userService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ values, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await authApi.login({ ...values });
      toast.success('Login Successfully');
      navigate('/');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ credentials, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await userApi.register({ ...credentials });
      toast.success('Register Successfully');
      navigate('/');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  'auth/googleSignIn',
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await authApi.googleLogin(result);
      toast.success('Google Sign-in Successfully');
      navigate('/');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  user: null,
  error: '',
  loading: false,
};

const tokenKey = 'token';
const token = localStorage.getItem(tokenKey);

if (token) {
  const decodedToken = jwtDecode(token);
  const expiredToken = decodedToken.exp * 1000;

  if (Date.now() > expiredToken) {
    localStorage.removeItem(tokenKey);
  } else {
    initialState.user = decodedToken;
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      localStorage.setItem(tokenKey, payload.token);
      state.user = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      localStorage.setItem(tokenKey, payload.token);
      state.user = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
    [googleSignIn.pending]: (state) => {
      state.loading = true;
    },
    [googleSignIn.fulfilled]: (state, { payload }) => {
      state.loading = false;
      localStorage.setItem(tokenKey, payload.token);
      state.user = payload;
    },
    [googleSignIn.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    },
  },
});

export const { setLogout } = authSlice.actions;

export default authSlice.reducer;
