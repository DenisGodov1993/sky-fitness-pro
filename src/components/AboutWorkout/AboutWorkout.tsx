'use client';

import styles from './aboutWorkout.module.css';
import { WorkoutApi } from '@/sharedTypes/sharedTypes';

interface AboutWorkoutProps {
  workout: WorkoutApi;
  progress: number[];
  setProgress: (value: number[]) => void;
  onProgressButtonClick: () => void;
}

export default function AboutWorkout({
  workout,
  progress,
  setProgress,
  onProgressButtonClick,
}: AboutWorkoutProps) {
  const hasProgress = progress.some((value) => value > 0);

  const getExercisePercent = (index: number) => {
    const required = workout.exercises[index].quantity;
    const done = progress[index] || 0;

    if (required === 0) return 0;

    const percent = (done / required) * 100;

    return Math.min(100, Math.round(percent));
  };

  /* =============================
     Убираем "(10 повторений)"
  ============================== */

  const getExerciseTitle = (name: string) => {
    return name.replace(/\s*\(.*?\)/, '');
  };

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.title}>Упражнения тренировки</h1> */}
      <h1 className={styles.title}>{getExerciseTitle(workout.name)}</h1>

      <div className={styles.grid}>
        {workout.exercises.map((exercise, index) => {
          const percent = getExercisePercent(index);

          return (
            <div key={exercise._id} className={styles.exerciseCard}>
              <div className={styles.exerciseHeader}>
                <span>{getExerciseTitle(exercise.name)}</span>
                <span>{percent}%</span>
              </div>

              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onProgressButtonClick}
        className={styles.progressButton}
      >
        {hasProgress
          ? 'Обновить свой прогресс'
          : 'Заполнить свой прогресс'}
      </button>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import styles from './aboutWorkout.module.css';
// import { WorkoutApi } from '@/sharedTypes/sharedTypes';


// interface AboutWorkoutProps {
//   workout: WorkoutApi;
//   progress: number[];
//   setProgress: (value: number[]) => void;
//   onProgressButtonClick: () => void;
// }

// export default function AboutWorkout({
//   workout,
//   progress,
//   setProgress,
//   onProgressButtonClick,
// }: AboutWorkoutProps) {
//     // const [isModalOpen, setIsModalOpen] = useState(false);
//   const hasProgress = progress.some((value) => value > 0);

//   const [workouts, setWorkouts] = useState<WorkoutApi[]>([]);
//     const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(
//       null,
//     );
//     const [workoutProgress, setWorkoutProgress] = useState<
//       Record<string, number[]>
//     >({});

//   const getExercisePercent = (index: number) => {
//     const required = workout.exercises[index].quantity;
//     const done = progress[index] || 0;

//     if (required === 0) return 0;

//     const percent = (done / required) * 100;

//     return Math.min(100, Math.round(percent));
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
//     <div className={styles.container}>
//       <h1 className={styles.title}>Упражнения тренировки</h1>

//       {/* <div className={styles.grid}>
//         {workout.exercises.map((exercise, index) => {
//           const percent = getExercisePercent(index);

//           return (
//             <div key={exercise._id} className={styles.exerciseCard}>

//               <div className={styles.exerciseHeader}>
//                 <span>{exercise.name}</span>
//                 <span>{percent}%</span>
//               </div>

//               <div className={styles.progressBar}>
//                 <div
//                   className={styles.progress}
//                   style={{ width: `${percent}%` }}
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div> */}

//       <div className={styles.list}>
//                 {workouts.map((workout) => {
//                   const completed = isCompleted(workout);
//                   const isSelected = selectedWorkoutId === workout._id;
//                   return (
//                     <div
//                       key={workout._id}
                  
//                       className={`${styles.item} ${isSelected ? styles['item--selected'] : ''}`}
//                       onClick={() => setSelectedWorkoutId(workout._id)}
//                     >
//                       <div
//                         className={`${styles.indicator} ${
//                           completed ? styles.completed : ''
//                         } ${isSelected ? styles['indicator--selected'] : ''}`}
//                       >
//                         {completed && <span className={styles.checkmark}>✓</span>}
//                       </div>
//                       {renderStyledName(workout.name)}
//                     </div>
//                   );
//                 })}
//               </div>
      
//         <button
//           onClick={onProgressButtonClick}
//           className={styles.progressButton}
//         >
//           {hasProgress ? 'Обновить свой прогресс' : 'Заполнить свой прогресс'}
//         </button>
//     </div>
//   );
// }
 

// 'use client';

// import styles from './aboutWorkout.module.css';
// import { WorkoutApi } from '@/sharedTypes/sharedTypes';
// // import { WorkoutInput } from '@/components/WorkoutInput/WorkoutInput';
// // import { useState } from 'react';

// interface AboutWorkoutProps {
//   workout: WorkoutApi;
//   progress: number[];
//   setProgress: (value: number[]) => void;
//   onProgressButtonClick: () => void;
// }

// export default function AboutWorkout({
//   workout,
//   progress,
//   setProgress,
//   onProgressButtonClick,
// }: AboutWorkoutProps) {
//     // const [isModalOpen, setIsModalOpen] = useState(false);
//   const hasProgress = progress.some((value) => value > 0);

//   const getExercisePercent = (index: number) => {
//     const required = workout.exercises[index].quantity;
//     const done = progress[index] || 0;

//     if (required === 0) return 0;

//     const percent = (done / required) * 100;

//     return Math.min(100, Math.round(percent));
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Упражнения тренировки</h1>

//       <div className={styles.grid}>
//         {workout.exercises.map((exercise, index) => {
//           const percent = getExercisePercent(index);

//           return (
//             <div key={exercise._id} className={styles.exerciseCard}>
//               {/* <WorkoutInput
//                 value={progress[index] ?? 0}
//                 max={exercise.quantity}
//                 onChange={(value) => {
//                   const updated = [...progress];
//                   updated[index] = value;
//                   setProgress(updated);
//                 }}
//               /> */}

//               <div className={styles.exerciseHeader}>
//                 <span>{exercise.name}</span>
//                 <span>{percent}%</span>
//               </div>

//               <div className={styles.progressBar}>
//                 <div
//                   className={styles.progress}
//                   style={{ width: `${percent}%` }}
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>
      
//         <button
//           // onClick={() => setIsModalOpen(true)}
//           onClick={onProgressButtonClick}
//           className={styles.progressButton}
//         >
//           {hasProgress ? 'Обновить свой прогресс' : 'Заполнить свой прогресс'}
//         </button>
//     </div>
//   );
// }
 