import axios from 'axios';
import { BASE_URL } from '@/services/constants';

const authHeaders = () => {
  if (typeof window === 'undefined') return {};
  const token = sessionStorage.getItem('token');

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

// все курсы
export const getCourses = () => {
  return axios.get(`${BASE_URL}/courses`).then((res) => res.data);
};

// курс по id
export const getCourseById = (courseId: string) => {
  return axios.get(`${BASE_URL}/courses/${courseId}`).then((res) => res.data);
};

// тренировки курса
export const getCourseWorkouts = (courseId: string) => {
  return axios
    .get(`${BASE_URL}/courses/${courseId}/workouts`)
    .then((res) => res.data);
};

// добавить курс пользователю
export const addCourseToUser = (courseId: string) => {
  return axios.post(
    `${BASE_URL}/users/me/courses`,
    { courseId },
    { headers: authHeaders() },
  );
};

// удалить курс у пользователя
export const removeCourseFromUser = (courseId: string) => {
  return axios.delete(`${BASE_URL}/users/me/courses/${courseId}`, {
    headers: authHeaders(),
  });
};

// сбросить прогресс курса
export const resetCourseProgress = (courseId: string) => {
  return axios.patch(
    `${BASE_URL}/courses/${courseId}/reset`,
    {},
    { headers: authHeaders() },
  );
};

// import axios from 'axios';
// import { BASE_URL } from '@/services/constants';
// import {
//   CourseListItem,
//   CourseDetail,
//   WorkoutApi,
//   AddCourseRequest,
//   AddCourseResponse,
//   DeleteCourseResponse,
//   ResetCourseProgressResponse,
//   GetCourseWorkoutsResponse,
//   CourseProgressResponse,
//   WorkoutProgressResponse,
//   SaveWorkoutProgressRequest,
//   SaveWorkoutProgressResponse,
//   ResetWorkoutProgressResponse,
// } from '@/sharedTypes/sharedTypes';

// // Получение заголовков с авторизацией
// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   if (!token) return {};
//   return { Authorization: `Bearer ${token}` };
// };
// // export const getAuthHeaders = ():
// //   | { Authorization: string }
// //   | Record<string, never> => {
// //   const token = getToken();
// //   if (token) {
// //     return {
// //       Authorization: `Bearer ${token}`,
// //     };
// //   }
// //   return {};
// // };

// // КУРСЫ

// // 1. Получить все курсы
// export const getAllCourses = (): Promise<CourseListItem[]> => {
//   return axios
//     .get<CourseListItem[]>(`${BASE_URL}/courses`, { 
//       headers: getAuthHeaders(),
//     })
//     .then((res) => res.data);
// };

// // export const getCourses = (): Promise<CourseFromAPI[]> => {
// //   return axios
// //     .get<CourseFromAPI[]>(BASE_URL + '/courses')
// //     .then((res: { data: CourseFromAPI[] }) => res.data);
// // };


// // 2. Получить курс по ID
// export const getCourseById = (courseId: string): Promise<CourseDetail> => {
//   return axios
//     .get<CourseDetail>(`${BASE_URL}/courses/${courseId}`, {
//       headers: getAuthHeaders(),
//     })
//     .then((res) => res.data);
// };
// // export const getCourseById = (courseId: string): Promise<CourseFromAPI> => {
// //   return axios
// //     .get<CourseFromAPI>(BASE_URL + `/courses/${courseId}`)
// //     .then((res) => res.data);
// // };

// // 3. Добавить курс пользователю
// export const addCourseToUser = (
//   courseId: string,
// ): Promise<AddCourseResponse> => {
//   const body: AddCourseRequest = { courseId };
//   return axios
//     .post<AddCourseResponse>(`${BASE_URL}/users/me/courses`, body, {
//       headers: getAuthHeaders(),
//     })
//     .then((res) => res.data);
// };

// // export const addUserCourse = (courseId: string): Promise<AddCourseResponse> => {
// //   const headers = { ...getAuthHeaders(), 'Content-Type': '' };
// //   return axios
// //     .post<AddCourseResponse>(
// //       BASE_URL + '/users/me/courses',
// //       { courseId },
// //       {
// //         headers,
// //       },
// //     )
// //     .then((res) => res.data);
// // };

// // 4. Удалить курс у пользователя
// export const removeUserCourse = (
//   courseId: string,
// ): Promise<DeleteCourseResponse> => {
//   return axios
//     .delete<DeleteCourseResponse>(`${BASE_URL}/users/me/courses/${courseId}`, {
//       headers: getAuthHeaders(),
//     })
//     .then((res) => res.data);
// };

// // 5. Сбросить прогресс по курсу
// export const resetCourseProgress = (
//   courseId: string,
// ): Promise<ResetCourseProgressResponse> => {
//   return axios
//     .patch<ResetCourseProgressResponse>(
//       `${BASE_URL}/courses/${courseId}/reset`,
//       {},
//       { headers: getAuthHeaders() },
//     )
//     .then((res) => res.data);
// };

// // ТРЕНИРОВКИ

// // 6. Получить список тренировок курса
// export const getCourseWorkouts = (
//   courseId: string,
// ): Promise<GetCourseWorkoutsResponse> => {
//   return axios
//     .get<GetCourseWorkoutsResponse>(
//       `${BASE_URL}/courses/${courseId}/workouts`,
//       {
//         headers: getAuthHeaders(),
//       },
//     )
//     .then((res) => res.data);
// };

// // 7. Получить тренировку по ID
// // export const getWorkoutById = (
// //   workoutId: string,
// // ): Promise<GetWorkoutResponse> => {
// //   return axios
// //     .get<GetWorkoutResponse>(`${BASE_URL}/workouts/${workoutId}`, {
// //       headers: getAuthHeaders(),
// //     })
// //     .then((res) => res.data);
// // };
// export const getWorkoutById = (workoutId: string): Promise<WorkoutApi> => {
//   return axios
//     .get<WorkoutApi>(`${BASE_URL}/workouts/${workoutId}`, {
//       headers: getAuthHeaders(),
//     })
//     .then((res) => res.data);
// };

// // ПРОГРЕСС

// // 8. Получить прогресс по всему курсу
// export const getCourseProgress = (
//   courseId: string,
// ): Promise<CourseProgressResponse> => {
//   return axios
//     .get<CourseProgressResponse>(`${BASE_URL}/users/me/progress`, {
//       params: { courseId },
//       headers: getAuthHeaders(),
//     })
//     .then((res) => res.data);
// };

// // 9. Получить прогресс по одной тренировке
// export const getWorkoutProgress = (
//   courseId: string,
//   workoutId: string,
// ): Promise<WorkoutProgressResponse> => {
//   return axios
//     .get<WorkoutProgressResponse>(`${BASE_URL}/users/me/progress`, {
//       params: { courseId, workoutId },
//       headers: getAuthHeaders(),
//     })
//     .then((res) => res.data);
// };

// // 10. Сохранить прогресс тренировки
// export const saveWorkoutProgress = (
//   courseId: string,
//   workoutId: string,
//   progressData: number[],
// ): Promise<SaveWorkoutProgressResponse> => {
//   const body: SaveWorkoutProgressRequest = { progressData };
//   return axios
//     .patch<SaveWorkoutProgressResponse>(
//       `${BASE_URL}/courses/${courseId}/workouts/${workoutId}`,
//       body,
//       { headers: getAuthHeaders() },
//     )
//     .then((res) => res.data);
// };

// // 11. Сбросить прогресс по тренировке
// export const resetWorkoutProgress = (
//   courseId: string,
//   workoutId: string,
// ): Promise<ResetWorkoutProgressResponse> => {
//   return axios
//     .patch<ResetWorkoutProgressResponse>(
//       `${BASE_URL}/courses/${courseId}/workouts/${workoutId}/reset`,
//       {},
//       { headers: getAuthHeaders() },
//     )
//     .then((res) => res.data);
// };


// import axios, { AxiosHeaders } from 'axios';
// import { BASE_URL } from '@/services/constants';
// import {
//   CourseListItem,
//   CourseDetail,
//   WorkoutApi,
//   AddCourseRequest,
//   AddCourseResponse,
//   DeleteCourseResponse,
//   ResetCourseProgressResponse,
//   GetCourseWorkoutsResponse,
//   CourseProgressResponse,
//   WorkoutProgressResponse,
//   SaveWorkoutProgressRequest,
//   SaveWorkoutProgressResponse,
//   ResetWorkoutProgressResponse,
// } from '@/sharedTypes/sharedTypes';

// // Получение заголовков с авторизацией
// const getAuthHeaders = (): AxiosHeaders => {
//   const token = localStorage.getItem('token');
//   return {
//     Authorization: token ? `Bearer ${token}` : '',
//   } as unknown as AxiosHeaders;
// };

// // КУРСЫ

// // 1. Получить все курсы
// export const getAllCourses = (): Promise<CourseListItem[]> => {
//   return axios
//     .get<CourseListItem[]>(`${BASE_URL}/courses`, { 
//       headers: getAuthHeaders(),
//     })
//     .then((res) => res.data);
// };

// // 2. Получить курс по ID
// export const getCourseById = (courseId: string): Promise<CourseDetail> => {
//   return axios
//     .get<CourseDetail>(`${BASE_URL}/courses/${courseId}`, {
//       headers: getAuthHeaders(),
//     })
//     .then((res) => res.data);
// };

// // 3. Добавить курс пользователю
// export const addCourseToUser = (
//   courseId: string,
// ): Promise<AddCourseResponse> => {
//   const body: AddCourseRequest = { courseId };
//   return axios
//     .post<AddCourseResponse>(`${BASE_URL}/users/me/courses`, body, {
//       headers: getAuthHeaders(),
//     })
//     .then((res) => res.data);
// };

// // 4. Удалить курс у пользователя
// export const removeUserCourse = (
//   courseId: string,
// ): Promise<DeleteCourseResponse> => {
//   return axios
//     .delete<DeleteCourseResponse>(`${BASE_URL}/users/me/courses/${courseId}`, {
//       headers: getAuthHeaders(),
//     })
//     .then((res) => res.data);
// };

// // 5. Сбросить прогресс по курсу
// export const resetCourseProgress = (
//   courseId: string,
// ): Promise<ResetCourseProgressResponse> => {
//   return axios
//     .patch<ResetCourseProgressResponse>(
//       `${BASE_URL}/courses/${courseId}/reset`,
//       {},
//       { headers: getAuthHeaders() },
//     )
//     .then((res) => res.data);
// };

// // ТРЕНИРОВКИ

// // 6. Получить список тренировок курса
// export const getCourseWorkouts = (
//   courseId: string,
// ): Promise<GetCourseWorkoutsResponse> => {
//   return axios
//     .get<GetCourseWorkoutsResponse>(
//       `${BASE_URL}/courses/${courseId}/workouts`,
//       {
//         headers: getAuthHeaders(),
//       },
//     )
//     .then((res) => res.data);
// };

// // 7. Получить тренировку по ID
// // export const getWorkoutById = (
// //   workoutId: string,
// // ): Promise<GetWorkoutResponse> => {
// //   return axios
// //     .get<GetWorkoutResponse>(`${BASE_URL}/workouts/${workoutId}`, {
// //       headers: getAuthHeaders(),
// //     })
// //     .then((res) => res.data);
// // };
// export const getWorkoutById = (workoutId: string): Promise<WorkoutApi> => {
//   return axios
//     .get<WorkoutApi>(`${BASE_URL}/workouts/${workoutId}`, {
//       headers: getAuthHeaders(),
//     })
//     .then((res) => res.data);
// };

// // ПРОГРЕСС

// // 8. Получить прогресс по всему курсу
// export const getCourseProgress = (
//   courseId: string,
// ): Promise<CourseProgressResponse> => {
//   return axios
//     .get<CourseProgressResponse>(`${BASE_URL}/users/me/progress`, {
//       params: { courseId },
//       headers: getAuthHeaders(),
//     })
//     .then((res) => res.data);
// };

// // 9. Получить прогресс по одной тренировке
// export const getWorkoutProgress = (
//   courseId: string,
//   workoutId: string,
// ): Promise<WorkoutProgressResponse> => {
//   return axios
//     .get<WorkoutProgressResponse>(`${BASE_URL}/users/me/progress`, {
//       params: { courseId, workoutId },
//       headers: getAuthHeaders(),
//     })
//     .then((res) => res.data);
// };

// // 10. Сохранить прогресс тренировки
// export const saveWorkoutProgress = (
//   courseId: string,
//   workoutId: string,
//   progressData: number[],
// ): Promise<SaveWorkoutProgressResponse> => {
//   const body: SaveWorkoutProgressRequest = { progressData };
//   return axios
//     .patch<SaveWorkoutProgressResponse>(
//       `${BASE_URL}/courses/${courseId}/workouts/${workoutId}`,
//       body,
//       { headers: getAuthHeaders() },
//     )
//     .then((res) => res.data);
// };

// // 11. Сбросить прогресс по тренировке
// export const resetWorkoutProgress = (
//   courseId: string,
//   workoutId: string,
// ): Promise<ResetWorkoutProgressResponse> => {
//   return axios
//     .patch<ResetWorkoutProgressResponse>(
//       `${BASE_URL}/courses/${courseId}/workouts/${workoutId}/reset`,
//       {},
//       { headers: getAuthHeaders() },
//     )
//     .then((res) => res.data);
// };
