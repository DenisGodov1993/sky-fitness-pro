'use client';

import styles from './courseworkoutspage.module.css';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { WorkoutApi, CourseProgressApi, WorkoutProgressApi } from '@/sharedTypes/sharedTypes';
import { getCourseWorkouts, getCourseProgress } from '@/services/courses/coursesApi';
// import ProfilePage from '../../profile/page';

export default function CourseWorkoutsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [workouts, setWorkouts] = useState<WorkoutApi[]>([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);
  const [workoutProgress, setWorkoutProgress] = useState<Record<string, number[]>>({});

  useEffect(() => {
    if (!id) return;

    getCourseWorkouts(id).then(setWorkouts);

    getCourseProgress(id)
      .then((data: CourseProgressApi) => {
        const progressMap: Record<string, number[]> = {};
        data.workoutsProgress?.forEach((wp: WorkoutProgressApi) => {
          progressMap[wp.workoutId] = wp.progressData || [];
        });
        setWorkoutProgress(progressMap);
      })
      .catch(error => {
        console.error('Ошибка загрузки прогресса:', error);
        setWorkoutProgress({});
      });
  }, [id]);

  const handleStart = () => {
    if (!selectedWorkoutId) return;
    router.push(`/fitness/workout/${id}/${selectedWorkoutId}`);
  };

  const isCompleted = (workout: WorkoutApi): boolean => {
    const progress = workoutProgress[workout._id] || [];
    if (progress.length === 0) return false;
    return workout.exercises.every((ex, index) => {
      const userProgress = progress[index] || 0;
      return userProgress >= ex.quantity;
    });
  };

  const renderStyledName = (name: string) => {
    const parts = name.split(' / ');

    if (parts.length < 3) {
      return <div className={styles.originalTitle}>{name}</div>;
    }

    return (
      <div className={styles.nameContainer}>
        <div className={styles.bigTitle}>{parts[0]}</div>
        <div className={styles.subTitle}>
          {parts[1]} / {parts[2]}
        </div>
      </div>
    );
  };

  return (
    
    <div className={styles.wrapper}>
      {/* Страница профиля — фон */}
            {/* <div className={styles.background}>
              <ProfilePage />
            </div> */}
      <div className={styles.modal}>
        <h1 className={styles.title}>Выберите тренировку</h1>

        <div className={styles.list}>
          {workouts.map((workout) => {
            const completed = isCompleted(workout);
            const isSelected = selectedWorkoutId === workout._id;
            return (
              <div
                key={workout._id}
                // className={`${styles.item} ${
                //   selectedWorkoutId === workout._id ? styles.active : ''
                // }`}
                className={`${styles.item} ${isSelected ? styles['item--selected'] : ''}`}
                onClick={() => setSelectedWorkoutId(workout._id)}
              >
                {/* <div className={`${styles.indicator} ${completed ? styles.completed : ''}`}> */}
                <div
                className={`${styles.indicator} ${
                  completed ? styles.completed : ''
                } ${isSelected ? styles['indicator--selected'] : ''}`}
              >
                  {completed && <span className={styles.checkmark}>✓</span>}
                </div>
                {renderStyledName(workout.name)}
              </div>
            );
          })}
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
// import { useParams, useRouter } from 'next/navigation';
// import { WorkoutApi, CourseProgressApi, WorkoutProgressApi } from '@/sharedTypes/sharedTypes';
// import { getCourseWorkouts, getCourseProgress } from '@/services/courses/coursesApi';

// export default function CourseWorkoutsPage() {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();

//   const [workouts, setWorkouts] = useState<WorkoutApi[]>([]);
//   const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);
//   const [workoutProgress, setWorkoutProgress] = useState<Record<string, number[]>>({});

//   useEffect(() => {
//     if (!id) return;

//     getCourseWorkouts(id).then(setWorkouts);

//     getCourseProgress(id)
//       .then((data: CourseProgressApi) => {
//         const progressMap: Record<string, number[]> = {};
//         data.workoutsProgress?.forEach((wp: WorkoutProgressApi) => {
//           progressMap[wp.workoutId] = wp.progressData || [];
//         });
//         setWorkoutProgress(progressMap);
//       })
//       .catch(error => {
//         console.error('Ошибка загрузки прогресса:', error);
//         setWorkoutProgress({});
//       });
//   }, [id]);

//   const handleStart = () => {
//     if (!selectedWorkoutId) return;
//     router.push(`/fitness/workout/${id}/${selectedWorkoutId}`);
//   };

//   const isCompleted = (workout: WorkoutApi): boolean => {
//     const progress = workoutProgress[workout._id] || [];
//     if (progress.length === 0) return false;
//     return workout.exercises.every((ex, index) => {
//       const userProgress = progress[index] || 0;
//       return userProgress >= ex.quantity;
//     });
//   };

//   const renderStyledName = (name: string) => {
//     const parts = name.split(' / ');

//     if (parts.length < 3) {
//       return <div className={styles.originalTitle}>{name}</div>;
//     }

//     return (
//       <div className={styles.nameContainer}>
//         <div className={styles.bigTitle}>{parts[0]}</div>
//         <div className={styles.subTitle}>
//           {parts[1]} / {parts[2]}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.modal}>
//         <h1 className={styles.title}>Выберите тренировку</h1>

//         <div className={styles.list}>
//           {workouts.map((workout) => {
//             const completed = isCompleted(workout);
//             return (
//               <div
//                 key={workout._id}
//                 className={`${styles.item} ${
//                   selectedWorkoutId === workout._id ? styles.active : ''
//                 }`}
//                 onClick={() => setSelectedWorkoutId(workout._id)}
//               >
//                 <div className={`${styles.indicator} ${completed ? styles.completed : ''}`}>
//                   {completed && <span className={styles.checkmark}>✓</span>}
//                 </div>
//                 {renderStyledName(workout.name)}
//               </div>
//             );
//           })}
//         </div>

//         <button
//           className={styles.startButton}
//           disabled={!selectedWorkoutId}
//           onClick={handleStart}
//         >
//           Начать
//         </button>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import styles from './courseworkoutspage.module.css';
// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { WorkoutApi } from '@/sharedTypes/sharedTypes';
// import { getCourseWorkouts } from '@/services/courses/coursesApi';

// export default function CourseWorkoutsPage() {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();

//   const [workouts, setWorkouts] = useState<WorkoutApi[]>([]);
//   const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);
//   const [workoutProgress, setWorkoutProgress] = useState<Record<string, number[]>>({});

//   useEffect(() => {
//     if (!id) return;
//     getCourseWorkouts(id).then(setWorkouts);
//     // Здесь должна быть загрузка прогресса тренировок
//   }, [id]);

//   const handleStart = () => {
//     if (!selectedWorkoutId) return;
//     router.push(`/fitness/workout/${id}/${selectedWorkoutId}`);
//   };

//   const isCompleted = (workout: WorkoutApi): boolean => {
//     const progress = workoutProgress[workout._id] || [];
//     return workout.exercises.every((ex, index) => {
//       const userProgress = progress[index] || 0;
//       return userProgress >= ex.quantity;
//     });
//   };

//   const renderStyledName = (name: string) => {
//     const parts = name.split(' / ');

//     if (parts.length < 3) {
//       return <div className={styles.originalTitle}>{name}</div>;
//     }

//     return (
//       <div className={styles.nameContainer}>
//         <div className={styles.bigTitle}>{parts[0]}</div>
//         <div className={styles.subTitle}>
//           {parts[1]} / {parts[2]}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.modal}>
//         <h1 className={styles.title}>Выберите тренировку</h1>

//         <div className={styles.list}>
//           {workouts.map((workout) => {
//             const completed = isCompleted(workout);
//             return (
//               <div
//                 key={workout._id}
//                 className={`${styles.item} ${
//                   selectedWorkoutId === workout._id ? styles.active : ''
//                 }`}
//                 onClick={() => setSelectedWorkoutId(workout._id)}
//               >
//                 <div className={`${styles.indicator} ${completed ? styles.completed : ''}`}>
//                   {completed && <span className={styles.checkmark}>✓</span>}
//                 </div>
//                 {renderStyledName(workout.name)}
//               </div>
//             );
//           })}
//         </div>

//         <button
//           className={styles.startButton}
//           disabled={!selectedWorkoutId}
//           onClick={handleStart}
//         >
//           Начать
//         </button>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import styles from './courseworkoutspage.module.css';
// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { WorkoutApi } from '@/sharedTypes/sharedTypes';
// import { getCourseWorkouts } from '@/services/courses/coursesApi';

// export default function CourseWorkoutsPage() {
//   const { id } = useParams<{ id: string }>(); // Получаем параметр строковый id из URL
//   const router = useRouter();

//   const [workouts, setWorkouts] = useState<WorkoutApi[]>([]); // Состояние для хранения списка тренировок
//   const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>( // Состояние для отслеживания выбранной тренировки
//     null,
//   );

//   // Эффект выполняется при монтировании компонента и при изменении id
//   useEffect(() => {
//     if (!id) return;
//     getCourseWorkouts(id).then(setWorkouts);
//   }, [id]);

//   // Функция для начала тренировки
//   const handleStart = () => {
//     if (!selectedWorkoutId) return;
//     router.push(`/fitness/workout/${id}/${selectedWorkoutId}`); // id курса и  id выбранной тренировки 
//   };

//   // Функция для разбиения и стилизации названия
//   const renderStyledName = (name: string) => {
//     const parts = name.split(' / ');

//     if (parts.length < 3) {
//       // Если формат не соответствует ожиданиям, возвращаем оригинальное имя
//       return <div className={styles.originalTitle}>{name}</div>;
//     }

//     return (
//       <div className={styles.nameContainer}>
//         {/* "Утренняя практика" */}
//         <div className={styles.bigTitle}>{parts[0]}</div>
//         {/* "Йога на каждый день / 1 день"*/}
//         <div className={styles.subTitle}>
//           {parts[1]} / {parts[2]}
//         </div>
//         {/* "Алексей Казубский" не отображается (не рендерим parts[3]) */}
//       </div>
//     );
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.modal}>
//         <h1 className={styles.title}>Выберите тренировку</h1>

//         <div className={styles.list}>
//           {workouts.map((workout) => ( //перебирает все тренировки из состояния
//             <div
//               key={workout._id}
//               className={`${styles.item} ${
//                 selectedWorkoutId === workout._id ? styles.active : ''
//               }`}
//               onClick={() => setSelectedWorkoutId(workout._id)}
//             >
//               {renderStyledName(workout.name)}
//               {/* <div className={styles.itemTitle}>{workout.name}</div>
//               <div className={styles.itemSubtitle}>Й</div> */}
//             </div>
//           ))}
//         </div>

//         <button
//           className={styles.startButton}
//           disabled={!selectedWorkoutId} // блокируется, если тренировка не выбрана
//           onClick={handleStart}
//         >
//           Начать
//         </button>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import styles from './courseworkoutspage.module.css';
// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { WorkoutApi } from '@/sharedTypes/sharedTypes';
// import { getCourseWorkouts } from '@/services/courses/coursesApi';

// export default function CourseWorkoutsPage() {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();

//   const [workouts, setWorkouts] = useState<WorkoutApi[]>([]);
//   const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(
//     null,
//   );

//   useEffect(() => {
//     if (!id) return;
//     getCourseWorkouts(id).then(setWorkouts);
//   }, [id]);

//   const handleStart = () => {
//     if (!selectedWorkoutId) return;
//     router.push(`/fitness/workout/${id}/${selectedWorkoutId}`);
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.modal}>
//         <h1 className={styles.title}>Выберите тренировку</h1>

//         <div className={styles.list}>
//           {workouts.map((workout) => (
//             <div
//               key={workout._id}
//               className={`${styles.item} ${
//                 selectedWorkoutId === workout._id ? styles.active : ''
//               }`}
//               onClick={() => setSelectedWorkoutId(workout._id)}
//             >
//               <div className={styles.itemTitle}>{workout.name}</div>
//               <div className={styles.itemSubtitle}>Йога на каждый день</div>
//             </div>
//           ))}
//         </div>

//         <button
//           className={styles.startButton}
//           disabled={!selectedWorkoutId}
//           onClick={handleStart}
//         >
//           Начать
//         </button>
//       </div>
//     </div>
//   );
// }
