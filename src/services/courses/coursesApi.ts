import axios from 'axios';
import { BASE_URL } from '@services/constants';
import { FitCourse } from '@/sharedTypes/sharedTypes';

export const getCourses = (): Promise<FitCourse[]> => {
  return axios(BASE_URL + '/courses').then((res) => {
    // console.log(res)
    return res.data;
  });
};

// import axios from 'axios';
// import { BASE_URL } from '@services/constants';
// import { FitCourse } from '@/sharedTypes/sharedTypes';

// // GET /api/fitness/courses
// export const getCourses = (): Promise<FitCourse[]> => {
//   return axios
//     .get<{ success: boolean; data: FitCourse[] }>(
//         `${BASE_URL}/fitness/courses`,
//     //   `${BASE_URL}/catalog/track/all/`,
//     )
//     .then((res) => res.data.data);
// };

// export const getCategories = (
//   categoryId: string,
// ): Promise<ResfitnessCoursesApiType> => {
//   return axios(BASE_URL + `/catalog/selection/${Number(categoryId) + 1}`).then(
//     (res) => {
//       return res.data;
//     },
//   );
// };

// export const addLike = (access: string, id: number) => {
//   return axios.post(
//     BASE_URL + `/catalog/track/${id}/favorite/`,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${access}`,
//         'Content-Type': 'application/json',
//       },
//     },
//   );
// };

// export const removeLike = (access: string, id: number) => {
//   return axios.delete(BASE_URL + `/catalog/track/${id}/favorite/`, {
//     headers: {
//       Authorization: `Bearer ${access}`,
//       'Content-Type': 'application/json',
//     },
//   });
// };



// // GET /api/fitness/courses
// export const getFavoriteTracks = (access: string) => {
//   return axios
//     .get(BASE_URL + '/catalog/track/favorite/all/', {
//       headers: {
//         Authorization: `Bearer ${access}`,
//       },
//     })
//     .then((res) => res.data.data);
// };
