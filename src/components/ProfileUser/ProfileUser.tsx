'use client';

import styles from './profileUser.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';
import { useAppSelector } from '@/store/store';
import { useMemo } from 'react';
import { CourseCard } from '../CourseCard/CourseCard';

interface ProfileUserProps {
  username: string;
  userSelectedCourses: string[];
}

export default function ProfileUser({
  username = '',
  userSelectedCourses = [],
}: ProfileUserProps) {
  const {
    allCourses = [],
    fetchIsLoading,
    fetchError,
  } = useAppSelector((state) => state.courses);

  const displayName = useMemo(() => {
    if (!username) return 'Пользователь';

    const namePart = username.split('@')[0];
    if (!namePart) return 'Пользователь';

    return namePart[0].toUpperCase() + namePart.slice(1);
  }, [username]);

  const myCourses = useMemo(() => {
    if (!Array.isArray(userSelectedCourses)) return [];

    return allCourses.filter((course) =>
      userSelectedCourses.includes(course._id),
    );
  }, [allCourses, userSelectedCourses]);

  const router = useRouter();

  const logout = () => {
    //   dispatch(clearUser());
    //   localStorage.removeItem('username');
    //   localStorage.removeItem('token');
    router.push('/auth/signin');
    //   closeMenu();
  };

  return (
    <div className={styles.profilePage__wrapper}>
      {/* Профиль */}
      <div className={styles.profilePage__myProfile}>
        <h1 className={styles.profilePage__title}>Профиль</h1>
        <div className={styles.myProfile__container}>
          <Image
            className={styles.container__image}
            src="/img/icon/profile.svg"
            alt="иконка пользователя"
            width={197}
            height={197}
          />

          <div className={styles.container__info}>
            <h2 className={styles.container__name}>
              {displayName ?? 'Пользователь'}
            </h2>
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
            {myCourses.map((course) => (
              <CourseCard key={course._id} course={course} isProfile />
            ))}
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
// // import Link from 'next/link';
// import { useAppSelector } from '@/store/store';
// import { useMemo } from 'react';
// import { CourseCard } from '../CourseCard/CourseCard';

// interface ProfileUserProps {
//   username: string;
//   userSelectedCourses: string[];
// }

// export default function ProfileUser({
//   username = '',
//   userSelectedCourses = [],
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
//             {myCourses.map((course) => (
//               <CourseCard key={course._id} course={course} isProfile />
//             ))}
//           </div>
//         )}
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

// interface ProfileUserProps {
//   username: string;
//   userSelectedCourses: string[];
// }

// export default function ProfileUser({
//   username = '',
//   userSelectedCourses = [],
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
//             {myCourses.map((course) => (
//               <CourseCard key={course._id} course={course} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
