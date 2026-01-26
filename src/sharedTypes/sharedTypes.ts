export interface FitCourseType {
  _id: number;
  name: string;
  number_of_days: number; 
  duration_in_minutes: number;
  difficulty: number;
 
  logo: string | null;
 
  stared_user: string[];
}

// export interface ResCategoryApiType {
//   _id: number;
//   name: string;
//   items: TrackType[];
// }
