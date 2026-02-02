'use client';

import styles from './courseCard.module.css';
import Image from 'next/image';
import { CourseApiType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch } from '@/store/store';
import { setCurrentCourse } from '@/store/features/courseSlice';
import Link from 'next/link';
import { courseImageMap } from '@/data';

interface CourseCardProps {
  course: CourseApiType;
}

export function CourseCard({ course }: CourseCardProps) {
  const dispatch = useAppDispatch();

  const onClickCourse = () => {
    dispatch(setCurrentCourse(course));
  };

  const courseImage =
    courseImageMap.find((c) => c.name === course.nameRU)?.image;

  return (
    <div className={styles.content__card} onClick={onClickCourse}>
      <Link
        className={styles.card__imageContainer}
        // href="/fitness/fitnessCourses/1"
        href={`/fitness/fitnessCourses/${course._id}`}
      >
        <Image
          width={360}
          height={325}
          className={styles.card__img}
          src={courseImage ?? ''}
          alt={course.nameRU}
        />
        <button className={styles.card__imgPlusSvg} aria-label="Добавить">
          <Image
            width={32}
            height={32}
            src="/img/icon/plus.svg"
            alt="Добавить"
            // onClick={addCourse}
          />
        </button>
      </Link>

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
        </div>
      </div>
    </div>
  );
}
