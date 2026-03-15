'use client';

import FitnessLayout from '@/app/fitness/FitnessLayout';
import Centerblock from '@/components/Centerblock/Centerblock';
import { getCourses } from '@/services/courses/coursesApi';
import { setAllCourses } from '@/store/features/courseSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCourses().then((data) => {
      dispatch(setAllCourses(data));
    });
  }, [dispatch]);

  return (
    <FitnessLayout>
      <Centerblock />
    </FitnessLayout>
  );
}