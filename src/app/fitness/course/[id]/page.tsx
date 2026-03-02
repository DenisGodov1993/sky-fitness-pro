'use client';

import styles from './courseworkoutspage.module.css';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { WorkoutApi } from '@/sharedTypes/sharedTypes';
import { getCourseWorkouts } from '@/services/courses/coursesApi';

export default function CourseWorkoutsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [workouts, setWorkouts] = useState<WorkoutApi[]>([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getCourseWorkouts(id).then(setWorkouts);
  }, [id]);

  const handleStart = () => {
    if (!selectedWorkoutId) return;
    router.push(`/fitness/workout/${id}/${selectedWorkoutId}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выберите тренировку</h1>

        <div className={styles.list}>
          {workouts.map((workout) => (
            <div
              key={workout._id}
              className={`${styles.item} ${
                selectedWorkoutId === workout._id ? styles.active : ''
              }`}
              onClick={() => setSelectedWorkoutId(workout._id)}
            >
              <div className={styles.itemTitle}>{workout.name}</div>
              <div className={styles.itemSubtitle}>
                Йога на каждый день
              </div>
            </div>
          ))}
        </div>

        <button
          className={styles.startButton}
          disabled={!selectedWorkoutId}
          onClick={handleStart}
        >
          Начать
        </button>
      </div>
    </div>
  );
}

// 'use client';

// import styles from './courseworkoutspage.module.css';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import { WorkoutApi } from '@/sharedTypes/sharedTypes';
// import { getCourseWorkouts } from '@/services/courses/coursesApi';

// export default function CourseWorkoutsPage() {
//   const { id } = useParams<{ id: string }>();
//   const [workouts, setWorkouts] = useState<WorkoutApi[]>([]);
//   const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;
//     getCourseWorkouts(id).then(setWorkouts);
//   }, [id]);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.modal__selectWorkout}>
//         <h1 className={styles.selectWorkout__title}>Выберите тренировку</h1>

//         <div className={styles.workoutsList}>
//           {workouts.map((workout) => (
//             <div
//               key={workout._id}
//               className={`${styles.selectWorkout__content} ${
//                 selectedWorkoutId === workout._id ? styles.active : ''
//               }`}
//               onClick={() => setSelectedWorkoutId(workout._id)}
//             >
//               <h2>{workout.name}</h2>
//             </div>
//           ))}
//         </div>

//         {/* КНОПКА ВНИЗУ МОДАЛКИ */}
//         {selectedWorkoutId ? (
//           <Link
//             className={styles.selectWorkout__btn}
//             href={`/fitness/workout/${id}/${selectedWorkoutId}`}
//           >
//             Начать тренировку
//           </Link>
//         ) : (
//           <button className={styles.selectWorkout__btn} disabled>
//             Начать
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


// 'use client';

// import styles from './courseworkoutspage.module.css';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import { WorkoutApi } from '@/sharedTypes/sharedTypes';
// import { getCourseWorkouts } from '@/services/courses/coursesApi';

// export default function CourseWorkoutsPage() {
//   const { id } = useParams<{ id: string }>();
//   const [workouts, setWorkouts] = useState<WorkoutApi[]>([]);
//   const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;

//     getCourseWorkouts(id).then(setWorkouts);
//   }, [id]);

//   return (
//     <div className={styles.wrapper}>
//         <h1 className={styles.wrapper__title}>Выберите тренировку</h1>
      

//       <div className={styles.modal__selectWorkout}>
//         {workouts.map((workout) => (
//           <div
//             key={workout._id}
//             className={`${styles.selectWorkout__content} ${
//               selectedWorkoutId === workout._id ? styles.active : ''
//             }`}
//             onClick={() => setSelectedWorkoutId(workout._id)}
//           >
//             <h2>{workout.name}</h2>
//           </div>
//         ))}
//       </div>

//       {/* ОДНА КНОПКА ВНИЗУ */}
//       <div className={styles.bottomButton}>
//         {selectedWorkoutId ? (
//           <Link
//             className={styles.selectWorkout__btn}
//             href={`/fitness/workout/${id}/${selectedWorkoutId}`}
//           >
//             Начать тренировку
//           </Link>
//         ) : (
//           <button
//             className={styles.selectWorkout__btn}
//             disabled
//           >
//             Начать
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// 'use client';

// import styles from './courseworkoutspage.module.css';
// import React, { useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import { WorkoutApi } from '@/sharedTypes/sharedTypes';
// import { getCourseWorkouts } from '@/services/courses/coursesApi';

// export default function CourseWorkoutsPage() {
//   const { id } = useParams<{ id: string }>();
//   const [workouts, setWorkouts] = React.useState<WorkoutApi[]>([]);

//   useEffect(() => {
//     if (!id) return;

//     getCourseWorkouts(id).then(setWorkouts);
//   }, [id]);

//   return (
//     <div className={styles.wrapper}>
//       <h1 className={styles.wrapper__title}>Выберите тренировку</h1>
//       {workouts.map((workout) => (
//       <div className={styles.modal__selectWorkout}>
//         <div className={styles.selectWorkout__content}>
//           <h2>{workout.name}</h2>
//         </div>
//          </div>
//         ))}
//         </div>

//       {workouts.length > 0 && (
//         <Link
//           className={styles.selectWorkout__btn}
//           href={`/fitness/workout/${id}/${workout._id}`}
//         >
//           Начать
//         </Link>
//      )}
//     </div>
//   );
// }

// 'use client';

// import styles from './courseworkoutspage.module.css';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { WorkoutApi } from '@/sharedTypes/sharedTypes';
// import {
//   getCourseWorkouts,
//   getCourseProgress,
// } from '@/services/courses/coursesApi';
// import {
//   setCourseProgress,
//   setProgressLoading,
// } from '@/store/features/progressSlice';

// export default function CourseWorkoutsPage() {
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useAppDispatch();
//   const { courseProgress } = useAppSelector((state) => state.progress);
//   const [workouts, setWorkouts] = React.useState<WorkoutApi[]>([]);

//   useEffect(() => {
//     if (!id) return;

//     dispatch(setProgressLoading(true));

//     getCourseWorkouts(id).then(setWorkouts);

//     getCourseProgress(id)
//       .then((data) => dispatch(setCourseProgress(data)))
//       .catch(() => dispatch(setCourseProgress(null)))
//       .finally(() => dispatch(setProgressLoading(false)));
//   }, [id, dispatch]);

//   const getWorkoutProgressPercent = (workoutId: string): number => {
//     if (!courseProgress || !courseProgress.workoutsProgress) return 0;

//     const workout = courseProgress.workoutsProgress.find(
//       (w) => w.workoutId === workoutId,
//     );

//     if (!workout) return 0;

//     return workout.progressData.reduce((a, b) => a + b, 0);

//   };

//   return (

//     <div className={styles.wrapper}>
//       <h1>Выберите тренировку</h1>

//       {workouts.map((workout) => {
//         const progress = getWorkoutProgressPercent(workout._id);

//         return (
//           <div key={workout._id} className={styles.selectWorkout__content}>
//             <h2>{workout.name}</h2>

//             {/* ПРОГРЕСС НАД КНОПКОЙ */}
//             <p>Ваш прогресс: {progress}</p>

//             <Link
//               className={styles.selectWorkout__btn}
//               href={`/fitness/workout/${id}/${workout._id}`}
//             >
//               Начать тренировки
//             </Link>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// 'use client';

// import styles from './courseworkoutspage.module.css';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';
// import { BASE_URL } from '@/services/constants';

// export default function CourseWorkoutsPage() {
//   const { id } = useParams();
//   const [workouts, setWorkouts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!id) {
//       setLoading(false);
//       return;
//     }

//     axios
//       .get(`${BASE_URL}/courses/${id}/workouts`, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       })
//       .then(response => {
//         setWorkouts(response.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching workouts:', err);
//         setError('Ошибка загрузки тренировок. Проверьте подключение к интернету.');
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return <div className={styles.loading}>Загрузка тренировок...</div>;
//   }

//   if (error) {
//     return <div className={styles.error}>{error}</div>;
//   }

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.modal__selectWorkout}>
//         <h1 className={styles.selectWorkout__title}>Выберите тренировку</h1>
//         {workouts.length === 0 ? (
//           <div className={styles.noWorkouts}>
//             В этом курсе пока нет тренировок
//           </div>
//         ) : (
//           workouts.map((workout: any) => (
//             <div key={workout._id} className={styles.selectWorkout__content}>
//               <div className={styles.workoutInfo}>
//                 <h2>У{workout.name}</h2>
//                 <p>Йога на каждый день / 1 день</p>
//               </div>
//               <div>ползунок</div>
//               <Link
//                 className={styles.selectWorkout__btn}
//                 href={`/fitness/workout/${id}/${workout._id}`}
//               >
//                 Начать
//               </Link>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// 'use client';

// import styles from './courseworkoutspage.module.css';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { getCourseWorkouts } from '@/services/courses/coursesApi';
// import Link from 'next/link';
// import axios from 'axios';

// export default function CourseWorkoutsPage() {
//   const { id } = useParams();
//   //   const [workouts, setWorkouts] = useState([]);
//   const [workouts, setWorkouts] = useState<any[]>([]);

//   useEffect(() => {
//     if (!id) return;

//     getCourseWorkouts(id as string)
//       .then(setWorkouts)
//       .catch(() => alert('Ошибка загрузки тренировок'));
//   }, [id]);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.modal__selectWorkout}>
//         <h1 className={styles.selectWorkout__title}>Выберите тренировку</h1>
//         {workouts.map((workout: any) => (
//           <div key={workout._id} className={styles.selectWorkout__content}>
//             <div>
//               <div>
//                 <div>
//                   <div>
//                     <h2>Утренняя практика{workout.name}</h2>
//                     <p>Йога на каждый день / 1 день </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div>ползунок</div>

//             <Link
//               className={styles.selectWorkout__btn}
//               href={`/fitness/workout/${id}/${workout._id}`}
//             >
//               Начать
//             </Link>
//             {/* <button className={styles.selectWorkout__btn}>Начать</button> */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// 'use client';

// import styles from './courseworkoutspage.module.css';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { getCourseWorkouts } from '@/services/courses/coursesApi';
// import Link from 'next/link';
// // import axios from 'axios';

// export default function CourseWorkoutsPage() {
//   const { id } = useParams();
//   const [workouts, setWorkouts] = useState([]);

//   useEffect(() => {
//     if (!id) return;

//     getCourseWorkouts(id as string)
//       .then(setWorkouts)
//       .catch(() => alert('Ошибка загрузки тренировок'));
//   }, [id]);

//   return (
//     // <>
//     <div className={styles.wrapper}>
//       <div className={styles.modal__selectWorkout}>
//         <h1 className={styles.selectWorkout__title}>Выберите тренировку</h1>
//         {workouts.map((workout: any) => (
//         <div key={workout._id}className={styles.selectWorkout__content}>
//           <div>
//             <div>
//               <div>
//                 <div>
//                   <h2>Утренняя практика{workout.name}</h2>
//                   <p>Йога на каждый день / 1 день </p>
//                 </div>
//               </div>
//             </div>
//             <div>ползунок</div>
//           </div>
//         </div>
//         <Link className={styles.selectWorkout__btn} href={`/fitness/workout/${id}/${workout._id}`}>Начать</Link>
//         {/* <button className={styles.selectWorkout__btn}>Начать</button> */}
//       </div>
//     </div>
//     // {/* </> */}
//     // <div> href="#"
//     //   <h1>Тренировки курса</h1>

//     //   {/* {workouts.map((workout: any) => (
//     //     <div key={workout._id}>
//     //       <h3>{workout.name}</h3>

//     //   <Link href={`/fitness/workout/${id}/${workout._id}`}>
//     //     Открыть урок
//     //   </Link>
//     //     </div>
//     //   ))} */}
//     // </div>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { getCourseWorkouts } from '@/services/courses/coursesApi';
// import Link from 'next/link';
// import axios from 'axios';

// export default function CourseWorkoutsPage() {
//   const { id } = useParams();
//   const [workouts, setWorkouts] = useState([]);

//   useEffect(() => {
//     if (!id) return;

//     getCourseWorkouts(id as string)
//       .then(setWorkouts)
//       .catch(() => alert('Ошибка загрузки тренировок'));
//   }, [id]);

//   return (
//     <div>
//       <h1>Тренировки курса</h1>

//       {workouts.map((workout: any) => (
//         <div key={workout._id}>
//           <h3>{workout.name}</h3>

//           <Link href={`/fitness/workout/${id}/${workout._id}`}>
//             Открыть урок
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }
