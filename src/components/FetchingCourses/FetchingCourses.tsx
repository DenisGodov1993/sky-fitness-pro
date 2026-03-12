'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { getCourses } from '@/services/courses/coursesApi';
import {
  setAllCourses,
  setFetchIsLoading,
  setFetchError,
} from '@/store/features/courseSlice';
import { AxiosError } from 'axios';

export default function FetchingCourses() {
  const dispatch = useAppDispatch();
  const { allCourses } = useAppSelector((state) => state.courses);

  useEffect(() => {
    if (allCourses.length > 0) return;

    const fetchCourses = async () => {
      dispatch(setFetchIsLoading(true));

      try {
        const res = await getCourses();
        dispatch(setAllCourses(res));
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            dispatch(setFetchError(error.response.data.message));
          } else {
            dispatch(setFetchError('Произошла ошибка. Попробуйте позже'));
          }
        } else {
          dispatch(setFetchError('Неизвестная ошибка'));
        }
      } finally {
        dispatch(setFetchIsLoading(false));
      }
    };

    fetchCourses();
  }, [allCourses.length, dispatch]);

  return null;
}