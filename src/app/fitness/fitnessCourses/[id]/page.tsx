'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { CourseApiType } from '@/sharedTypes/sharedTypes';
import { getCourseById, addCourseToUser } from '@/services/courses/coursesApi';
import FitnessLayout from '@/app/fitness/FitnessLayout';
import AboutCourse from '@/components/AboutCourse/AboutCourse';

export default function CoursePage() {
  const params = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseApiType | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const username = useAppSelector((state) => state.auth.username);
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (!params.id) return;
    getCourseById(params.id)
      .then(setCourse)
      .catch(() => setError('Ошибка загрузки курса'));
  }, [params.id]);

  const handleAddCourse = async () => {
    if (!token) return alert('Войдите, чтобы добавить курс');
    if (!course?._id) return;

    setIsLoading(true);
    try {
      await addCourseToUser(course._id);
      alert('Курс успешно добавлен!');
    } catch {
      alert('Не удалось добавить курс. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <div>{error}</div>;
  if (!course) return <div>Загрузка...</div>;

  const isAdded = false;
  return (
    <FitnessLayout>
      <AboutCourse
        course={course}
        username={username}
        isLoading={isLoading}
        onAddCourse={handleAddCourse}
        isAdded={isAdded}
      />
    </FitnessLayout>
  );
}
