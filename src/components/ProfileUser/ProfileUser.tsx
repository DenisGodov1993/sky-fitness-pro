'use client';

import styles from './profileUser.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useAppSelector } from '@/store/store';
import { CourseCard } from '../CourseCard/CourseCard';

interface ProfileUserProps {
  username: string;
  userSelectedCourses: string[];
}

export default function ProfileUser({ username }: ProfileUserProps) {
  const router = useRouter();

  // Берем список выбранных курсов из Redux
  const selectedCourses = useAppSelector(
    (state) => state.auth.selectedCourses ?? [],
  );

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

  // Фильтруем курсы для текущего пользователя
  const myCourses = useMemo(() => {
    return allCourses.filter((course) => selectedCourses.includes(course._id));
  }, [allCourses, selectedCourses]);

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/auth/signin');
  };

  return (
    <div className={styles.wrapper}>
      {/* Профиль */}
      <div className={styles.myProfile}>
        <h1 className={styles.title}>Профиль</h1>
        <div className={styles.myProfile__container}>
          <Image
            width={197}
            height={197}
            src="/img/icon/profile.svg"
            alt="Профиль"
            loading="eager"
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
      <div className={styles.myCourses}>
        <h1 className={styles.title}>Мои курсы</h1>
        {fetchIsLoading ? (
          <p>Загрузка курсов...</p>
        ) : fetchError ? (
          <p style={{ color: 'red' }}>{fetchError}</p>
        ) : myCourses.length === 0 ? (
          <p>Вы ещё не добавили курсы</p>
        ) : (
          <div className={styles.myCourses__container}>
            {myCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                isProfile
                progress={progressMap[course._id]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}