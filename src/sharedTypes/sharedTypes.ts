export interface FitCourseType {
  _id: number;
  name: string;
  number_of_days: number;
  duration: {
    from: number;
    to: number;
  };
  difficulty: number;
  image: string;
  logo: string | null;
  stared_user: string[];
}

// export interface ResCategoryApiType {
//   _id: number;
//   name: string;
//   items: TrackType[];
// }
