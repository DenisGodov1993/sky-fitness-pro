'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { CourseApiType } from '@/sharedTypes/sharedTypes';
import { getCourseById, addCourseToUser } from '@/services/courses/coursesApi';
import FitnessLayout from '@/app/fitness/FitnessLayout';
import AboutCourse from '@/components/AboutCourse/AboutCourse';


export default function CoursePage() {
  const params = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseApiType | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const username = useAppSelector((state) => state.auth.username);
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (!params.id) return;
    getCourseById(params.id)
      .then(setCourse)
      .catch(() => setError('Ошибка загрузки курса'));
  }, [params.id]);

  const handleAddCourse = async () => {
    if (!token) return alert('Войдите, чтобы добавить курс');
    if (!course?._id) return;

    setIsLoading(true);
    try {
      await addCourseToUser(course._id);
      alert('Курс успешно добавлен!');
    } catch {
      alert('Не удалось добавить курс. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <div>{error}</div>;
  if (!course) return <div>Загрузка...</div>;

  const isAdded = false; // TODO: проверить через API, есть ли курс у пользователя

  return (
    <FitnessLayout>
        <AboutCourse
          course={course}
          username={username}
          isLoading={isLoading}
          onAddCourse={handleAddCourse}
          isAdded={isAdded}
        />
    </FitnessLayout>
  );
}

// 'use client';

// import FitnessLayout from '@/app/fitness/FitnessLayout';
// import styles from './page.module.css';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter, useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { CourseApiType } from '@/sharedTypes/sharedTypes';
// import { useAppSelector } from '@/store/store';
// import { addCourseToUser, getCourseById } from '@/services/courses/coursesApi';

// export default function FitnessCoursesPage() {
//   const params = useParams<{ id: string }>();
//   const router = useRouter();

//   const [course, setCourse] = useState<CourseApiType | null>(null);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const username = useAppSelector((state) => state.auth.username);
//   const token = useAppSelector((state) => state.auth.token);

//     useEffect(() => {
//     getCourseById(params.id)
//       .then((data) => setCourse(data))
//       .catch(() => setError('Ошибка загрузки курса'));
//   }, [params.id]);

//   const handleAddCourse = async () => {
//     if (!token) return router.push('/auth/signin');
//     if (!course?._id) return alert('Неверные данные курса');

//     setIsLoading(true);
//     try {
//       await addCourseToUser(course._id);
//       alert('Курс успешно добавлен!');
//     } catch {
//       alert('Не удалось добавить курс. Попробуйте позже.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (error) return <div>{error}</div>;
//   if (!course) return <div>Загрузка...</div>;

//   const isAdded = false; // TODO: проверять через API, добавлен ли курс

//   return (
//     <FitnessLayout>
//       <div className={styles.skillContainer}>
//         {/* Карточка курса */}
//         <div className={styles.skillCard}>
//           <Image
//             width={1160}
//             height={310}
//             className={styles.skillCard__image}
//             src="/img/skillCard1.png"
//             alt="Карточка навыка"
//             style={{ width: 'auto', height: 'auto' }}
//           />

//           <div className={styles.skillCard__infoContainer}>
//             <h2 className={styles.skillCard__text}>Подойдет для вас, если:</h2>
//             <div className={styles.infoContainer__infoCard}>
//               {/* 3 информационные карточки */}
//               {[1, 2, 3].map((num) => (
//                 <div key={num} className={styles[`infoContainer__infoCard${num}`]}>
//                   <div className={styles[`infoCard${num}__card${num}`]}>
//                     <Image
//                       width={num === 1 ? 35 : 43}
//                       height={101}
//                       src={`/img/${num}.svg`}
//                       alt={`цифра ${num}`}
//                       style={{ width: 'auto', height: 'auto' }}
//                     />
//                     <p className={styles[`card${num}__txt`]}>
//                       {num === 1 && 'Давно хотели попробовать йогу, но не решались начать'}
//                       {num === 2 && 'Хотите укрепить позвоночник, избавиться от болей в спине и суставах'}
//                       {num === 3 && 'Ищете активность, полезную для тела и души'}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Направления курса */}
//           <div className={styles.skillCard__directionsCourses}>
//             <h2 className={styles.directionsCourses__text}>Направления</h2>
//             <div className={styles.directionsCourses__dirCourse}>
//               <div className={styles.dirCourse__wrapper}>
//                 {['Йога для новичков','Классическая йога','Кундалини-йога','Йогатерапия','Хатха-йога','Аштанга-йога'].map((name, i) => (
//                   <div key={i} className={styles.dirCourse__block}>
//                     <div className={styles.dirCourse__item}>
//                       <Image width={19.5} height={19.5} src="/img/icon/star.svg" alt="звезда" style={{ width: 'auto', height: 'auto' }} />
//                       <p className={styles.dirCourse__txt}>{name}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Кнопка добавления курса */}
//           {username && !isAdded ? (
//             <button disabled={isLoading} onClick={handleAddCourse}>
//               {isLoading ? 'Добавление...' : 'Добавить курс'}
//             </button>
//           ) : !username ? (
//             <Link href="/auth/signin">Войдите, чтобы добавить курс</Link>
//           ) : null}
//         </div>

//         {/* Постер */}
//         <div className={styles.skillPoster}>
//           <div className={styles.posterContainer}>
//             <div className={styles.posterContainer__txtContainer}>
//               <h3 className={styles.txtContainer__title}>Начните путь к новому телу</h3>
//               <ul className={styles.txtContainer__list}>
//                 <li>проработка всех групп мышц</li>
//                 <li>тренировка суставов</li>
//                 <li>улучшение циркуляции крови</li>
//                 <li>упражнения заряжают бодростью</li>
//                 <li>помогают противостоять стрессам</li>
//               </ul>
//               {!username && <Link className={styles.txtContainer__btn} href="/auth/signin">Войдите, чтобы добавить курс</Link>}
//             </div>
//           </div>
//           <Image width={604.47} height={604.47} src="/img/poster.png" alt="рекламный плакат" style={{ width: 'auto', height: 'auto' }} />
//           <Image width={670.18} height={390.98} src="/img/icon/greenLine.svg" alt="зеленая линия" style={{ width: 'auto', height: 'auto' }} />
//         </div>
//       </div>
//     </FitnessLayout>
//   );
// }

// 'use client';

// import FitnessLayout from '@/app/fitness/FitnessLayout';
// import styles from './page.module.css';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter, useParams } from 'next/navigation';
// // import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { CourseApiType } from '@/sharedTypes/sharedTypes';
// import { useAppSelector } from '@/store/store';
// // import { useRouter } from 'next/router';
// import { addCourseToUser, getCourseById } from '@/services/courses/coursesApi';

// export default function FitnessCoursesPage() {
//   const params = useParams<{ id: string }>();
//   const router = useRouter();

//   const [course, setCourse] = useState<CourseApiType | null>(null);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const username = useAppSelector((state) => state.auth.username);
//   const token = useAppSelector((state) => state.auth.token);

//   useEffect(() => {
//     if (!params.id) return;
//     getCourseById(params.id)
//       .then((data) => setCourse(data))
//       .catch(() => setError('Ошибка загрузки курса'));
//   }, [params.id]);

//   const handleAddCourse = async () => {
//     if (!token) return router.push('/auth/signin');
//     if (!course?._id) return alert('Неверные данные курса');

//     setIsLoading(true);
//     try {
//       if (course) await addCourseToUser(course._id);
//       alert('Курс успешно добавлен!');
//     } catch {
//       alert('Не удалось добавить курс. Попробуйте позже.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (error) return <div>{error}</div>;
//   if (!course) return <div>Загрузка...</div>;

//   const isAdded = false; // TODO: проверить, есть ли курс у пользователя через API

//   return (
//     <FitnessLayout>
//       <div className={styles.skillContainer}>
//         <div className={styles.skillCard}>
//           <Image
//             width={1160}
//             height={310}
//             className={styles.skillCard__image}
//             src="/img/skillCard1.png"
//             alt="Карточка навыка"
//             style={{ width: 'auto', height: 'auto' }}
//           />
//           <div className={styles.skillCard__infoContainer}>
//             <h2 className={styles.skillCard__text}>Подойдет для вас, если:</h2>

//             <div className={styles.infoContainer__infoCard}>
//               <div className={styles.infoContainer__infoCard1}>
//                 <div className={styles.infoCard1__card1}>
//                   <Image
//                     width={35}
//                     height={101}
//                     // className={styles.infoCard1__image}
//                     src="/img/1.svg"
//                     alt="цифра один"
//                     style={{ width: 'auto', height: 'auto' }}
//                   />
//                   <p className={styles.card1__txt}>
//                     Давно хотели попробовать йогу, <br /> но не решались начать
//                   </p>
//                 </div>
//               </div>

//               <div className={styles.infoContainer__infoCard2}>
//                 <div className={styles.infoCard2__card2}>
//                   <Image
//                     width={43}
//                     height={101}
//                     // className={styles.infoCard1__image}
//                     src="/img/2.svg"
//                     alt="цифра два"
//                     style={{ width: 'auto', height: 'auto' }}
//                   />
//                   <p className={styles.card2__txt}>
//                     Хотите укрепить позвоночник, избавиться <br /> от болей в
//                     спине и суставах
//                   </p>
//                 </div>
//               </div>

//               <div className={styles.infoContainer__infoCard3}>
//                 <div className={styles.infoCard3__card3}>
//                   <Image
//                     width={43}
//                     height={101}
//                     // className={styles.infoCard1__image}
//                     src="/img/3.svg"
//                     alt="цифра три"
//                     style={{ width: 'auto', height: 'auto' }}
//                   />
//                   <p className={styles.card3__txt}>
//                     Ищете активность, полезную для тела и души
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={styles.skillCard__directionsCourses}>
//             <h2 className={styles.directionsCourses__text}>Направления</h2>
//             <div className={styles.directionsCourses__dirCourse}>
//               {/* Примеры направлений */}
//               <div className={styles.dirCourse__wrapper}>
//                 {['Йога для новичков','Классическая йога','Кундалини-йога','Йогатерапия','Хатха-йога','Аштанга-йога'].map((name, i) => (
//                   <div key={i} className={styles.dirCourse__block}>
//                     <div className={styles.dirCourse__item}>
//                       <Image width={19.5} height={19.5} src="/img/icon/star.svg" alt="звезда" style={{ width: 'auto', height: 'auto' }} />
//                       <p className={styles.dirCourse__txt}>{name}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Кнопка добавления курса */}
//           {username && !isAdded ? (
//             <button disabled={isLoading} onClick={handleAddCourse}>
//               {isLoading ? 'Добавление...' : 'Добавить курс'}
//             </button>
//           ) : !username ? (
//             <Link href="/auth/signin">Войдите, чтобы добавить курс</Link>
//           ) : null}
//         </div>

//         {/* Постер */}
//         <div className={styles.skillPoster}>
//           <div className={styles.posterContainer}>
//             <div className={styles.posterContainer__txtContainer}>
//               <h3 className={styles.txtContainer__title}>Начните путь к новому телу</h3>
//               <ul className={styles.txtContainer__list}>
//                 <li>проработка всех групп мышц</li>
//                 <li>тренировка суставов</li>
//                 <li>улучшение циркуляции крови</li>
//                 <li>упражнения заряжают бодростью</li>
//                 <li>помогают противостоять стрессам</li>
//               </ul>
//               {!username && <Link className={styles.txtContainer__btn} href="/auth/signin">Войдите, чтобы добавить курс</Link>}
//             </div>
//           </div>
//           <Image width={604.47} height={604.47} src="/img/poster.png" alt="рекламный плакат" style={{ width: 'auto', height: 'auto' }} />
//           <Image width={670.18} height={390.98} src="/img/icon/greenLine.svg" alt="зеленая линия" style={{ width: 'auto', height: 'auto' }} />
//         </div>
//       </div>
//     </FitnessLayout>
//   );
// }

// 'use client';

// import FitnessLayout from '@/app/fitness/FitnessLayout';
// import styles from './page.module.css';
// import Image from 'next/image';
// import Link from 'next/link';
// // import { useAppSelector } from '@/store/store';
// // import { useParams } from 'next/navigation';

// export default function FitnessCoursesPage() {
//   // const params = useParams<{ id: string }>();
//   return (
//     <FitnessLayout>
//       <div className={styles.skillContainer}>
//         <div className={styles.skillCard}>
//           <Image
//             width={1160}
//             height={310}
//             className={styles.skillCard__image}
//             src="/img/skillCard1.png"
//             alt="Карточка навыка"
//             style={{ width: 'auto', height: 'auto' }}
//           />
//           <div className={styles.skillCard__infoContainer}>
//             <h2 className={styles.skillCard__text}>Подойдет для вас, если:</h2>

//             <div className={styles.infoContainer__infoCard}>
//               <div className={styles.infoContainer__infoCard1}>
//                 <div className={styles.infoCard1__card1}>
//                   <Image
//                     width={35}
//                     height={101}
//                     // className={styles.infoCard1__image}
//                     src="/img/1.svg"
//                     alt="цифра один"
//                     style={{ width: 'auto', height: 'auto' }}
//                   />
//                   <p className={styles.card1__txt}>
//                     Давно хотели попробовать йогу, <br /> но не решались начать
//                   </p>
//                 </div>
//               </div>

//               <div className={styles.infoContainer__infoCard2}>
//                 <div className={styles.infoCard2__card2}>
//                   <Image
//                     width={43}
//                     height={101}
//                     // className={styles.infoCard1__image}
//                     src="/img/2.svg"
//                     alt="цифра два"
//                     style={{ width: 'auto', height: 'auto' }}
//                   />
//                   <p className={styles.card2__txt}>
//                     Хотите укрепить позвоночник, избавиться <br /> от болей в
//                     спине и суставах
//                   </p>
//                 </div>
//               </div>

//               <div className={styles.infoContainer__infoCard3}>
//                 <div className={styles.infoCard3__card3}>
//                   <Image
//                     width={43}
//                     height={101}
//                     // className={styles.infoCard1__image}
//                     src="/img/3.svg"
//                     alt="цифра три"
//                     style={{ width: 'auto', height: 'auto' }}
//                   />
//                   <p className={styles.card3__txt}>
//                     Ищете активность, полезную для тела и души
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={styles.skillCard__directionsCourses}>
//             <h2 className={styles.directionsCourses__text}>Направления</h2>
//             <div className={styles.directionsCourses__dirCourse}>
//               <div className={styles.dirCourse__wrapper}>
//                 <div className={styles.dirCourse__block}>
//                   <div className={styles.dirCourse__item}>
//                     <Image
//                       width={19.5}
//                       height={19.5}
//                       src="/img/icon/star.svg"
//                       alt="звезда"
//                       className={styles.dirCourse__image}
//                       style={{ width: 'auto', height: 'auto' }}
//                     />
//                     <p className={styles.dirCourse__txt}>Йога для новичков</p>
//                   </div>

//                   <div className={styles.dirCourse__item}>
//                     <Image
//                       width={19.5}
//                       height={19.5}
//                       src="/img/icon/star.svg"
//                       alt="звезда"
//                       className={styles.dirCourse__image}
//                       style={{ width: 'auto', height: 'auto' }}
//                     />
//                     <p className={styles.dirCourse__txt}>Классическая йога</p>
//                   </div>
//                 </div>
//                 <div className={styles.dirCourse__block}>
//                   <div className={styles.dirCourse__item}>
//                     <Image
//                       width={19.5}
//                       height={19.5}
//                       className={styles.dirCourse__image}
//                       src="/img/icon/star.svg"
//                       alt="звезда"
//                       style={{ width: 'auto', height: 'auto' }}
//                     />
//                     <p className={styles.dirCourse__txt}>Кундалини-йога</p>
//                   </div>
//                   <div className={styles.dirCourse__item}>
//                     <Image
//                       width={19.5}
//                       height={19.5}
//                       className={styles.dirCourse__image}
//                       src="/img/icon/star.svg"
//                       alt="звезда"
//                       style={{ width: 'auto', height: 'auto' }}
//                     />
//                     <p className={styles.dirCourse__txt}>Йогатерапия</p>
//                   </div>
//                 </div>
//                 <div className={styles.dirCourse__block}>
//                   <div className={styles.dirCourse__item}>
//                     <Image
//                       width={19.5}
//                       height={19.5}
//                       className={styles.dirCourse__image}
//                       src="/img/icon/star.svg"
//                       alt="звезда"
//                       style={{ width: 'auto', height: 'auto' }}
//                     />
//                     <p className={styles.dirCourse__txt}>Хатха-йога</p>
//                   </div>
//                   <div className={styles.dirCourse__item}>
//                     <Image
//                       width={19.5}
//                       height={19.5}
//                       className={styles.dirCourse__image}
//                       src="/img/icon/star.svg"
//                       alt="звезда"
//                       style={{ width: 'auto', height: 'auto' }}
//                     />
//                     <p className={styles.dirCourse__txt}>Аштанга-йога</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={styles.skillPoster}>
//           <div className={styles.posterContainer}>
//             <div className={styles.posterContainer__txtContainer}>
//               <h3 className={styles.txtContainer__title}>
//                 Начните путь к новому телу
//               </h3>
//               <div className={styles.txtContainer__list}>
//                 <ul>
//                   <li>проработка всех групп мышц</li>
//                   <li>тренировка суставов</li>
//                   <li>улучшение циркуляции крови</li>
//                   <li>упражнения заряжают бодростью</li>
//                   <li>помогают противостоять стрессам</li>
//                 </ul>
//               </div>

//               <Link className={styles.txtContainer__btn} href={'/auth/signin'}>
//                 Войдите, чтобы добавить курс
//               </Link>
//             </div>
//           </div>
//           <Image
//             width={604.47}
//             height={604.47}
//             className={styles.skillPoster__posterImg}
//             src="/img/poster.png"
//             alt="рекламный плакат"
//             style={{ width: 'auto', height: 'auto' }}
//           />
//           <Image
//             width={670.18}
//             height={390.98}
//             className={styles.skillPoster__posterImgSvg}
//             src="/img/icon/greenLine.svg"
//             alt="зеленая линия"
//             style={{ width: 'auto', height: 'auto' }}
//           />
//         </div>
//       </div>
//     </FitnessLayout>
//   );
// }
