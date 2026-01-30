'use client';

import styles from './courseCard.module.css';
import Image from 'next/image';
import { FitCourse } from '@/sharedTypes/sharedTypes';
import { useAppDispatch } from '@/store/store';
import { setCurrentCourse } from '@/store/features/courseSlice';
import Link from 'next/link';

interface CourseCardProps {
  course: FitCourse;
}

export function CourseCard({ course }: CourseCardProps) {
  const dispatch = useAppDispatch();

  const onClickCourse = () => {
    dispatch(setCurrentCourse(course));
  };

  return (
    <div className={styles.content__card} onClick={onClickCourse}>
      <Link className={styles.card__imageContainer} href= "/fitness/fitnessCourses/1">
        <Image
          width={360}
          height={325}
          className={styles.card__img}
          src={course.image}
          alt={course.title}
        />
        <button className={styles.card__imgPlusSvg} aria-label="Добавить">
          <Image
            width={32}
            height={32}
            src="/img/icon/plus.svg"
            alt="Добавить"
          />
        </button>
      </Link>

      <div className={styles.card__textContainer}>
        <h3 className={styles.textContainer__title}>{course.title}</h3>

        <div className={styles.textContainer__info}>
          <div className={styles.info__txt}>
            <div className={styles.txt__1}>
              <svg className={styles.txt__1Svg}>
                <use xlinkHref="/img/icon/calendar.svg"></use>
              </svg>
              <p>{course.days} дней</p>
            </div>

            <div className={styles.txt__2}>
              <svg className={styles.txt__2Svg}>
                <use xlinkHref="/img/icon/watch.svg"></use>
              </svg>
              <p>
                {course.duration.min}-{course.duration.max} мин/день
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
