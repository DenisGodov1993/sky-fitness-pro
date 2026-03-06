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
    if (allCourses.length) return;

    dispatch(setFetchIsLoading(true));

    getCourses()
      .then((res) => {
        dispatch(setAllCourses(res));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            // dispatch(setFetchError(error.response.data));
            dispatch(setFetchError(error.response.data.message));
          } else if (error.request) {
            dispatch(setFetchError('Произошла ошибка. Попробуйте позже'));
          }
        } else {
          dispatch(setFetchError('Неизвестная ошибка'));
        }
      })
      .finally(() => {
        dispatch(setFetchIsLoading(false));
      });
  }, [allCourses.length, dispatch]);
  return <></>;
}