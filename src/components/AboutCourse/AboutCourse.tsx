'use client';

import styles from './aboutCourse.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { CourseApiType } from '@/sharedTypes/sharedTypes';
import { dividingBlocks } from '@/utils/dividingBlocks';
import { skillImageMap } from '@/data';
import { useState } from 'react';
import { addCourseToUser } from '@/services/courses/coursesApi';
// import axios from 'node_modules/axios/index.cjs';
import axios from 'axios';

interface AboutCourseProps {
  course: CourseApiType;
  username?: string;
}

export default function AboutCourse({ course, username }: AboutCourseProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const skillImage =
    skillImageMap.find((c) => c.name === course.nameRU)?.image ??
    '/img/skillCard1.png';

  const onAddCourse = async () => {
    if (!username) return;

    setIsLoading(true);
    try {
      await addCourseToUser(course._id);
      setIsAdded(true);
      alert('Курс добавлен!');
    } catch (err) {
      alert('Ошибка добавления курса');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.skillCard}>
        {skillImage && (
          <Image
            width={1160}
            height={310}
            className={styles.skillCard__image}
            src={skillImage}
            alt={course.nameRU}
            priority
          />
        )}

        <div className={styles.skillCard__infoContainer}>
          <h2 className={styles.skillCard__text}>Подойдет для вас, если:</h2>

          <div className={styles.infoContainer__infoCard}>
            {course.fitting.slice(0, 3).map((text, index) => (
              <div
                key={index}
                className={styles[`infoContainer__infoCard${index + 1}`]}
              >
                <div
                  className={styles[`infoCard${index + 1}__card${index + 1}`]}
                >
                  <p className={styles[`card${index + 1}__txt`]}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.skillCard__directionsCourses}>
          <h2 className={styles.directionsCourses__text}>Направления</h2>

          <div className={styles.directionsCourses__dirCourse}>
            <div className={styles.dirCourse__wrapper}>
              {dividingBlocks(course.directions, 2).map((block, i) => (
                <div key={i} className={styles.dirCourse__block}>
                  {block.map((name, j) => (
                    <div key={j} className={styles.dirCourse__item}>
                      <Image
                        width={19.5}
                        height={19.5}
                        src="/img/icon/star.svg"
                        alt="звезда"
                      />
                      <p className={styles.dirCourse__txt}>{name}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.skillPoster}>
        <div className={styles.posterContainer}>
          <div className={styles.posterContainer__txtContainer}>
            <h3 className={styles.txtContainer__title}>
              Начните путь <br />к новому телу
            </h3>

            <div className={styles.txtContainer__list}>
              <ul>
                <li>проработка всех групп мышц</li>
                <li>тренировка суставов</li>
                <li>улучшение циркуляции крови</li>
                <li>упражнения заряжают бодростью</li>
                <li>помогают противостоять стрессам</li>
              </ul>
            </div>

            {username && !isAdded ? (
              <button
                className={styles.txtContainer__btn}
                disabled={isLoading}
                // onClick={onAddCourse}
                 onClick={async () => {
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
    }}
              >
                {isLoading ? 'Добавление...' : 'Добавить курс'}
              </button>
            ) : !username ? (
              <Link className={styles.txtContainer__btn} href="/auth/signin">
                Войдите, чтобы добавить курс
              </Link>
            ) : (<p>Курс добавлен!</p>)}
          </div>
        </div>

        <Image
          width={604}
          height={604}
          className={styles.skillPoster__posterImg}
          src="/img/poster.png"
          alt="постер"
          style={{ width: 'auto', height: 'auto' }}
        />

        <Image
          width={670}
          height={391}
          className={styles.skillPoster__posterImgSvg}
          src="/img/icon/greenLine.svg"
          alt="линия"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    </>
  );
}

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { CourseApiType } from '@/sharedTypes/sharedTypes';
// import styles from './aboutCourse.module.css';
// import { skillImageMap } from '@/data';
// import { dividingBlocks } from '@/utils/dividingBlocks';

// interface AboutCourseProps {
//   course: CourseApiType;
//   username?: string;
//   isLoading: boolean;
//   onAddCourse: () => void;
//   isAdded: boolean;
// }

// export default function AboutCourse({
//   course,
//   username,
//   isLoading,
//   onAddCourse,
//   isAdded,
// }: AboutCourseProps) {
//   const skillImage =
//     skillImageMap.find((c) => c.name === course.nameRU)?.image ??
//     '/img/skillCard1.png';

//   // const imageWidths = [35, 43, 43];

//   return (
//     <>
//       <div className={styles.skillCard}>
//         {skillImage && (
//           <Image
//             width={1160}
//             height={310}
//             className={styles.skillCard__image}
//             src={skillImage}
//             alt={course.nameRU}
//             priority
//           />
//         )}

//         <div className={styles.skillCard__infoContainer}>
//           <h2 className={styles.skillCard__text}>Подойдет для вас, если:</h2>

//           <div className={styles.infoContainer__infoCard}>
//             {course.fitting.slice(0, 3).map((text, index) => (
//               <div
//                 key={index}
//                 className={styles[`infoContainer__infoCard${index + 1}`]}
//               >
//                 <div
//                   className={styles[`infoCard${index + 1}__card${index + 1}`]}
//                 >
//                   <p className={styles[`card${index + 1}__txt`]}>{text}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={styles.skillCard__directionsCourses}>
//           <h2 className={styles.directionsCourses__text}>Направления</h2>

//           <div className={styles.directionsCourses__dirCourse}>
//             <div className={styles.dirCourse__wrapper}>
//               {dividingBlocks(course.directions, 2).map((block, i) => (
//                 <div key={i} className={styles.dirCourse__block}>
//                   {block.map((name, j) => (
//                     <div key={j} className={styles.dirCourse__item}>
//                       <Image
//                         width={19.5}
//                         height={19.5}
//                         src="/img/icon/star.svg"
//                         alt="звезда"
//                       />
//                       <p className={styles.dirCourse__txt}>{name}</p>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={styles.skillPoster}>
//         <div className={styles.posterContainer}>
//           <div className={styles.posterContainer__txtContainer}>
//             <h3 className={styles.txtContainer__title}>
//               Начните путь <br />к новому телу
//             </h3>

//             <div className={styles.txtContainer__list}>
//               <ul>
//                 <li>проработка всех групп мышц</li>
//                 <li>тренировка суставов</li>
//                 <li>улучшение циркуляции крови</li>
//                 <li>упражнения заряжают бодростью</li>
//                 <li>помогают противостоять стрессам</li>
//               </ul>
//             </div>

//             {username && !isAdded ? (
//               <button
//                 className={styles.txtContainer__btn}
//                 disabled={isLoading}
//                 onClick={onAddCourse}
//               >
//                 {isLoading ? 'Добавление...' : 'Добавить курс'}
//               </button>
//             ) : !username ? (
//               <Link className={styles.txtContainer__btn} href="/auth/signin">
//                 Войдите, чтобы добавить курс
//               </Link>
//             ) : null}
//           </div>
//         </div>

//         <Image
//           width={604}
//           height={604}
//           className={styles.skillPoster__posterImg}
//           src="/img/poster.png"
//           alt="постер"
//           style={{ width: 'auto', height: 'auto' }}
//         />

//         <Image
//           width={670}
//           height={391}
//           className={styles.skillPoster__posterImgSvg}
//           src="/img/icon/greenLine.svg"
//           alt="линия"
//           style={{ width: 'auto', height: 'auto' }}
//         />
//       </div>
//     </>
//   );
// }
