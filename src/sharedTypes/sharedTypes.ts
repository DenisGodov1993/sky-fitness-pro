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
