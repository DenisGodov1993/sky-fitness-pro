import { CourseApiType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentCourse: null | CourseApiType;
  allCourses: CourseApiType[];
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
  },
});

export const {
  setCurrentCourse,
  setAllCourses,
  setFetchError,
  setFetchIsLoading,
} = courseSlice.actions;
export const courseSliceReducer = courseSlice.reducer;

// // import { FitCourse } from '@/sharedTypes/sharedTypes';
// import { CourseApiType } from '@/sharedTypes/sharedTypes';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type initialStateType = {
//   currentCourse: null | CourseApiType;
//   allCourses: CourseApiType[];
//   fetchError: null | string;
//   fetchIsLoading: boolean;
// };

// const initialState: initialStateType = {
//   currentCourse: null,
//   allCourses: [],
//   fetchError: null,
//   fetchIsLoading: true,
// };

// const courseSlice = createSlice({
//   name: 'courses',
//   initialState,
//   reducers: {
//     setCurrentCourse: (state, action: PayloadAction<CourseApiType>) => {
//       state.currentCourse = action.payload;
//     },
//     setAllCourses: (state, action: PayloadAction<CourseApiType[]>) => {
//       state.allCourses = action.payload;
//     },
//     setFetchError: (state, action: PayloadAction<string>) => {
//       state.fetchError = action.payload;
//     },
//     setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
//       state.fetchIsLoading = action.payload;
//     },
//   },
// });

// export const {
//   setCurrentCourse,
//   setAllCourses,
//   setFetchError,
//   setFetchIsLoading,
// } = courseSlice.actions;
// export const courseSliceReducer = courseSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { CourseDetail } from '@/sharedTypes/sharedTypes';

// type CourseState = {
//   currentCourse: CourseDetail | null;
//   allCourses: CourseDetail[]; 
//   coursesProgress: Record<string, number>;
//   fetchError: string | null;
//   fetchIsLoading: boolean;
// };

// const initialState: CourseState = { 
//   currentCourse: null,
//   allCourses: [],
//   coursesProgress: {},
//   fetchError: null,
//   fetchIsLoading: false,
// };

// export const courseSlice = createSlice({
//   name: 'courses',
//   initialState,
//   reducers: {
//     setCurrentCourse: (state, action: PayloadAction<CourseDetail>) => {
//       state.currentCourse = action.payload;
//     },
//     clearCurrentCourse: (state) => {
//       state.currentCourse = null;
//     },
//     setAllCourses: (state, action: PayloadAction<CourseDetail[]>) => {
//       state.allCourses = action.payload;
//     },
//     setCoursesProgress: (
//       state,
//       action: PayloadAction<Record<string, number>>,
//     ) => {
//       state.coursesProgress = action.payload;
//     },
//     setFetchError: (state, action: PayloadAction<string | null>) => {
//       state.fetchError = action.payload;
//     },
//     setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
//       state.fetchIsLoading = action.payload;
//     },
//   },
// });

// // Именованный экспорт редьюсера
// export const courseSliceReducer = courseSlice.reducer;

// // Экшены
// export const {
//   setCurrentCourse,
//   clearCurrentCourse,
//   setAllCourses,
//   setCoursesProgress,
//   setFetchError,
//   setFetchIsLoading,
// } = courseSlice.actions;

// // Селекторы
// export const selectCurrentCourse = (state: { courses: CourseState }) =>
//   state.courses.currentCourse;
// export const selectAllCourses = (state: { courses: CourseState }) =>
//   state.courses.allCourses;
// export const selectCoursesProgress = (state: { courses: CourseState }) =>
//   state.courses.coursesProgress;
// export const selectFetchError = (state: { courses: CourseState }) =>
//   state.courses.fetchError;
// export const selectFetchIsLoading = (state: { courses: CourseState }) =>
//   state.courses.fetchIsLoading;
