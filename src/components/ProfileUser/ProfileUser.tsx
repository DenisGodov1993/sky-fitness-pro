// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { CourseDetail } from '@/sharedTypes/sharedTypes';
// import styles from './profileUser.module.css';
// import {
//   addCourseToUser,
//   getCourseProgress,
// } from '@/services/courses/coursesApi';
// import { calculateCourseProgress } from '@/utils/courseUtils';

// interface ProfileUserProps {
//   course: CourseDetail | null;
//   username?: string;
//   userSelectedCourses: string[];
//   onCourseAdded?: (courseId: string) => void;
// }

// export default function ProfileUser({
//   course,
//   username,
//   userSelectedCourses,
//   onCourseAdded,
// }: ProfileUserProps) {
//   const [isAdded, setIsAdded] = useState(false);
//   const [addingCourse, setAddingCourse] = useState(false);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     if (!course) return;
//     setIsAdded(userSelectedCourses.includes(course._id));
//   }, [course, userSelectedCourses]);

//   useEffect(() => {
//     if (!course) return;
//     const loadProgress = async () => {
//       try {
//         const progressData = await getCourseProgress(course._id);
//         setProgress(
//           calculateCourseProgress(progressData, course.workouts?.length ?? 0)
//         );
//       } catch {
//         setProgress(0);
//       }
//     };
//     loadProgress();
//   }, [course]);

//   const handleAddCourse = async () => {
//     if (!course || isAdded || addingCourse) return;

//     setAddingCourse(true);
//     try {
//       await addCourseToUser(course._id);
//       setIsAdded(true);
//       onCourseAdded?.(course._id);
//     } catch {
//       alert('Не удалось добавить курс. Попробуйте снова.');
//     } finally {
//       setAddingCourse(false);
//     }
//   };

//   if (!course) {
//     return <div>Курс не найден</div>;
//   }

//   return (
//     <div className={styles.profilePage__wrapper}>
//       {/* Профиль */}
//       <div className={styles.profilePage__myProfile}>
//         <h1>{username ?? 'Пользователь'}</h1>
//         <p>Почта скрыта</p>
//       </div>

//       {/* Курс */}
//       <div className={styles.profilePage__myCourses}>
//         <h2 className={styles.myCourses__title}>{course.nameRU}</h2>
//         <div className={styles.myCourses__container}>
//           <div className={styles.myCourses__course}>
//             <div className={styles.content__card}>
//               <Link href={`/fitness/fitnessCourses/${course._id}`}>
//                 <Image
//                   src="/img/default-course.png"
//                   alt={course.nameRU}
//                   width={360}
//                   height={325}
//                 />
//               </Link>
//               <p>{course.durationInDays} дней</p>
//               <p>
//                 {course.dailyDurationInMinutes.from}–
//                 {course.dailyDurationInMinutes.to} мин/день
//               </p>
//               <p>Прогресс: {progress}%</p>

//               {username ? (
//                 <button
//                   className={styles.contentProfile__button}
//                   disabled={isAdded || addingCourse}
//                   onClick={handleAddCourse}
//                 >
//                   {isAdded
//                     ? 'Добавлено'
//                     : addingCourse
//                       ? 'Загрузка...'
//                       : 'Добавить курс'}
//                 </button>
//               ) : (
//                 <Link
//                   className={styles.contentProfile__button}
//                   href="/auth/signin"
//                 >
//                   Войдите, чтобы добавить курс
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';
// import { CourseDetail } from '@/sharedTypes/sharedTypes';
// import styles from './profileUser.module.css';
// import {
//   addCourseToUser,
//   getCourseProgress,
// } from '@/services/courses/coursesApi';
// import { calculateCourseProgress } from '@/utils/courseUtils';

// interface ProfileUserProps {
//   course: CourseDetail;
//   username?: string;
//   userSelectedCourses: string[]; // список ID выбранных курсов
// }

// export default function ProfileUser({
//   course,
//   username,
//   userSelectedCourses,
// }: ProfileUserProps) {
//   const [isAdded, setIsAdded] = useState(
//     userSelectedCourses.includes(course._id),
//   );
//   const [addingCourse, setAddingCourse] = useState(false);
//   const [progress, setProgress] = useState(0);

//   // Загрузка прогресса курса
//   const loadProgress = async () => {
//     try {
//       const progressData = await getCourseProgress(course._id);
//       setProgress(
//         calculateCourseProgress(progressData, course.workouts?.length ?? 0),
//       );
//     } catch {
//       setProgress(0);
//     }
//   };

//   // При монтировании загружаем прогресс
//   useState(() => {
//     loadProgress();
//   });

//   const handleAddCourse = async () => {
//     if (isAdded) return;

//     setAddingCourse(true);
//     try {
//       await addCourseToUser(course._id);

//       // Локально обновляем состояние
//       setIsAdded(true);
//       loadProgress();

//       // Можно хранить выбранные курсы в localStorage
//       const savedCourses = localStorage.getItem('selectedCourses');
//       const courses: string[] = savedCourses ? JSON.parse(savedCourses) : [];
//       if (!courses.includes(course._id)) {
//         courses.push(course._id);
//         localStorage.setItem('selectedCourses', JSON.stringify(courses));
//       }
//     } catch {
//       alert('Не удалось добавить курс. Попробуйте снова.');
//     } finally {
//       setAddingCourse(false);
//     }
//   };

//   return (
//     <div className={styles.profilePage__wrapper}>
//       {/* Профиль */}
//       <div className={styles.profilePage__myProfile}>
//         <h1>{username ?? 'Пользователь'}</h1>
//         <p>Почта скрыта</p>
//       </div>

//       {/* Курс */}
//       <div className={styles.profilePage__myCourses}>
//         <h2 className={styles.myCourses__title}>{course.nameRU}</h2>
//         <div className={styles.myCourses__container}>
//           <div className={styles.myCourses__course}>
//             <div className={styles.content__card}>
//               <Link href={`/fitness/fitnessCourses/${course._id}`}>
//                 <Image
//                   src="/img/default-course.png"
//                   alt={course.nameRU}
//                   width={360}
//                   height={325}
//                 />
//               </Link>
//               <p>{course.durationInDays} дней</p>
//               <p>
//                 {course.dailyDurationInMinutes.from}–
//                 {course.dailyDurationInMinutes.to} мин/день
//               </p>
//               <p>Прогресс: {progress}%</p>

//               {username ? (
//                 <button
//                   className={styles.contentProfile__button}
//                   disabled={isAdded || addingCourse}
//                   onClick={handleAddCourse}
//                 >
//                   {isAdded
//                     ? 'Добавлено'
//                     : addingCourse
//                       ? 'Загрузка...'
//                       : 'Добавить курс'}
//                 </button>
//               ) : (
//                 <Link
//                   className={styles.contentProfile__button}
//                   href="/auth/signin"
//                 >
//                   Войдите, чтобы добавить курс
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { CourseDetail } from '@/sharedTypes/sharedTypes';
// import styles from './profileUser.module.css';
// import { skillImageMap } from '@/data';
// import {
//   selectAllCourses,
//   selectCoursesProgress,
//   selectFetchIsLoading,
//   selectFetchError,
//   setAllCourses,
//   setCoursesProgress,
//   setFetchIsLoading,
//   setFetchError,
// } from '@/store/features/courseSlice';
// import {
//   getAllCourses,
//   getCourseProgress,
//   addCourseToUser,
// } from '@/services/courses/coursesApi';
// import { calculateCourseProgress, transformCourse } from '@/utils/courseUtils';

// interface ProfileUserProps {
//   username?: string;
//   userSelectedCourses: string[]; // Список ID курсов пользователя
// }

// export default function ProfileUser({
//   username,
//   userSelectedCourses,
// }: ProfileUserProps) {
//   const dispatch = useAppDispatch();
//   const allCourses = useAppSelector(selectAllCourses);
//   const coursesProgress = useAppSelector(selectCoursesProgress);
//   const isLoading = useAppSelector(selectFetchIsLoading);
//   const error = useAppSelector(selectFetchError);

//   const [addingCourseId, setAddingCourseId] = useState<string | null>(null);

//   // Загрузка курсов пользователя и прогресса
//   useEffect(() => {
//     const loadUserCourses = async () => {
//       dispatch(setFetchIsLoading(true));
//       dispatch(setFetchError(null));
//       try {
//         const coursesFromApi = await getAllCourses();
//         // Преобразуем курсы в CourseDetail
//         const allCoursesTransformed: CourseDetail[] = coursesFromApi.map(transformCourse);

//         // Фильтруем только выбранные курсы пользователя
//         const userCourses = allCoursesTransformed.filter((course) =>
//           userSelectedCourses.includes(course._id),
//         );

//         dispatch(setAllCourses(userCourses));

//         // Получаем прогресс
//         const progressMap: Record<string, number> = {};
//         for (const course of userCourses) {
//           try {
//             const progress = await getCourseProgress(course._id);
//             progressMap[course._id] = calculateCourseProgress(
//               progress,
//               course.workouts?.length ?? 0,
//             );
//           } catch {
//             progressMap[course._id] = 0;
//           }
//         }
//         dispatch(setCoursesProgress(progressMap));
//       } catch (err) {
//         dispatch(setFetchError('Не удалось загрузить курсы'));
//       } finally {
//         dispatch(setFetchIsLoading(false));
//       }
//     };

//     loadUserCourses();
//   }, [dispatch, userSelectedCourses]);

//   // Добавление курса
//   const handleAddCourse = async (course: CourseDetail) => {
//     setAddingCourseId(course._id);
//     try {
//       await addCourseToUser(course._id);

//       // Обновляем локально список курсов
//       const updatedCourses = [...allCourses, course];
//       dispatch(setAllCourses(updatedCourses));

//       const progress = await getCourseProgress(course._id);
//       dispatch(
//         setCoursesProgress({
//           ...coursesProgress,
//           [course._id]: calculateCourseProgress(
//             progress,
//             course.workouts?.length ?? 0,
//           ),
//         }),
//       );
//     } catch {
//       alert('Не удалось добавить курс');
//     } finally {
//       setAddingCourseId(null);
//     }
//   };

//   return (
//     <div className={styles.profilePage__wrapper}>
//       {/* Профиль */}
//       <div className={styles.profilePage__myProfile}>
//         <div className={styles.myProfile__container}>
//           <div className={styles.myProfile__contentProfile}>
//             <div className={styles.contentProfile__image} />
//             <div className={styles.contentProfile__info}>
//               <h1>{username ?? 'Пользователь'}</h1>
//               <p>Почта скрыта</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Курсы */}
//       <div className={styles.profilePage__myCourses}>
//         <h2 className={styles.myCourses__title}>Мои курсы</h2>
//         {isLoading ? (
//           <p>Загрузка курсов...</p>
//         ) : error ? (
//           <p style={{ color: 'red' }}>{error}</p>
//         ) : (
//           <div className={styles.myCourses__container}>
//             {allCourses.map((course) => {
//               const skillImage =
//                 skillImageMap.find((c) => c.name === course.nameRU)?.image ??
//                 '/img/default-course.png';
//               const isAdded = userSelectedCourses.includes(course._id);

//               return (
//                 <div key={course._id} className={styles.myCourses__course}>
//                   <div className={styles.content__card}>
//                     <Link
//                       href={`/fitness/fitnessCourses/${course._id}`}
//                       className={styles.card__imageContainer}
//                     >
//                       <Image
//                         src={skillImage}
//                         alt={course.nameRU}
//                         width={360}
//                         height={325}
//                       />
//                     </Link>
//                     <h3>{course.nameRU}</h3>
//                     <p>{course.durationInDays} дней</p>
//                     <p>
//                       {course.dailyDurationInMinutes.from}–
//                       {course.dailyDurationInMinutes.to} мин/день
//                     </p>
//                     <p>Прогресс: {coursesProgress[course._id] ?? 0}%</p>

//                     {username ? (
//                       <button
//                         className={styles.contentProfile__button}
//                         disabled={isAdded || addingCourseId === course._id}
//                         onClick={() => handleAddCourse(course)}
//                       >
//                         {isAdded
//                           ? 'Добавлено'
//                           : addingCourseId === course._id
//                             ? 'Загрузка...'
//                             : 'Добавить курс'}
//                       </button>
//                     ) : (
//                       <Link
//                         className={styles.contentProfile__button}
//                         href="/auth/signin"
//                       >
//                         Войдите, чтобы добавить курс
//                       </Link>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
