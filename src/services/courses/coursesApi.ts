// import axios from 'axios';
// import { BASE_URL } from '@services/constants';
// // import { FitCourse } from '@/sharedTypes/sharedTypes';

// export const getCourses = (): Promise<FitCourse[]> => {
//   return axios(BASE_URL + '/courses').then((res) => {
//     // console.log(res)
//     return res.data;
//   });
// };

import axios from 'axios';
import { BASE_URL } from '@/services/constants';

// 🔑 хелпер для headers (не отдельный файл!)
const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

/* ===== COURSES ===== */

// все курсы
export const getCourses = () => {
  return axios.get(`${BASE_URL}/courses`).then(res => res.data);
};

// курс по id
export const getCourseById = (courseId: string) => {
  return axios
    .get(`${BASE_URL}/courses/${courseId}`)
    .then(res => res.data);
};

// тренировки курса
export const getCourseWorkouts = (courseId: string) => {
  return axios
    .get(`${BASE_URL}/courses/${courseId}/workouts`)
    .then(res => res.data);
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
  return axios.delete(
    `${BASE_URL}/users/me/courses/${courseId}`,
    { headers: authHeaders() },
  );
};

// сбросить прогресс курса
export const resetCourseProgress = (courseId: string) => {
  return axios.patch(
    `${BASE_URL}/courses/${courseId}/reset`,
    {},
    { headers: authHeaders() },
  );
};
