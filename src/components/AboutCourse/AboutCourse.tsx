'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CourseApiType } from '@/sharedTypes/sharedTypes';
import styles from './aboutCourse.module.css';
import { skillImageMap } from '@/data';

interface AboutCourseProps {
  course: CourseApiType;
  username?: string;
  isLoading: boolean;
  onAddCourse: () => void;
  isAdded: boolean;
}

export default function AboutCourse({
  course,
  username,
  isLoading,
  onAddCourse,
  isAdded,
}: AboutCourseProps) {
  
    const skillImage =
    skillImageMap.find((c) => c.name === course.nameRU)?.image ??
    '/img/skillCard1.png';

  return (
    <>
      {/* Основная карточка курса */}
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

        {/* <div className={styles.skillCard__description}>{course.description}</div> */}

        {/* Подойдет для вас */}
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
                  <Image
                    width={43}
                    height={101}
                    src={`/img/${index + 1}.svg`}
                    alt={`${index + 1}`}
                  />
                  <p className={styles[`card${index + 1}__txt`]}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Направления */}
        <div className={styles.skillCard__directionsCourses}>
          <h2 className={styles.directionsCourses__text}>Направления</h2>

          <div className={styles.directionsCourses__dirCourse}>
            <div className={styles.dirCourse__wrapper}>
              {course.directions.map((name, i) => (
                <div key={i} className={styles.dirCourse__block}>
                  <div className={styles.dirCourse__item}>
                    <Image
                      width={19.5}
                      height={19.5}
                      src="/img/icon/star.svg"
                      alt="звезда"
                    />
                    <p className={styles.dirCourse__txt}>{name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Постер */}
      <div className={styles.skillPoster}>
        <div className={styles.posterContainer}>
          <div className={styles.posterContainer__txtContainer}>
            <h3 className={styles.txtContainer__title}>
              Начните путь к новому телу
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

            {/* {!username && (
              <Link className={styles.txtContainer__btn} href="/auth/signin">
                Войдите, чтобы добавить курс
              </Link>
            )} */}

            {/* Кнопка */}
            {username && !isAdded ? (
              <button
                className={styles.txtContainer__btn}
                disabled={isLoading}
                onClick={onAddCourse}
              >
                {isLoading ? 'Добавление...' : 'Добавить курс'}
              </button>
            ) : !username ? (
              <Link className={styles.txtContainer__btn} href="/auth/signin">
                Войдите, чтобы добавить курс
              </Link>
            ) : null}
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
// // import { useAppSelector } from '@/store/store';
// import { skillImageMap } from '@/data';

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
//       skillImageMap.find((c) => c.name === course.nameRU)?.image;
//   return (
//     <>
//       {/* Основная карточка курса */}
//       <div className={styles.skillCard}>
//         <Image
//           width={1160}
//           height={310}
//           className={styles.skillCard__image}
//           src={skillImage ?? ''}
//           alt={course.nameRU}
//           style={{ width: 'auto', height: 'auto' }}
//         />

//         {/* Блок "Подойдет для вас" */}
//         <div className={styles.skillCard__infoContainer}>
//           <h2 className={styles.skillCard__text}>Подойдет для вас, если:</h2>

//           <div className={styles.infoContainer__infoCard}>
//             <div className={styles.infoContainer__infoCard1}>
//               <div className={styles.infoCard1__card1}>
//                 <Image width={35} height={101} src="/img/1.svg" alt="1" />
//                 <p className={styles.card1__txt}>{course.description}</p>
//               </div>
//             </div>

//             <div className={styles.infoContainer__infoCard2}>
//               <div className={styles.infoCard2__card2}>
//                 <Image width={43} height={101} src="/img/2.svg" alt="2" />
//                 <p className={styles.card2__txt}>
//                   Сложность: {course.difficulty}
//                 </p>
//               </div>
//             </div>

//             <div className={styles.infoContainer__infoCard3}>
//               <div className={styles.infoCard3__card3}>
//                 <Image width={43} height={101} src="/img/3.svg" alt="3" />
//                 <p className={styles.card3__txt}>
//                   Продолжительность: {course.durationInDays} дней
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Направления курса */}
//         {course.directions && (
//           <div className={styles.skillCard__directionsCourses}>
//             <h2 className={styles.directionsCourses__text}>Направления</h2>

//             <div className={styles.directionsCourses__dirCourse}>
//               <div className={styles.dirCourse__wrapper}>
//                 {course.directions.map((name, i) => (
//                   <div key={i} className={styles.dirCourse__block}>
//                     <div className={styles.dirCourse__item}>
//                       <Image
//                         width={19.5}
//                         height={19.5}
//                         src="/img/icon/star.svg"
//                         alt="звезда"
//                       />
//                       <p className={styles.dirCourse__txt}>{name}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Кнопка добавления */}
//         {username && !isAdded ? (
//           <button
//             className={styles.txtContainer__btn}
//             disabled={isLoading}
//             onClick={onAddCourse}
//           >
//             {isLoading ? 'Добавление...' : 'Добавить курс'}
//           </button>
//         ) : !username ? (
//           <Link className={styles.txtContainer__btn} href="/auth/signin">
//             Войдите, чтобы добавить курс
//           </Link>
//         ) : null}
//       </div>

//       {/* Рекламный постер */}
//       <div className={styles.skillPoster}>
//         <div className={styles.posterContainer}>
//           <div className={styles.posterContainer__txtContainer}>
//             <h3 className={styles.txtContainer__title}>
//               Начните путь к новому телу
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

//             {!username && (
//               <Link className={styles.txtContainer__btn} href="/auth/signin">
//                 Войдите, чтобы добавить курс
//               </Link>
//             )}
//           </div>
//         </div>

//         <Image
//           width={604.47}
//           height={604.47}
//           className={styles.skillPoster__posterImg}
//           src="/img/poster.png"
//           alt="постер"
//         />

//         <Image
//           width={670.18}
//           height={390.98}
//           className={styles.skillPoster__posterImgSvg}
//           src="/img/icon/greenLine.svg"
//           alt="линия"
//         />
//       </div>
//     </>
//   );
// }

//     <div className={styles.aboutCourse}>
//       <h1>{course.nameRU}</h1>
//       <p>{course.description}</p>
//       <p>Сложность: {course.difficulty}</p>
//       <p>Продолжительность: {course.durationInDays} дней</p>

//       {username && !isAdded ? (
//         <button disabled={isLoading} onClick={onAddCourse}>
//           {isLoading ? 'Добавление...' : 'Добавить курс'}
//         </button>
//       ) : !username ? (
//         <Link href="/auth/signin">Войдите, чтобы добавить курс</Link>
//       ) : null}

//       {/* Пример блока с направлениями */}
//       <div className={styles.directions}>
//         <h2>Направления</h2>
//         <ul>
//           <li>Йога для новичков</li>
//           <li>Классическая йога</li>
//           <li>Кундалини-йога</li>
//           <li>Йогатерапия</li>
//           <li>Хатха-йога</li>
//           <li>Аштанга-йога</li>
//         </ul>
//       </div>

//       {/* Пример постера */}
//       <div className={styles.poster}>
//         <Image
//           width={604}
//           height={604}
//           src="/img/poster.png"
//           alt="рекламный плакат"
//           style={{ width: 'auto', height: 'auto' }}
//         />
//       </div>
//     </div>
//   );
// }
