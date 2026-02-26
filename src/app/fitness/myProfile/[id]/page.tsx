'use client';

import FitnessLayout from '@/app/fitness/FitnessLayout';
import { useParams } from 'next/navigation';

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  
  return (
    <FitnessLayout>
      <ProfilePage />
    </FitnessLayout>
  );
}

// 'use client';

// import FitnessLayout from '@/app/fitness/FitnessLayout';
// import { useAppSelector } from '@/store/store';
// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import ProfileUser from '@/components/ProfileUser/ProfileUser';
// import { CourseDetail } from '@/sharedTypes/sharedTypes';
// import { getCourseById } from '@/services/courses/coursesApi';
// import { useRouter } from 'next/router';

// export default function ProfilePage() {
//   const { id } = useParams<{ id: string }>();
//   const { id: authId, username } = useAppSelector((state) => state.auth);
//   const [course, setCourse] = useState<CourseDetail | null>(null);
//   const [userSelectedCourses, setUserSelectedCourses] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const router = useRouter();

//   // Проверка: пользователь смотрит свой профиль?
//   useEffect(() => {
//     if (!authId) {
//       router.push('/auth/signin');
//       return;
//     }

//     if (id !== authId) {
//       // Можно показать ошибку или редирект
//       setError('Доступ запрещён. Вы можете просматривать только свой профиль.');
//       setLoading(false);
//       return;
//     }

//     // Загружаем выбранные курсы (если есть)
//     const saved = localStorage.getItem('selectedCourses');
//     if (saved) {
//       try {
//         setUserSelectedCourses(JSON.parse(saved));
//       } catch {
//         setUserSelectedCourses([]);
//       }
//     }

//     // Загружаем курс (например, первый из списка или фиксированный)
//     // Здесь можно загрузить курс по ID из URL, например /myProfile/123?course=courseId
//     // Пока загружаем первый курс как пример
//     getCourseById('665a1b3d7b2f3c001a8b4567') // замените на нужный ID или передавайте через query
//       .then((data) => setCourse(data))
//       .catch(() => setError('Не удалось загрузить курс'))
//       .finally(() => setLoading(false));
//   }, [id, authId, router]);

//   if (loading) {
//     return (
//       <FitnessLayout>
//         <div>Загрузка профиля...</div>
//       </FitnessLayout>
//     );
//   }

//   if (error) {
//     return (
//       <FitnessLayout>
//         <div className="error">{error}</div>
//       </FitnessLayout>
//     );
//   }

//   return (
//     <FitnessLayout>
//       <ProfileUser
//         course={course}
//         username={username ?? undefined}
//         userSelectedCourses={userSelectedCourses}
//         onCourseAdded={(courseId) => {
//           setUserSelectedCourses((prev) => [...prev, courseId]);
//           localStorage.setItem(
//             'selectedCourses',
//             JSON.stringify([...userSelectedCourses, courseId])
//           );
//         }}
//       />
//     </FitnessLayout>
//   );
// }
