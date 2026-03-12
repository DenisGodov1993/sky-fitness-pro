'use client';

import styles from './aboutWorkout.module.css';
import { WorkoutApi } from '@/sharedTypes/sharedTypes';

interface AboutWorkoutProps {
  workout: WorkoutApi;
  progress: number[];
  onProgressButtonClick: () => void;
}

export default function AboutWorkout({
  workout,
  progress,
  onProgressButtonClick,
}: AboutWorkoutProps) {
  const hasProgress = progress.some((value) => value > 0);

  const getExercisePercent = (index: number) => {
    const exercise = workout.exercises[index];
    if (!exercise) return 0;

    const required = exercise.quantity;
    const done = progress[index] || 0;

    if (required === 0) return 0;

    const percent = (done / required) * 100;

    return Math.min(100, Math.round(percent));
  };

  const getExerciseTitle = (name: string) => {
    return name.replace(/\s*\(.*?\)/, '');
  };

  return (
    <div className={styles.container}>
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

      <button onClick={onProgressButtonClick} className={styles.progressButton}>
        {hasProgress ? 'Обновить свой прогресс' : 'Заполнить свой прогресс'}
      </button>
    </div>
  );
}

// 'use client';

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
//   onProgressButtonClick,
// }: AboutWorkoutProps) {
//   const hasProgress = progress.some((value) => value > 0);

//   const getExercisePercent = (index: number) => {
//     const required = workout.exercises[index].quantity;
//     const done = progress[index] || 0;

//     if (required === 0) return 0;

//     const percent = (done / required) * 100;

//     return Math.min(100, Math.round(percent));
//   };

//   // Убираем надпись о количестве повторений
//   const getExerciseTitle = (name: string) => {
//     return name.replace(/\s*\(.*?\)/, '');
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>{getExerciseTitle(workout.name)}</h1>
//       <div className={styles.grid}>
//         {workout.exercises.map((exercise, index) => {
//           const percent = getExercisePercent(index);
//           return (
//             <div key={exercise._id} className={styles.exerciseCard}>
//               <div className={styles.exerciseHeader}>
//                 <span>{getExerciseTitle(exercise.name)}</span>
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
//       <button onClick={onProgressButtonClick} className={styles.progressButton}>
//         {hasProgress ? 'Обновить свой прогресс' : 'Заполнить свой прогресс'}
//       </button>
//     </div>
//   );
// }
