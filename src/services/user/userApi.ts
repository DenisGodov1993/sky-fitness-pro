import axios from 'axios';
import { BASE_URL } from '@/services/constants';

const authHeaders = () => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');

  return token ? { Authorization: `Bearer ${token}` } : {};
};

// получить данные текущего пользователя
export const getMe = () => {
  return axios
    .get(`${BASE_URL}/users/me`, {
      headers: authHeaders(),
    })
    .then((res) => res.data);
};

// export const getMe = () => {
//   const token = localStorage.getItem('token');
//   console.log('TOKEN:', token);

//   return axios
//     .get(`${BASE_URL}/users/me`, {
//       headers: authHeaders(),
//     })
//     .then((res) => {
//       console.log('RESPONSE:', res.data);
//       return res.data;
//     })
//     .catch((err) => {
//       console.log('ERROR:', err.response?.status, err.response?.data);
//       throw err;
//     });
// };

// export const getMe = async () => {
//   const token = localStorage.getItem('token');

//   const response = await axios.get(`${BASE_URL}/users/me`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.data || !response.data.email) {
//     throw new Error('Пользователь не найден');
//   }

//   return response.data;
// };
