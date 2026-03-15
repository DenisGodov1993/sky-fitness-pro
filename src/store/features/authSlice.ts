import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  username: string;
  token: string;
  selectedCourses: string[];
};

const initialState: AuthState = {
  username: '',
  token: '',
  selectedCourses: [],
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        username: string;
        token: string;
        selectedCourses?: string[];
      }>,
    ) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      if (action.payload.selectedCourses) {
        state.selectedCourses = action.payload.selectedCourses;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('username', action.payload.username);
        localStorage.setItem('token', action.payload.token);
      }
    },
    clearUser: (state) => {
      state.username = '';
      state.token = '';
      state.selectedCourses = [];

      if (typeof window !== 'undefined') {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
      }
    },
    addSelectedCourse: (state, action: PayloadAction<string>) => {
      if (!state.selectedCourses.includes(action.payload)) {
        state.selectedCourses.push(action.payload);
      }
    },
    removeSelectedCourse: (state, action: PayloadAction<string>) => {
      state.selectedCourses = state.selectedCourses.filter(
        (id) => id !== action.payload,
      );
    },
  },
});

export const { setUser, clearUser, addSelectedCourse, removeSelectedCourse } =
  authSlice.actions;
export const authSliceReducer = authSlice.reducer;