export type Duration = {
  min: number;
  max: number;
};

// export enum DifficultyLevel {
//   Easy = 1,
//   Medium = 2,
//   Hard = 3,
// }

export interface FitCourse {
  id: number;
  title: string;
  days: number;
  duration: Duration;
  // difficulty: DifficultyLevel;
  image: string;
  logo?: string | null;
  starredUsers: string[];
}



// export interface FitCourseType {
//   _id: number;
//   name: string;
//   number_of_days: number;
//   duration: {
//     from: number;
//     to: number;
//   };
//   difficulty: number;
//   image: string;
//   logo: string | null;
//   stared_user: string[];
// }

// export interface ResCategoryApiType {
//   _id: number;
//   name: string;
//   items: TrackType[];
// }
