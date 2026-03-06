'use client';

import styles from './courseCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CourseApiType } from '@/sharedTypes/sharedTypes';
import { CourseProgress } from '@/store/features/progressSlice';
// import { useAppDispatch } from '@/store/store';
// import { setCurrentCourse } from '@/store/features/courseSlice';
import { courseImageMap } from '@/data';
import {
  addCourseToUser,
  removeCourseFromUser,
} from '@/services/courses/coursesApi';

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

  // const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // const onClickCourse = () => {
  //   dispatch(setCurrentCourse(course));
  // };

  const courseImage = courseImageMap.find(
    (c) => c.name === course.nameRU,
  )?.image;

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await addCourseToUser(course._id);
      alert('Курс добавлен!');
    } catch {
      alert('Ошибка добавления');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await removeCourseFromUser(course._id);
      alert('Курс удалён!');
      window.location.reload(); // можно заменить на обновление state
    } catch {
      alert('Ошибка удаления');
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
    //     <div className={styles.content__card} onClick={onClickCourse}>
    <div className={styles.content__card}>
      <Link
        className={styles.card__imageContainer}
        href={`/fitness/fitnessCourses/${course._id}`}
      >
        <Image
          width={360}
          height={325}
          className={styles.card__img}
          // src="/img/test.jpg"
          src={courseImage ?? ''}
          alt={course.nameRU}
          loading="eager"
        />
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
          {isProfile && (
            <>
              <div className={styles.progressWrapper}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className={styles.progressText}>{percentage}%</div>

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

// 'use client';

// import styles from './courseCard.module.css';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { CourseApiType } from '@/sharedTypes/sharedTypes';
// import { CourseProgress } from '@/store/features/progressSlice';

// interface CourseCardProps {
//   course: CourseApiType;
//   isProfile?: boolean;
//   progress?: CourseProgress;
// }

// export function CourseCard({
//   course,
//   isProfile = false,
//   progress,
// }: CourseCardProps) {
//   const router = useRouter();

//   const percentage =
//     progress && progress.totalWorkouts > 0
//       ? Math.round(
//           (progress.completedWorkouts /
//             progress.totalWorkouts) *
//             100
//         )
//       : 0;

//   let buttonText = 'Начать тренировки';

//   if (percentage > 0 && percentage < 100)
//     buttonText = 'Продолжить';

//   if (percentage === 100)
//     buttonText = 'Начать заново';

//   return (
//     <div className={styles.content__card}>
//       <Link
//         href={`/fitness/fitnessCourses/${course._id}`}
//       >
//         <Image
//           width={360}
//           height={325}
//           src="/img/test.jpg"
//           alt={course.nameRU}
//         />
//       </Link>

//       <h3>{course.nameRU}</h3>

//       {isProfile && (
//         <>
//           <div className={styles.progressWrapper}>
//             <div
//               className={styles.progressBar}
//               style={{ width: `${percentage}%` }}
//             />
//           </div>

//           <div>{percentage}%</div>

//           <button
//             onClick={() =>
//               router.push(
//                 `/fitness/course/${course._id}`
//               )
//             }
//           >
//             {buttonText}
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// 'use client';

// import styles from './courseCard.module.css';
// import Image from 'next/image';
// import { useState } from 'react';
// import Link from 'next/link';
// import { CourseApiType } from '@/sharedTypes/sharedTypes';
// import { useAppDispatch } from '@/store/store';
// import { setCurrentCourse } from '@/store/features/courseSlice';
// import { courseImageMap } from '@/data';
// import {
//   addCourseToUser,
//   removeCourseFromUser,
// } from '@/services/courses/coursesApi';
// // import axios from 'axios';
// import { useRouter } from 'next/navigation';

// interface CourseProgress {
//   completedWorkouts: number;
//   totalWorkouts: number;
// }

// interface CourseCardProps {
//   course: CourseApiType;
//   isProfile?: boolean;
//   progress?: CourseProgress;
// }

// export function CourseCard({ course, isProfile = false, progress }: CourseCardProps) {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   // const [isAdded, setIsAdded] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const onClickCourse = () => {
//     dispatch(setCurrentCourse(course));
//   };

//   const courseImage = courseImageMap.find(
//     (c) => c.name === course.nameRU,
//   )?.image;

//   const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();
//     setIsLoading(true);
//     try {
//       await addCourseToUser(course._id);
//       alert('Курс добавлен!');
//     } catch {
//       alert('Ошибка добавления');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();
//     setIsLoading(true);
//     try {
//       await removeCourseFromUser(course._id);
//       alert('Курс удалён!');
//       window.location.reload(); // можно заменить на обновление state
//     } catch {
//       alert('Ошибка удаления');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//    // вычисляем процент
//   const percentage =
//     progress && progress.totalWorkouts > 0
//       ? Math.round(
//           (progress.completedWorkouts / progress.totalWorkouts) * 100,
//         )
//       : 0;

//   // логика кнопки
//   let buttonText = 'Начать тренировки';

//   if (percentage > 0 && percentage < 100) {
//     buttonText = 'Продолжить';
//   }

//   if (percentage === 100) {
//     buttonText = 'Начать заново';
//   }

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

//         {isProfile ? (
//           <button
//             className={styles.card__imgPlusSvg}
//             onClick={handleRemove}
//             disabled={isLoading}
//           >
//             <Image
//               width={32}
//               height={32}
//               src="/img/icon/minus.svg"
//               alt="Удалить"
//             />
//           </button>
//         ) : (
//           <button
//             className={styles.card__imgPlusSvg}
//             onClick={handleAdd}
//             disabled={isLoading}
//           >
//             <Image
//               width={32}
//               height={32}
//               src="/img/icon/plus.svg"
//               alt="Добавить"
//             />
//           </button>
//         )}
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

//           {isProfile && (

//             <>

//             <div className={styles.progressWrapper}>
//               <div
//                 className={styles.progressBar}
//                 style={{ width: `${percentage}%` }}
//               />
//             </div>
//             <div className={styles.progressText}>
//               {percentage}%
//             </div>

//             <button
//               className={styles.startBtn}
//               onClick={() =>
//                 router.push(`/fitness/course/${course._id}`)
//               }
//             >
//               {buttonText}
//             </button>
//           </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
