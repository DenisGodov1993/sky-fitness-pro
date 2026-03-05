'use client';

import styles from './profileUser.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { useMemo } from 'react';
import { CourseCard } from '../CourseCard/CourseCard';
// import { CourseProgressApi } from '@/sharedTypes/sharedTypes';

interface ProfileUserProps {
  username: string;
  userSelectedCourses: string[];
}

export default function ProfileUser({
  username,
  userSelectedCourses,
}: ProfileUserProps) {
  const router = useRouter();

  // const { allCourses } = useAppSelector((state) => state.courses);
  const {
    allCourses = [],
    fetchIsLoading,
    fetchError,
  } = useAppSelector((state) => state.courses);

  const progressMap = useAppSelector((state) => state.progress.progressMap);

  const displayName = useMemo(() => {
    if (!username) return 'Пользователь';
    const namePart = username.split('@')[0];
    return namePart[0].toUpperCase() + namePart.slice(1);
  }, [username]);

  const myCourses = useMemo(() => {
    return allCourses.filter((course) =>
      userSelectedCourses.includes(course._id),
    );
  }, [allCourses, userSelectedCourses]);

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/auth/signin');
  };

  return (
    <div className={styles.profilePage__wrapper}>
      {/* Профиль */}
      <div className={styles.profilePage__myProfile}>
        <h1 className={styles.profilePage__title}>Профиль</h1>
        <div className={styles.myProfile__container}>
          <Image
            src="/img/icon/profile.svg"
            alt="Профиль"
            width={197}
            height={197}
          />

          <div className={styles.container__info}>
            <h2 className={styles.container__name}>{displayName}</h2>
            <p className={styles.container__email}>Логин: {username}</p>
            <button className={styles.container__button} onClick={logout}>
              Выйти
            </button>
          </div>
        </div>
      </div>
      {/* Курсы */}
      <div className={styles.profilePage__myCourses}>
        <h1 className={styles.profilePage__title}>Мои курсы</h1>
        {fetchIsLoading ? (
          <p>Загрузка курсов...</p>
        ) : fetchError ? (
          <p style={{ color: 'red' }}>{fetchError}</p>
        ) : myCourses.length === 0 ? (
          <p>Вы ещё не добавили курсы</p>
        ) : (
          <div className={styles.myCourses__container}>
            {myCourses.map((course) => {
              return (
                <CourseCard
                  key={course._id}
                  course={course}
                  isProfile
                  progress={progressMap[course._id]}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// 'use client';

// import styles from './profileUser.module.css';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { useAppSelector } from '@/store/store';
// import { useMemo } from 'react';
// import { CourseCard } from '../CourseCard/CourseCard';

// interface ProfileUserProps {
//   username: string;
//   userSelectedCourses: string[];
// }

// export default function ProfileUser({
//   username,
//   userSelectedCourses,
// }: ProfileUserProps) {
//   const router = useRouter();

//   const { allCourses } = useAppSelector(
//     (state) => state.courses
//   );

//   const progressMap = useAppSelector(
//     (state) => state.progress.progressMap
//   );

//   const displayName = useMemo(() => {
//     if (!username) return 'Пользователь';
//     const namePart = username.split('@')[0];
//     return namePart[0].toUpperCase() + namePart.slice(1);
//   }, [username]);

//   const myCourses = useMemo(() => {
//     return allCourses.filter((course) =>
//       userSelectedCourses.includes(course._id)
//     );
//   }, [allCourses, userSelectedCourses]);

//   const logout = () => {
//     localStorage.removeItem('token');
//     router.push('/auth/signin');
//   };

//   return (
//     <div className={styles.profilePage__wrapper}>
//       <div className={styles.profilePage__myProfile}>
//         <h1 className={styles.profilePage__title}>
//           Профиль
//         </h1>

//         <div className={styles.myProfile__container}>
//           <Image
//             src="/img/icon/profile.svg"
//             alt="Профиль"
//             width={197}
//             height={197}
//           />

//           <div>
//             <h2>{displayName}</h2>
//             <p>Логин: {username}</p>
//             <button onClick={logout}>Выйти</button>
//           </div>
//         </div>
//       </div>

//       <div className={styles.profilePage__myCourses}>
//         <h1 className={styles.profilePage__title}>
//           Мои курсы
//         </h1>

//         <div className={styles.myCourses__container}>
//           {myCourses.map((course) => (
//             <CourseCard
//               key={course._id}
//               course={course}
//               isProfile
//               progress={progressMap[course._id]}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import styles from './profileUser.module.css';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// // import Link from 'next/link';
// import { useAppSelector } from '@/store/store';
// import { useMemo } from 'react';
// import { CourseCard } from '../CourseCard/CourseCard';
// import { CourseProgressApi } from '@/sharedTypes/sharedTypes';

// interface ProfileUserProps {
//   username: string;
//   userSelectedCourses: string[];
//   userProgress: CourseProgressApi[];
// }

// export default function ProfileUser({
//   username = '',
//   userSelectedCourses = [],
//   userProgress = [],
// }: ProfileUserProps) {
//   const {
//     allCourses = [],
//     fetchIsLoading,
//     fetchError,
//   } = useAppSelector((state) => state.courses);

//   const displayName = useMemo(() => {
//     if (!username) return 'Пользователь';

//     const namePart = username.split('@')[0];
//     if (!namePart) return 'Пользователь';

//     return namePart[0].toUpperCase() + namePart.slice(1);
//   }, [username]);

//   const myCourses = useMemo(() => {
//     if (!Array.isArray(userSelectedCourses)) return [];

//     return allCourses.filter((course) =>
//       userSelectedCourses.includes(course._id),
//     );
//   }, [allCourses, userSelectedCourses]);

//   const router = useRouter();

//   const getCourseProgressData = (courseId: string) => {
//     const progressItem = userProgress.find((p) => p.courseId === courseId);

//     if (!progressItem) {
//       return {
//         completedWorkouts: 0,
//         totalWorkouts: 0,
//       };
//     }

//     const totalWorkouts = progressItem.workoutsProgress.length;

//     const completedWorkouts = progressItem.workoutsProgress.filter(
//       (w) => w.workoutCompleted,
//     ).length;

//     return {
//       completedWorkouts,
//       totalWorkouts,
//     };
//   };

//   const logout = () => {
//     //   dispatch(clearUser());
//     //   localStorage.removeItem('username');
//     //   localStorage.removeItem('token');
//     router.push('/auth/signin');
//     //   closeMenu();
//   };

//   return (
//     <div className={styles.profilePage__wrapper}>
//       {/* Профиль */}
//       <div className={styles.profilePage__myProfile}>
//         <h1 className={styles.profilePage__title}>Профиль</h1>
//         <div className={styles.myProfile__container}>
//           <Image
//             className={styles.container__image}
//             src="/img/icon/profile.svg"
//             alt="иконка пользователя"
//             width={197}
//             height={197}
//           />

//           <div className={styles.container__info}>
//             <h2 className={styles.container__name}>
//               {displayName ?? 'Пользователь'}
//             </h2>
//             <p className={styles.container__email}>Логин: {username}</p>
//             <button className={styles.container__button} onClick={logout}>
//               Выйти
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Курсы */}
//       <div className={styles.profilePage__myCourses}>
//         <h1 className={styles.profilePage__title}>Мои курсы</h1>

//         {fetchIsLoading ? (
//           <p>Загрузка курсов...</p>
//         ) : fetchError ? (
//           <p style={{ color: 'red' }}>{fetchError}</p>
//         ) : myCourses.length === 0 ? (
//           <p>Вы ещё не добавили курсы</p>
//         ) : (
//           <div className={styles.myCourses__container}>
//             {/* {myCourses.map((course) => (
//               <CourseCard key={course._id} course={course} isProfile />
//             ))} */}
//             {myCourses.map((course) => {
//               const progressData = getCourseProgressData(course._id);

//               return (
//                 <CourseCard
//                   key={course._id}
//                   course={course}
//                   isProfile
//                   progress={progressData}
//                 />
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
