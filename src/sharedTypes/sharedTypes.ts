export type Duration = {
  min: number;
  max: number;
};

export interface FitCourse {
  id: number;
  title: string;
  days: number;
  duration: Duration;
  image: string;
  logo?: string | null;
  starredUsers: string[];
}

export interface ResfitnessCoursesApiType {
  _id: number;
  name: string;
  items: FitCourse[];
}