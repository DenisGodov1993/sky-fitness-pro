'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { CourseApiType } from '@/sharedTypes/sharedTypes';
import { getCourseById, addCourseToUser } from '@/services/courses/coursesApi';
import { getMe } from '@/services/user/userApi';
import FitnessLayout from '@/app/fitness/FitnessLayout';
import AboutCourse from '@/components/AboutCourse/AboutCourse';
import { addSelectedCourse } from '@/store/features/authSlice';

export default function CoursePage() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [course, setCourse] = useState<CourseApiType | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const username = useAppSelector((state) => state.auth.username);
  const token = useAppSelector((state) => state.auth.token);
  const selectedCourses = useAppSelector(
    (state) => state.auth.selectedCourses ?? [],
  );

  useEffect(() => {
    if (!params.id) return;

    const loadData = async () => {
      try {
        const courseData = await getCourseById(params.id);
        setCourse(courseData);

        if (token) {
          const user = await getMe();
          // Синхронизируем выбранные курсы пользователя
          user.selectedCourses?.forEach((id: string) => {
            if (!selectedCourses.includes(id)) {
              dispatch(addSelectedCourse(id));
            }
          });
        }
      } catch {
        setError('Ошибка загрузки курса');
      }
    };

    loadData();
  }, [params.id, token, dispatch, selectedCourses]);

  const handleAddCourse = async () => {
    if (!token || !course?._id) return;

    setIsLoading(true);

    try {
      await addCourseToUser(course._id);
      // Добавляем курс в Redux
      dispatch(addSelectedCourse(course._id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <FitnessLayout>
        <div>{error}</div>
      </FitnessLayout>
    );
  }

  if (!course) {
    return (
      <FitnessLayout> 
        <div>Загрузка...</div>
      </FitnessLayout>
    );
  }

  return (
    <FitnessLayout>
      <AboutCourse
        course={course}
        username={username}
        isLoading={isLoading}
        onAddCourse={handleAddCourse}
      />
    </FitnessLayout>
  );
}
