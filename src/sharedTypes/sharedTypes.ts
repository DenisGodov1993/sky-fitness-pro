// курс из API
export interface CourseApi {
  _id: string;
  nameRU: string;
  nameEN: string;
  description: string;
  directions: string[];
  fitting: string[];
  difficulty?: string;
  durationInDays?: number;
  dailyDurationInMinutes?: {
    from: number;
    to: number;
  };
  workouts: string[];
}

// тренировка из API
export interface WorkoutApi {
  _id: string;
  name: string;
  video: string;
  exercises: ExerciseApi[];
}

export interface ExerciseApi {
  _id: string;
  name: string;
  quantity: number;
}

// прогресс
export interface CourseProgressApi {
  courseId: string;
  courseCompleted: boolean;
  workoutsProgress: WorkoutProgressApi[];
}

export interface WorkoutProgressApi {
  workoutId: string;
  workoutCompleted: boolean;
  progressData: number[];
}


// export type Duration = {
//   min: number;
//   max: number;
// };

// export interface FitCourse {
//   id: number;
//   title: string;
//   days: number;
//   duration: Duration;
//   image: string;
//   logo?: string | null;
//   starredUsers: string[];
// }

// export interface ResfitnessCoursesApiType {
//   _id: number;
//   name: string;
//   items: FitCourse[];
// }