'use client';

import styles from './courseCard.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { CourseApiType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch } from '@/store/store';
import { setCurrentCourse } from '@/store/features/courseSlice';
import { courseImageMap } from '@/data';
import { addCourseToUser } from '@/services/courses/coursesApi';
// import axios from 'node_modules/axios/index.cjs';
import axios from 'axios';

interface CourseCardProps {
  course: CourseApiType;
}

export function CourseCard({ course }: CourseCardProps) {
  const dispatch = useAppDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickCourse = () => {
    dispatch(setCurrentCourse(course));
  };

  const onAddCourse = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      const res = await addCourseToUser(course._id);
      setIsAdded(true);
      alert(res.data.message);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert('Ошибка добавления курса');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const courseImage = courseImageMap.find((c) => c.name === course.nameRU)?.image;

  return (
    <div
      className={styles.content__card}
      onClick={onClickCourse}
    >
      <Link
        className={styles.card__imageContainer}
        href={`/fitness/fitnessCourses/${course._id}`}
      >
        <Image
          width={360}
          height={325}
          className={styles.card__img}
          src={courseImage ?? ''}
          alt={course.nameRU}
        />
        {!isAdded && (
        <button
          className={styles.card__imgPlusSvg}
          aria-label="Добавить"
          onClick={onAddCourse}
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

// 'use client';

// import styles from './courseCard.module.css';
// import Image from 'next/image';
// import { CourseApiType } from '@/sharedTypes/sharedTypes';
// import { useAppDispatch } from '@/store/store';
// // import { setCurrentCourse, setAddCourse } from '@/store/features/courseSlice';
// import { setCurrentCourse } from '@/store/features/courseSlice';
// import Link from 'next/link';
// import { courseImageMap } from '@/data';

// interface CourseCardProps {
//   course: CourseApiType;
// }

// export function CourseCard({ course }: CourseCardProps) {
//   const dispatch = useAppDispatch();

//   const onClickCourse = () => {
//     dispatch(setCurrentCourse(course));
//   };

//   // const setAddCourse = (e: React.MouseEvent<HTMLButtonElement>) => {
//   //   // Останавливаем распространение события — предотвращаем переход по ссылке
//   //   e.stopPropagation();

//   //   // Логика добавления курса
//   //   dispatch(setAddCourse(course));

//   //   // необязательная визуальная обратная связь
//   //   e.currentTarget.style.transform = 'scale(0.9)';
//   //   setTimeout(() => {
//   //     e.currentTarget.style.transform = '';
//   //   }, 200);
//   // };

//   const courseImage =
//     courseImageMap.find((c) => c.name === course.nameRU)?.image;

//   return (
//     <div className={styles.content__card} onClick={onClickCourse}>
//       <Link
//         className={styles.card__imageContainer}
//         href={`/fitness/fitnessCourses/${course._id}`}
//       >
//         <Image
//           width={360}
//           height={325}
//           className={styles.card__img}
//           src={courseImage ?? ''}
//           alt={course.nameRU}
//         />
//         <button className={styles.card__imgPlusSvg}
//         aria-label="Добавить"
//         // onClick={setAddCourse}
//         >
//           <Image
//             width={32}
//             height={32}
//             src="/img/icon/plus.svg"
//             alt="Добавить"
//           />
//         </button>
//       </Link>

//       <div className={styles.card__textContainer}>
//         <h3 className={styles.textContainer__title}>{course.nameRU}</h3>

//         <div className={styles.textContainer__info}>
//           <div className={styles.info__txt}>
//             <div className={styles.txt__1}>
//               <svg className={styles.txt__1Svg}>
//                 <use xlinkHref="/img/icon/calendar.svg"></use>
//               </svg>
//               <p>{course.durationInDays} дней</p>
//             </div>

//             <div className={styles.txt__2}>
//               <svg className={styles.txt__2Svg}>
//                 <use xlinkHref="/img/icon/watch.svg"></use>
//               </svg>
//               <p>
//                 {course.dailyDurationInMinutes?.from ?? '—'}-
//                 {course.dailyDurationInMinutes?.to ?? '—'} мин/день
//               </p>
//             </div>
//           </div>

//           <div className={styles.txt__3}>
//             <svg className={styles.txt__3Svg}>
//               <use xlinkHref="/img/icon/complexity.svg"></use>
//             </svg>
//             <p>Сложность</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
