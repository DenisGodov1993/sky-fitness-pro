import { BASE_URL } from '@/services/constants';
import axios, { AxiosError } from 'axios';

export type AuthData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterResponse = {
  message: string;
};

// Регистрация
export const registerUser = async (
  data: AuthData,
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${BASE_URL}/auth/register`,
      {
        email: data.email.trim(),
        password: data.password.trim(),
      },
      {
        headers: {
          'Content-Type': '',
        },
      },
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<RegisterResponse>;
    throw err;
  }
};

// Логин
export const loginUser = async (data: AuthData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/auth/login`,
      {
        email: data.email.trim(),
        password: data.password.trim(),
      },
      {
        headers: {
          'Content-Type': '',
        },
      },
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<LoginResponse>;
    throw err;
  }
};

// Регистрация + авто-логин
// export const registerAndLogin = async (data: AuthData): Promise<LoginResponse> => {
//   const registerResult = await registerUser(data);
//   const loginResult = await loginUser(data);
//   return loginResult;
// };
