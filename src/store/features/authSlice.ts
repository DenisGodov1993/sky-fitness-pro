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

      if (typeof window !== 'undefined') {
        localStorage.setItem('username', action.payload.username);
        localStorage.setItem('token', action.payload.token);
      }
    },
    clearUser: (state) => {
      state.username = '';
      state.token = '';

      if (typeof window !== 'undefined') {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
      }
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   username: string;
//   token: string;
//   id: string;
// }

// // const initialState: AuthState = {
// //   username: '',
// //   token: '',
// //   id: '',
// // };

// const initialState: AuthState = {
//   username: typeof window !== 'undefined' ? localStorage.getItem('username') || '' : '',
//   token: typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '',
//   id: typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : '',
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (
//       state,
//       action: PayloadAction<{ username: string; token: string; id: string }>
//     ) => {
//       state.username = action.payload.username;
//       state.token = action.payload.token;
//       state.id = action.payload.id;

//       if (typeof window !== 'undefined') {
//         localStorage.setItem('username', action.payload.username);
//         localStorage.setItem('token', action.payload.token);
//         localStorage.setItem('userId', action.payload.id);
//       }
//     },
//     clearUser: (state) => {
//       state.username = '';
//       state.token = '';
//       state.id = '';

//       if (typeof window !== 'undefined') {
//         localStorage.removeItem('username');
//         localStorage.removeItem('token');
//         localStorage.removeItem('userId');
//       }
//     },
//   },
// });

// export const { setUser, clearUser } = authSlice.actions;
// export const authSliceReducer = authSlice.reducer;

