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