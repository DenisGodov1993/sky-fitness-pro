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

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import FitnessLayout from '@/app/fitness/FitnessLayout';
// import AboutCourse from '@/components/AboutCourse/AboutCourse';
// import { getCourseById, addCourseToUser } from '@/services/courses/coursesApi';
// import { useAppSelector } from '@/store/store';
// import { CourseDetail } from '@/sharedTypes/sharedTypes';
// import { AxiosError } from 'axios';

// export default function CoursePage() {
//   const params = useParams<{ id: string }>();
//   const { username } = useAppSelector((state) => state.auth);

//   const [course, setCourse] = useState< CourseDetail | null>(null);
//   const [isAdded, setIsAdded] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Загрузка курса
//   // useEffect(() => {
//   //   if (!params.id) return;

//   //   getCourseById(params.id)
//   //     .then(setCourse)
//   //     .catch((error) => {
//   //       console.error('Ошибка загрузки курса:', error);
//   //       setCourse(null);
//   //     });
//   // }, [params.id]);

//   useEffect(() => {
//     // if (!params.id) return;
//      if (!params.id || Array.isArray(params.id)) return;

//     getCourseById(params.id)
//       .then((data) => {
//         setCourse(data);
//         // После загрузки курса — проверим, добавлен ли он
//         const savedCourses = localStorage.getItem('selectedCourses');
//         const courses: string[] = savedCourses ? JSON.parse(savedCourses) : [];
//         setIsAdded(courses.includes(data._id));
//       })
//       .catch((error) => {
//         console.error('Ошибка загрузки курса:', error);
//         setCourse(null);
//       });
//   }, [params.id]);

//   // Добавление курса
//   const handleAddCourse = async () => {
//     if (!course || isAdded) return;

//     try {
//       setIsLoading(true);
//       // Вызываем API
//       await addCourseToUser(course._id);

//       // Обновляем localStorage
//       const savedCourses = localStorage.getItem('selectedCourses');
//       const courses: string[] = savedCourses ? JSON.parse(savedCourses) : [];
//       if (!courses.includes(course._id)) {
//         courses.push(course._id);
//         localStorage.setItem('selectedCourses', JSON.stringify(courses));
//       }

//       // Обновляем UI
//       setIsAdded(true);
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         const message =
//           error.response?.data?.message || error.request
//             ? 'Нет соединения с сервером'
//             : error.message;

//         // Если сервер говорит, что курс уже есть — всё равно считаем, что добавлен
//         if (
//           message.toLowerCase().includes('существует') ||
//           error.response?.status === 400
//         ) {
//           setIsAdded(true);
//           return;
//         }

//         // Показываем ошибку (можно заменить на тултип позже)
//         alert(`Не удалось добавить курс: ${message}`);
//       } else {
//         alert('Произошла ошибка при добавлении курса.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // UI: загрузка или ошибка
//   if (!course) {
//     return <FitnessLayout>Курс не найден или загружается...</FitnessLayout>;
//   }

//   return (
//     <FitnessLayout>
//       <AboutCourse
//         course={course}
//         username={username ?? undefined}
//         isLoading={isLoading}
//         onAddCourse={handleAddCourse}
//         isAdded={isAdded}
//       />
//     </FitnessLayout>
//   );
// }
