'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/store';
import {
  getCourses,
  removeCourseFromUser,
  resetCourseProgress,
} from '@/services/courses/coursesApi';
import { CourseApiType } from '@/sharedTypes/sharedTypes';

export default function ProfilePage() {
  const [userCourses, setUserCourses] = useState<CourseApiType[]>([]);
  const username = useAppSelector((state) => state.auth.username);

  useEffect(() => {
    getCourses().then((data) => {
      // TODO: фильтровать по courses пользователя
      setUserCourses(data);
    });
  }, []);

  const handleRemoveCourse = async (id: string) => {
    try {
      await removeCourseFromUser(id);
      setUserCourses((prev) => prev.filter((c) => c._id !== id));
    } catch {
      alert('Ошибка при удалении курса');
    }
  };

  const handleResetProgress = async (id: string) => {
    try {
      await resetCourseProgress(id);
      alert('Прогресс сброшен!');
    } catch {
      alert('Ошибка при сбросе прогресса');
    }
  };

  return (
    <div>
      <h2>Профиль</h2>
      <p>Email: {username}</p>

      <h3>Мои курсы</h3>
      {userCourses.map((course) => (
        <div key={course._id}>
          <h4>{course.nameRU}</h4>
          <button onClick={() => handleRemoveCourse(course._id)}>Удалить курс</button>
          <button onClick={() => handleResetProgress(course._id)}>Сбросить прогресс</button>
        </div>
      ))}
    </div>
  );
}
