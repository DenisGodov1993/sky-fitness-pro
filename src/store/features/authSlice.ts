import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  username: string;
  token: string;
};

const initialState: AuthState = {
  username: '',
  token: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ username: string; token: string }>,
    ) => {
      state.username = action.payload.username;
      state.token = action.payload.token;

      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('token', action.payload.token);
    },
    clearUser: (state) => {
      state.username = '';
      state.token = '';

      localStorage.removeItem('username');
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
