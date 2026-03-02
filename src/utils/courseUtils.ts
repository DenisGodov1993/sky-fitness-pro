// import {
//   CourseDetail,
// //   CourseListItem,
//   CourseProgressResponse,
// } from '@/sharedTypes/sharedTypes';

// /**
//  * Вычисляет прогресс курса в процентах.
//  * @param progress Объект прогресса курса из API
//  * @param totalWorkouts Общее количество тренировок в курсе
//  * @returns число от 0 до 100
//  */
// // export const calculateCourseProgress = (
// //   progress: CourseProgressResponse,
// //   totalWorkouts: number,
// // ): number => {
// //   if (!progress || totalWorkouts === 0) return 0;

// //   const completedWorkouts = progress.workoutsProgress.filter(
// //     (w) => w.workoutCompleted,
// //   ).length;
// //   const percent = Math.round((completedWorkouts / totalWorkouts) * 100);

// //   return percent > 100 ? 100 : percent;
// // };
// export const calculateCourseProgress = (
//   progressData: CourseProgressResponse,
//   totalWorkouts: number
// ): number => {
//   if (totalWorkouts === 0) return 0;
//   const completedWorkouts = progressData.workoutsProgress.filter(
//     (wp) => wp.workoutCompleted
//   ).length;
//   return Math.round((completedWorkouts / totalWorkouts) * 100);
// };

// // Тип данных API перед преобразованием
// interface RawCourseApi {
//   _id: string;
//   name?: string;
//   nameRU?: string;
//   nameEN?: string;
//   description?: string;
//   directions?: string[];
//   fitting?: string[];
//   workouts?: string[];
//   order?: number;
//   difficulty?: string;
//   durationInDays?: number;
//   dailyDurationInMinutes?: {
//     from?: number;
//     to?: number;
//   };
// }

// /**
//  * Преобразует объект курса с API в CourseDetail
//  * @param course Курс с API
//  * @returns CourseDetail
//  */
// export const transformCourse = (course: RawCourseApi): CourseDetail => {
//   return {
//     _id: course._id,
//     nameRU: course.nameRU ?? course.name ?? 'Без названия',
//     nameEN: course.nameEN ?? course.name ?? 'Unnamed',
//     description: course.description ?? '',
//     directions: course.directions ?? [],
//     fitting: course.fitting ?? [],
//     workouts: course.workouts ?? [],
//     order: course.order ?? 0,
//     difficulty: course.difficulty ?? 'unknown',
//     durationInDays: course.durationInDays ?? 0,
//     dailyDurationInMinutes: {
//       from: course.dailyDurationInMinutes?.from ?? 0,
//       to: course.dailyDurationInMinutes?.to ?? 0,
//     },
//   };
// };
