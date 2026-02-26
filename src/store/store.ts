import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { courseSliceReducer } from '@/store/features/courseSlice';
import { authSliceReducer } from '@/store/features/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      courses: courseSliceReducer,
      auth: authSliceReducer,
    }),
  });
}; 

export type AppStore = ReturnType<typeof makeStore>;
type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import {
//   TypedUseSelectorHook,
//   useDispatch,
//   useSelector,
// } from 'react-redux';
// import { courseSliceReducer } from '@/store/features/courseSlice';
// import { authSliceReducer } from '@/store/features/authSlice';

// const rootReducer = combineReducers({
//   courses: courseSliceReducer,
//   auth: authSliceReducer,
// });

// export const makeStore = () =>
//   configureStore({
//     reducer: rootReducer, 
//   });

// // Типы
// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];

// // Типизированные хуки
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppStore = () => useSelector((state) => state);
