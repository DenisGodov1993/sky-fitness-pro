'use client';

import styles from './profileUser.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { useMemo } from 'react';
import { CourseCard } from '../CourseCard/CourseCard';

interface ProfileUserProps {
  username: string;
  userSelectedCourses: string[];
}

export default function ProfileUser({
  username,
  userSelectedCourses,
}: ProfileUserProps) {
  const router = useRouter();

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