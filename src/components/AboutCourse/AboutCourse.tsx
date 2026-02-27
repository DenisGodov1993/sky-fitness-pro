'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CourseApiType } from '@/sharedTypes/sharedTypes';
import styles from './aboutCourse.module.css';
import { skillImageMap } from '@/data';
import { dividingBlocks } from '@/utils/dividingBlocks';

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

  // const imageWidths = [35, 43, 43];

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

        {/* <div className={styles.skillCard__description}>{course.description}</div> */}

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
                  {/* <Image
                    // width={100}
                    width={imageWidths[index]}
                    // width={35}
                    height={101}
                    src={`/img/${index + 1}.svg`}
                    alt={`${index + 1}`}
                  /> */}
                  <p className={styles[`card${index + 1}__txt`]}>{text}</p>
                </div>
              </div>


            //    <div className={styles.suitableFor}>
            //   <h2 className={styles.sectionTitle}>Подойдет для вас, если:</h2>
            //   <div className={styles.suitableForList}>
            //     {course.suitableFor.map((item, index) => (
            //       <div key={index} className={styles.suitableForItem}>
            //         <span className={styles.itemNumber}>{index + 1}</span>
            //         <p className={styles.itemText}>{item}</p>
            //       </div>
            //     ))}
            //   </div>
            // </div>
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
// import { CourseDetail } from '@/sharedTypes/sharedTypes';
// import styles from './aboutCourse.module.css';
// import { skillImageMap } from '@/data';
// import { dividingBlocks } from '@/utils/dividingBlocks';

// interface AboutCourseProps {
//   course: CourseDetail;
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

//   const imageWidths = [35, 43, 43];

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
//             {course.fitting.slice(0, 3).map((text: string, index: number) => (
//               <div
//                 key={index}
//                 className={styles[`infoContainer__infoCard${index + 1}`]}
//               >
//                 <div
//                   className={styles[`infoCard${index + 1}__card${index + 1}`]}
//                 >
//                   <Image
//                     width={imageWidths[index]}
//                     height={101}
//                     src={`/img/${index + 1}.svg`}
//                     alt={`${index + 1}`}
//                   />
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
//               {dividingBlocks(course.directions, 2).map(
//                 (block: string[], i: number) => (
//                   <div key={i} className={styles.dirCourse__block}>
//                     {block.map((name: string, j: number) => (
//                       <div key={j} className={styles.dirCourse__item}>
//                         <Image
//                           width={19.5}
//                           height={19.5}
//                           src="/img/icon/star.svg"
//                           alt="звезда"
//                         />
//                         <p className={styles.dirCourse__txt}>{name}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ),
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

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

//             {/* ===== КНОПКА ДОБАВЛЕНИЯ КУРСА ===== */}
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
//             ) : (
//               <p className={styles.addedText}>Курс уже добавлен</p>
//             )}
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
