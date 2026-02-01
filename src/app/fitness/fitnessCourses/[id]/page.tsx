'use client';

import FitnessLayout from '@/app/fitness/FitnessLayout';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
// import { useAppSelector } from '@/store/store';
// import { useParams } from 'next/navigation';

export default function FitnessCoursesPage() {
  // const params = useParams<{ id: string }>();
  return (
    <FitnessLayout>
      <div className={styles.skillContainer}>
        <div className={styles.skillCard}>
          <Image
            width={1160}
            height={310}
            className={styles.skillCard__image}
            src="/img/skillCard1.png"
            alt="Карточка навыка"
            style={{ width: 'auto', height: 'auto' }}
          />
          <div className={styles.skillCard__infoContainer}>
            <h2 className={styles.skillCard__text}>Подойдет для вас, если:</h2>

            <div className={styles.infoContainer__infoCard}>
              <div className={styles.infoContainer__infoCard1}>
                <div className={styles.infoCard1__card1}>
                  <Image
                    width={35}
                    height={101}
                    // className={styles.infoCard1__image}
                    src="/img/1.svg"
                    alt="цифра один"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                  <p className={styles.card1__txt}>
                    Давно хотели попробовать йогу, <br /> но не решались начать
                  </p>
                </div>
              </div>

              <div className={styles.infoContainer__infoCard2}>
                <div className={styles.infoCard2__card2}>
                  <Image
                    width={43}
                    height={101}
                    // className={styles.infoCard1__image}
                    src="/img/2.svg"
                    alt="цифра два"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                  <p className={styles.card2__txt}>
                    Хотите укрепить позвоночник, избавиться <br /> от болей в
                    спине и суставах
                  </p>
                </div>
              </div>

              <div className={styles.infoContainer__infoCard3}>
                <div className={styles.infoCard3__card3}>
                  <Image
                    width={43}
                    height={101}
                    // className={styles.infoCard1__image}
                    src="/img/3.svg"
                    alt="цифра три"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                  <p className={styles.card3__txt}>
                    Ищете активность, полезную для тела и души
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.skillCard__directionsCourses}>
            <h2 className={styles.directionsCourses__text}>Направления</h2>
            <div className={styles.directionsCourses__dirCourse}>
              <div className={styles.dirCourse__wrapper}>
                <div className={styles.dirCourse__block}>
                  <div className={styles.dirCourse__item}>
                    <Image
                      width={19.5}
                      height={19.5}
                      src="/img/icon/star.svg"
                      alt="звезда"
                      className={styles.dirCourse__image}
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <p className={styles.dirCourse__txt}>Йога для новичков</p>
                  </div>

                  <div className={styles.dirCourse__item}>
                    <Image
                      width={19.5}
                      height={19.5}
                      src="/img/icon/star.svg"
                      alt="звезда"
                      className={styles.dirCourse__image}
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <p className={styles.dirCourse__txt}>Классическая йога</p>
                  </div>
                </div>
                <div className={styles.dirCourse__block}>
                  <div className={styles.dirCourse__item}>
                    <Image
                      width={19.5}
                      height={19.5}
                      className={styles.dirCourse__image}
                      src="/img/icon/star.svg"
                      alt="звезда"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <p className={styles.dirCourse__txt}>Кундалини-йога</p>
                  </div>
                  <div className={styles.dirCourse__item}>
                    <Image
                      width={19.5}
                      height={19.5}
                      className={styles.dirCourse__image}
                      src="/img/icon/star.svg"
                      alt="звезда"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <p className={styles.dirCourse__txt}>Йогатерапия</p>
                  </div>
                </div>
                <div className={styles.dirCourse__block}>
                  <div className={styles.dirCourse__item}>
                    <Image
                      width={19.5}
                      height={19.5}
                      className={styles.dirCourse__image}
                      src="/img/icon/star.svg"
                      alt="звезда"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <p className={styles.dirCourse__txt}>Хатха-йога</p>
                  </div>
                  <div className={styles.dirCourse__item}>
                    <Image
                      width={19.5}
                      height={19.5}
                      className={styles.dirCourse__image}
                      src="/img/icon/star.svg"
                      alt="звезда"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <p className={styles.dirCourse__txt}>Аштанга-йога</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

              <Link className={styles.txtContainer__btn} href="btn">
                Войдите, чтобы добавить курс
              </Link>
            </div>
          </div>
          <Image
            width={604.47}
            height={604.47}
            className={styles.skillPoster__posterImg}
            src="/img/poster.png"
            alt="рекламный плакат"
            style={{ width: 'auto', height: 'auto' }}
            
          />
          <Image
            width={670.18}
            height={390.98}
            className={styles.skillPoster__posterImgSvg}
            src="/img/icon/greenLine.svg"
            alt="зеленая линия"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </div>
    </FitnessLayout>
  );
}

// 'use client';

// import FitnessLayout from '@/app/fitness/FitnessLayout';
// import Centerblock from '@/components/Centerblock/Centerblock';
// // import { useAppSelector } from '@/store/store';
// // import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// // import {
// //   getCourseById,
// //   getCourseWorkouts,
// // } from '@/services/courses/coursesApi';

// export default function FitnessCoursePage() {
//   const { id } = useParams<{ id: string }>();
// //   const [course, setCourse] = useState<any>(null);
// //   const [workouts, setWorkouts] = useState<any[]>([]);

// //   useEffect(() => {
// //     if (!id) return;

// //     getCourseById(id).then(setCourse);
// //     getCourseWorkouts(id).then(setWorkouts);
// //   }, [id]);

// //   if (!course) return <p>Загрузка...</p>;

//   return (
//     <FitnessLayout>
//           <Centerblock
//             // courses={courses}
//             // courses={allCourses}
//             // isLoading={fetchIsLoading}
//             // errorRes={fetchError}
//             // itemName="Фитнес курсы"
//           />
//         </FitnessLayout>
//     // <>
//     //   <h1>{course.nameRU}</h1>

//     //   <ul>
//     //     {workouts.map(w => (
//     //       <li key={w._id}>{w.name}</li>
//     //     ))}
//     //   </ul>
//     // </>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { useAppSelector } from '@/store/store';

// import axios from 'axios';
// import { TrackType } from '@/sharedTypes/sharedTypes';
// import { BASE_URL } from '@/services/constants';
// import Centerblock from '@/components/Centerblock/Centerblock';
// import MusicLayout from '@/app/music/MusicLayout';
// interface PlaylistType {
//   _id: number;
//   name: string;
//   items: number[];
// }

// export default function CategoryPage() {
//   const params = useParams<{ id: string }>();
//   const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
//     (state) => state.tracks,
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorRes, setErrorRes] = useState<string | null>(null);
//   const [tracks, setTracks] = useState<TrackType[]>([]);
//   const [playlistName, setPlaylistName] = useState<string>('');

//   useEffect(() => {
//     // Если глобальные треки не загружены или есть ошибка
//     if (fetchIsLoading) return; // ждём загрузку
//     if (fetchError || allTracks.length === 0) {
//       setIsLoading(false); // стоп локальной загрузки
//       return;
//     }
//     setIsLoading(true);

//     const load = async () => {
//       try {
//         const playlistId = Number(params.id) + 1;
//         const playlistsRes = await axios.get<{
//           success: boolean;
//           data: PlaylistType;
//         }>(`${BASE_URL}/catalog/selection/${playlistId}/`);

//         const playlist = playlistsRes.data.data;
//         if (!playlist) {
//           setErrorRes('Подборка не найдена');
//           return;
//         }

//         setPlaylistName(playlist.name);

//         const filteredTracks = allTracks.filter((track) =>
//           playlist.items.includes(track._id),
//         );
//         setTracks(filteredTracks);
//       } catch (err) {
//         console.error(err);
//         setErrorRes('Ошибка загрузки подборки');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     load();
//   }, [params.id, allTracks, fetchIsLoading, fetchError]);
//   return (
//     <MusicLayout>
//       <Centerblock
//         errorRes={errorRes || fetchError}
//         tracks={tracks}
//         isLoading={isLoading}
//         itemName={playlistName}
//       />
//     </MusicLayout>
//   );
// }
