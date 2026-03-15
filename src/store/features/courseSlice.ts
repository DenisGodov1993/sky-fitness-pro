import { CourseApiType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentCourse: null | CourseApiType;
  allCourses: CourseApiType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
  userId: string | null;
};

const initialState: initialStateType = {
  currentCourse: null,
  allCourses: [],
  fetchError: null,
  fetchIsLoading: true,
  userId: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCurrentCourse: (state, action: PayloadAction<CourseApiType>) => {
      state.currentCourse = action.payload;
    },
    setAllCourses: (state, action: PayloadAction<CourseApiType[]>) => {
      state.allCourses = action.payload;
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },

    setUser: (
      state,
      action: PayloadAction<{ username: string; userId: string }>,
    ) => {
      state.userId = action.payload.userId;
    },
  },
});

export const {
  setCurrentCourse,
  setAllCourses,
  setFetchError,
  setFetchIsLoading,
  setUser,
} = courseSlice.actions;
export const courseSliceReducer = courseSlice.reducer;