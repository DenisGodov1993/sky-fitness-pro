'use client';

import styles from './profileUser.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { CourseCard } from '../CourseCard/CourseCard';
import { clearUser } from '@/store/features/authSlice';

interface ProfileUserProps {
  username: string;
  selectedCourses?: string[];
}

export default function ProfileUser({
  username,
  selectedCourses,
}: ProfileUserProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    allCourses = [],
    fetchIsLoading,
    fetchError,
  } = useAppSelector((state) => state.courses);

  const progressMap = useAppSelector((state) => state.progress.progressMap);

  const displayName = useMemo(() => {
    if (!username) return 'Пользователь';

    const name = username.split('@')[0];

    return name[0].toUpperCase() + name.slice(1);
  }, [username]);

  const selectedSet = useMemo(
    () => new Set(selectedCourses),
    [selectedCourses],
  );

  const myCourses = useMemo(() => {
    return allCourses.filter((course) => selectedSet.has(course._id));
  }, [allCourses, selectedSet]);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
    router.push('/auth/signin');
  };

  return (
    <div className={styles.wrapper}>
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