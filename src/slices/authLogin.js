import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: window.localStorage.getItem('isLoggedIn') === 'true',
  isAdmin: window.localStorage.getItem('isAdmin') === 'true',
  profile: window.localStorage.getItem('profile')
    ? JSON.parse(window.localStorage.getItem('profile'))
    : {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.isAdmin = action.payload.isAdmin;
      state.profile = action.payload;
      window.localStorage.setItem('isAdmin', state.profile.isAdmin);
      window.localStorage.setItem('isLoggedIn', true);
      window.localStorage.setItem('profile', JSON.stringify(action.payload));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.profile = {};
      window.localStorage.setItem('isAdmin', false);
      window.localStorage.setItem('isLoggedIn', false);
      window.localStorage.setItem('profile', JSON.stringify({}));
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
