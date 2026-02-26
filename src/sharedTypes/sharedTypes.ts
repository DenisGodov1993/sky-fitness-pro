// курс из API
export interface CourseApiType {
  _id: string;
  nameRU: string;
  nameEN: string;
  description: string; // описание
  difficulty: string; // трудность (сложность)
  directions: string[]; // направления
  fitting: string[]; // подходящий курс (текст)
  durationInDays: number; // длительность в днях
  dailyDurationInMinutes: {
    // ежедневная продолжительность в минутах
    from: number;
    to: number;
  };
  workouts: string[]; // тренировки
  order: number; // порядок
}

export type Course = {
  id: string;
  nameRU: string;
  durationInDays: number;
  dailyDurationInMinutes: {
    from: number;
    to: number;
  };
  difficulty: number;
  image: string;
};

// тренировка из API
export interface WorkoutApi {
  _id: string;
  name: string;
  video: string;
  exercises: ExerciseApi[]; // упражнения
}

export interface ExerciseApi {
  _id: string;
  name: string;
  quantity: number; // количество
}

// прогресс
export interface CourseProgressApi {
  courseId: string;
  courseCompleted: boolean; // курс завершен
  workoutsProgress: WorkoutProgressApi[]; // прогресс тренировок
}

export interface WorkoutProgressApi {
  workoutId: string;
  workoutCompleted: boolean; // тренировка завершена
  progressData: number[];
}

// // Упражнение
// export interface ExerciseApi {
//   _id: string;
//   name: string;
//   quantity: number; // целевое количество повторений
// }

// // Тренировка
// export interface WorkoutApi {
//   _id: string;
//   name: string;
//   video: string;
//   exercises: ExerciseApi[];
// }

// // Краткая версия курса (для списка)
// export interface CourseListItem {
//   _id: string;
//   nameRU: string;
//   nameEN: string;
//   description: string;
//   directions: string[];
//   fitting: string[];
//   workouts: string[]; 
//   order: number;
// }

// // Полная версия курса (с деталями)
// export interface CourseDetail extends CourseListItem {
//   difficulty: string;
//   durationInDays: number;
//   dailyDurationInMinutes: {
//     from: number;
//     to: number;
//   };
//   order: number;
// }

// // API: Запросы и ответы

// // 1. Добавить курс пользователю
// export interface AddCourseRequest {
//   courseId: string;
// }

// export interface AddCourseResponse { 
//   message: string;
// }

// // 2. Удалить курс у пользователя
// export interface DeleteCourseResponse {
//   message: string;
// }

// // 3. Сбросить прогресс по курсу
// export interface ResetCourseProgressResponse {
//   message: string;
// }

// // 4. Получить список тренировок курса
// export type GetCourseWorkoutsResponse = WorkoutApi[];

// // 5. Получить тренировку по ID
// // export interface GetWorkoutResponse extends WorkoutApi {}

// // 6. Прогресс по всему курсу
// export interface WorkoutProgress {
//   workoutId: string;
//   workoutCompleted: boolean;
//   progressData: number[]; // выполненные повторения
// }

// export interface CourseProgressResponse {
//   courseId: string;
//   courseCompleted: boolean;
//   workoutsProgress: WorkoutProgress[];
// }

// // 7. Прогресс по одной тренировке
// export interface WorkoutProgressResponse {
//   workoutId: string;
//   workoutCompleted: boolean;
//   progressData: number[];
// }

// // 8. Сохранить прогресс тренировки
// export interface SaveWorkoutProgressRequest {
//   progressData: number[];
// }

// export interface SaveWorkoutProgressResponse {
//   message: string;
// }

// // 9. Сбросить прогресс тренировки
// export interface ResetWorkoutProgressResponse {
//   message: string;
// }

// // всё что приходит с бекэнда
// export interface CourseApiType {
//   _id: string;
//   nameRU: string;
//   nameEN: string;
//   description: string; // описание
//   difficulty: string; // трудность (сложность)
//   directions: string[]; // направления
//   fitting: string[]; // подходящий курс (текст)
//   durationInDays: number; // длительность в днях
//   dailyDurationInMinutes: {
//     // ежедневная продолжительность в минутах
//     from: number;
//     to: number;
//   };
//   workouts: string[]; // тренировки
//   order: number; // порядок
// }

// // 1 Получить все курсы
// export interface AllCourseType {
//   _id: string;
//   nameRU: string;
//   nameEN: string;
//   description: string;
//   directions: string[];
//   fitting: string[];
//   workouts: string[];
// }

// // 2 Получить один курс по ID
// export interface CourseByIdType {
//   _id: string;
//   nameRU: string;
//   nameEN: string;
//   description: string;
//   directions: string[];
//   fitting: string[];
//   difficulty: string;
//   durationInDays: number;
//   dailyDurationInMinutes: {
//     from: number;
//     to: number;
//   };
//   workouts: string[];
// }

// // 3 получить список тренировок курса
// export interface CourseWorkoutsType {
//   _id: string;
//   name: string;
//   video: string;
//   exercises: ExerciseApi[];
// }

// export interface ExerciseApi {
//   // массив упражнений
//   _id: string;
//   name: string;
//   quantity: number;
// }

// // 4 Добавить курс для пользователя
// export interface AddCourseRequestBodyType {
//   courseId: string;
// }
// export interface AddCourseResponseType {
//   message: string;
// }

// // 5 Удалить курс у пользователя
// export interface DeleteCourseResponseType {
//   message: string;
// }

// // 6 Удалить весь прогресс по курсу
// export interface DeleteAllProgressType {
//   message: string;
// }

// // 7 Получить данные по тренировке
// export interface GetWorkoutDataType {
//   _id: string;
//   name: string;
//   video: string;
//   exercises: ExerciseApi[];
// }

// export interface ExerciseApi {
//   _id: string;
//   name: string;
//   quantity: number; // целевое количество повторений
// }

// // 8 Получить прогресс пользователя по всему курсу
// export interface CourseProgressResponse {
//   courseId: string;
//   courseCompleted: boolean;
//   workoutsProgress: WorkoutProgress[];
// }

// export interface WorkoutProgress {
//   workoutId: string;
//   workoutCompleted: boolean;
//   progressData: number[]; // количество выполненных повторений для каждого упражнения
// }

// // 9 Получить прогресс пользователя по тренировке
// export interface WorkoutProgressResponse {
//   workoutId: string;
//   workoutCompleted: boolean;
//   progressData: number[];
// }

// // 10 Сохранить прогресс тренировки
// export interface SaveWorkoutProgressRequest {
//   progressData: number[];
// }

// export interface SaveWorkoutProgressResponse {
//   message: string;
//   // например: "Прогресс сохранён"
// }

// // 11 Удалить весь прогресс по тренировке
// export interface ResetWorkoutProgressResponse {
//   message: string;
// }
