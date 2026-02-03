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

// import { useEffect, useState } from 'react';
// import FitnessLayout from '@/app/fitness/FitnessLayout';
// import { useAppSelector } from '@/store/store';
// import { CourseApiType } from '@/sharedTypes/sharedTypes';
// import { getCourses, addCourseToUser, getUserCourses } from '@/services/courses/coursesApi';
// import { CourseCard } from '@/components/CourseCard/CourseCard';
// // import styles from './profile.module.css';

// export default function ProfilePage() {
//   const username = useAppSelector((state) => state.auth.username);
//   const token = useAppSelector((state) => state.auth.token);

//   const [userCourses, setUserCourses] = useState<CourseApiType[]>([]);
//   const [allCourses, setAllCourses] = useState<CourseApiType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Загружаем все курсы и курсы пользователя
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true);
//         const courses = await getCourses();
//         setAllCourses(courses);

//         if (token) {
//           const userCoursesData = await getUserCourses();
//           setUserCourses(
//             courses.filter((c) => userCoursesData.selectedCourses.includes(c._id))
//           );
//         }
//       } catch (err) {
//         setError('Ошибка загрузки курсов');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [token]);

//   const handleAddCourse = async (courseId: string) => {
//     if (!token) return setError('Войдите, чтобы добавить курс');

//     try {
//       setLoading(true);
//       await addCourseToUser(courseId);
//       const course = allCourses.find((c) => c._id === courseId);
//       if (course) setUserCourses((prev) => [...prev, course]);
//     } catch {
//       setError('Не удалось добавить курс. Попробуйте позже.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <FitnessLayout>
//       <div className={styles.profile}>
//         <h2>Мой профиль</h2>
//         <p>Email: {username}</p>

//         {error && <p className={styles.error}>{error}</p>}
//         {loading && <p>Загрузка...</p>}

//         <h3>Мои курсы</h3>
//         <div className={styles.courses}>
//           {userCourses.length ? (
//             userCourses.map((course) => (
//               <CourseCard
//                 key={course._id}
//                 course={course}
//                 onAddCourse={() => handleAddCourse(course._id)}
//                 username={username}
//               />
//             ))
//           ) : (
//             <p>Вы ещё не добавили ни одного курса</p>
//           )}
//         </div>

//         <h3>Все доступные курсы</h3>
//         <div className={styles.courses}>
//           {allCourses
//             .filter((c) => !userCourses.some((uc) => uc._id === c._id))
//             .map((course) => (
//               <CourseCard
//                 key={course._id}
//                 course={course}
//                 onAddCourse={() => handleAddCourse(course._id)}
//                 username={username}
//               />
//             ))}
//         </div>
//       </div>
//     </FitnessLayout>
//   );
// }

