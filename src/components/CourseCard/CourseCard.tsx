'use client';

import styles from './courseCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { CourseApiType } from '@/sharedTypes/sharedTypes';
import { CourseProgress } from '@/store/features/progressSlice';
import { courseImageMap } from '@/data';
import {
  addCourseToUser,
  removeCourseFromUser,
} from '@/services/courses/coursesApi';
import {
  addSelectedCourse,
  removeSelectedCourse,
} from '@/store/features/authSlice';

interface CourseCardProps {
  course: CourseApiType;
  isProfile?: boolean;
  progress?: CourseProgress;
}

export function CourseCard({
  course,
  isProfile = false,
  progress,
}: CourseCardProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const selectedCourses = useAppSelector(
    (state) => state.auth.selectedCourses ?? [],
  );
  const isCourseAdded = selectedCourses.includes(course._id);

  const courseImage = courseImageMap.find(
    (c) => c.name === course.nameRU,
  )?.image;

  const handleAdd = async () => {
    if (isLoading || isCourseAdded) return;

    setIsLoading(true);
    setStatus('');

    try {
      await addCourseToUser(course._id);
      dispatch(addSelectedCourse(course._id));
    } catch (error: unknown) {
      if (error instanceof Error) setStatus(error.message);
      else setStatus('Ошибка добавления курса');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await removeCourseFromUser(course._id);
      dispatch(removeSelectedCourse(course._id));
    } catch (error: unknown) {
      if (error instanceof Error) setStatus(error.message);
      else setStatus('Ошибка удаления курса');
    } finally {
      setIsLoading(false);
    }
  };

  const percentage =
    progress && progress.totalWorkouts > 0
      ? Math.round((progress.completedWorkouts / progress.totalWorkouts) * 100)
      : 0;

  let buttonText = 'Начать тренировки';
  if (percentage > 0 && percentage < 100) buttonText = 'Продолжить';
  if (percentage === 100) buttonText = 'Начать заново';

  return (
    <div className={styles.content__card}>
      <div className={styles.card__imageContainer}>
        <Link href={`/fitness/fitnessCourses/${course._id}`}>
          <Image
            width={360}
            height={325}
            className={styles.card__img}
            src={courseImage ?? ''}
            alt={course.nameRU}
            loading="eager"
          />
        </Link>

        {isProfile ? (
          <button
            className={styles.card__imgPlusSvg}
            onClick={handleRemove}
            disabled={isLoading}
          >
            <Image
              width={32}
              height={32}
              src="/img/icon/minus.svg"
              alt="Удалить"
            />
          </button>
        ) : isCourseAdded ? (
          <div className={styles.card__imgPlusSvg}>
            <span>Курс добавлен</span>
          </div>
        ) : (
          <button
            className={styles.card__imgPlusSvg}
            onClick={handleAdd}
            disabled={isLoading}
          >
            <Image
              width={32}
              height={32}
              src="/img/icon/plus.svg"
              alt="Добавить"
            />
          </button>
        )}
      </div>

      <div className={styles.card__textContainer}>
        <h3 className={styles.textContainer__title}>{course.nameRU}</h3>

        <div className={styles.textContainer__info}>
          <div className={styles.info__txt}>
            <div className={styles.txt__1}>
              <svg className={styles.txt__1Svg}>
                <use xlinkHref="/img/icon/calendar.svg"></use>
              </svg>
              <p>{course.durationInDays} дней</p>
            </div>

            <div className={styles.txt__2}>
              <svg className={styles.txt__2Svg}>
                <use xlinkHref="/img/icon/watch.svg"></use>
              </svg>
              <p>
                {course.dailyDurationInMinutes?.from ?? '—'}-
                {course.dailyDurationInMinutes?.to ?? '—'} мин/день
              </p>
            </div>
          </div>

          <div className={styles.txt__3}>
            <svg className={styles.txt__3Svg}>
              <use xlinkHref="/img/icon/complexity.svg"></use>
            </svg>
            <p>Сложность</p>
          </div>

          {status && <p>{status}</p>}

          {isProfile && (
            <>
              <div className={styles.exerciseCard}>
                <div className={styles.exerciseHeader}>
                  <span>Прогресс </span>
                  <span>{percentage}%</span>
                </div>

                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <button
                className={styles.startBtn}
                onClick={() => router.push(`/fitness/course/${course._id}`)}
              >
                {buttonText}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}