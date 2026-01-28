import { FitCourse } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentCourse: null | FitCourse;
};

const initialState: initialStateType = {
    currentCourse: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCurrentCourse: (state, action: PayloadAction<FitCourse>) => {
        state.currentCourse = action.payload;
    },
  },
});

export const { setCurrentCourse } = courseSlice.actions;
export const courseSliceReducer = courseSlice.reducer;
