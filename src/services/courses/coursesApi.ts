// import axios, { AxiosResponse } from 'axios';
// import { BASE_URL } from '@/services/constants';

// const authHeaders = () => {
//   if (typeof window === 'undefined') return {};
//   const token = localStorage.getItem('token');

//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// // все курсы
// export const getCourses = () => {
//   return axios.get(`${BASE_URL}/courses`).then((res) => res.data);
// };

// // курс по id
// export const getCourseById = (courseId: string) => {
//   return axios.get(`${BASE_URL}/courses/${courseId}`).then((res) => res.data);
// };

// // тренировки курса
// export const getCourseWorkouts = (courseId: string) => {
//   return axios
//     .get(`${BASE_URL}/courses/${courseId}/workouts`)
//     .then((res) => res.data);
// };

// // добавить курс пользователю
// // export const addCourseToUser = (courseId: string) => {
// //   return axios.post(
// //     `${BASE_URL}/users/me/courses`,
// //     { courseId },
// //     { headers: authHeaders() },
// //   );
// // };
// export const addCourseToUser = (
//   courseId: string,
// ): Promise<AxiosResponse<{ message: string }>> => {
//   return axios.post(
//     `${BASE_URL}/users/me/courses`,
//     { courseId },
//     { headers: { 'Content-Type': '', ...authHeaders() } }, // оставляем пустым
//   );
// };

// // удалить курс у пользователя
// export const removeCourseFromUser = (courseId: string) => {
//   return axios.delete(`${BASE_URL}/users/me/courses/${courseId}`, {
//     headers: authHeaders(),
//   });
// };

// // сбросить прогресс курса
// export const resetCourseProgress = (courseId: string) => {
//   return axios.patch(
//     `${BASE_URL}/courses/${courseId}/reset`,
//     {},
//     { headers: authHeaders() },
//   );
// };

// export const getCourseProgress = (courseId: string) => {
//   return axios.get(
//     `${BASE_URL}/users/me/progress?courseId=${courseId}`,
//     { headers: authHeaders() }
//   ).then(res => res.data);
// };

// export const saveWorkoutProgress = (
//   courseId: string,
//   workoutId: string,
//   progressData: number[]
// ) => {
//   return axios.patch(
//     `${BASE_URL}/courses/${courseId}/workouts/${workoutId}`,
//     { progressData },
//     { headers: authHeaders() }
//   );
// };

import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '@/services/constants';

// const authHeaders = (): Record<string, string> => {
//   if (typeof window === 'undefined') return {};

//   const token = localStorage.getItem('token');

//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

export const authHeaders = (): { Authorization: string } => {
  const token = localStorage.getItem('token') ?? '';

  return {
    Authorization: `Bearer ${token}`,
  };
};

// 🔹 все курсы
export const getCourses = () => {
  return axios
    .get(`${BASE_URL}/courses`, { headers: authHeaders() })
    .then((res) => res.data);
};

// 🔹 курс по id
export const getCourseById = (courseId: string) => {
  return axios
    .get(`${BASE_URL}/courses/${courseId}`, { headers: authHeaders() })
    .then((res) => res.data);
};

// 🔹 тренировки курса
export const getCourseWorkouts = (courseId: string) => {
  return axios
    .get(`${BASE_URL}/courses/${courseId}/workouts`, {
      headers: authHeaders(),
    })
    .then((res) => res.data);
};

// 🔹 добавить курс пользователю
export const addCourseToUser = (
  courseId: string,
): Promise<AxiosResponse<{ message: string }>> => {
  return axios.post(
    `${BASE_URL}/users/me/courses`,
    { courseId },
    {
      headers: {
        'Content-Type': '',
        ...authHeaders(),
      },
    },
  );
};

// 🔹 удалить курс
export const removeCourseFromUser = (courseId: string) => {
  return axios.delete(`${BASE_URL}/users/me/courses/${courseId}`, {
    headers: authHeaders(),
  });
};

// 🔹 сбросить прогресс
export const resetCourseProgress = (courseId: string) => {
  return axios.patch(
    `${BASE_URL}/courses/${courseId}/reset`,
    {},
    { headers: authHeaders() },
  );
};

// 🔹 получить прогресс
export const getCourseProgress = (courseId: string) => {
  return axios
    .get(`${BASE_URL}/users/me/progress?courseId=${courseId}`, {
      headers: authHeaders(),
    })
    .then((res) => res.data);
};

// 🔹 сохранить прогресс тренировки
export const saveWorkoutProgress = (
  courseId: string,
  workoutId: string,
  progressData: number[],
): Promise<void> => {
  const headers = { ...authHeaders(), 'Content-Type': '' };
  return axios.patch(
    `${BASE_URL}/courses/${courseId}/workouts/${workoutId}`,
    { progressData,
      saveWorkoutProgress: true, // добавляем флаг для сохранения прогресса тренировки
     },
    { headers},
  );
};



export const getWorkoutById = (workoutId: string) => {
  return axios
    .get(`${BASE_URL}/workouts/${workoutId}`, {
      headers: authHeaders(),
    })
    .then((res) => res.data);
};