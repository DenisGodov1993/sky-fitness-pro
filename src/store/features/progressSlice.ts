import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CourseProgress {
  courseId: string;
  completedWorkouts: number;
  totalWorkouts: number;
}

interface ProgressState {
  progressMap: Record<string, CourseProgress>;
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  progressMap: {},
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgressLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setAllProgress(
      state,
      action: PayloadAction<Record<string, CourseProgress>>,
    ) {
      state.progressMap = action.payload;
    },

    updateCourseProgress(state, action: PayloadAction<CourseProgress>) {
      state.progressMap[action.payload.courseId] = action.payload;
    },

    setProgressError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    clearProgress(state) {
      state.progressMap = {};
    },
  },
});

export const {
  setProgressLoading,
  setAllProgress,
  updateCourseProgress,
  setProgressError,
  clearProgress,
} = progressSlice.actions;

export const progressSliceReducer = progressSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { CourseProgressApi } from '@/sharedTypes/sharedTypes';

// interface ProgressState {
//   courseProgress: CourseProgressApi | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ProgressState = {
//   courseProgress: null,
//   loading: false,
//   error: null,
// };

// const progressSlice = createSlice({
//   name: 'progress',
//   initialState,
//   reducers: {
//     setProgressLoading(state, action: PayloadAction<boolean>) {
//       state.loading = action.payload;
//     },
//     setCourseProgress(state, action: PayloadAction<CourseProgressApi | null>) {
//       state.courseProgress = action.payload;
//     },
//     setProgressError(state, action: PayloadAction<string | null>) {
//       state.error = action.payload;
//     },
//     clearProgress(state) {
//       state.courseProgress = null;
//     },
//   },
// });

// export const {
//   setProgressLoading,
//   setCourseProgress,
//   setProgressError,
//   clearProgress,
// } = progressSlice.actions;

// export const progressSliceReducer = progressSlice.reducer;
