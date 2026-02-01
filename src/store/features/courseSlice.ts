import { FitCourse } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentCourse: null | FitCourse;
  allCourses: FitCourse[];
  fetchError: null | string;
  fetchIsLoading: boolean;
};

const initialState: initialStateType = {
  currentCourse: null,
  allCourses: [],
  fetchError: null,
  fetchIsLoading: true,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCurrentCourse: (state, action: PayloadAction<FitCourse>) => {
      state.currentCourse = action.payload;
    },
    setAllCourses: (state, action: PayloadAction<FitCourse[]>) => {
      state.allCourses = action.payload;
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
  },
});

export const {
  setCurrentCourse,
  setAllCourses,
  setFetchError,
  setFetchIsLoading,
} = courseSlice.actions;
export const courseSliceReducer = courseSlice.reducer;
