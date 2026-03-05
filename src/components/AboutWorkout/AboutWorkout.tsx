'use client';

import styles from './aboutWorkout.module.css';
import { WorkoutApi } from '@/sharedTypes/sharedTypes';
import { WorkoutInput } from '@/components/WorkoutInput/WorkoutInput';

interface AboutWorkoutProps {
  workout: WorkoutApi;
  progress: number[];
  setProgress: (value: number[]) => void;
}

export default function AboutWorkout({
  workout,
  progress,
  setProgress,
}: AboutWorkoutProps) {
  const getExercisePercent = (index: number) => {
    const required = workout.exercises[index].quantity;
    const done = progress[index] || 0;

    if (required === 0) return 0;

    const percent = (done / required) * 100;

    return Math.min(100, Math.round(percent));
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Упражнения тренировки</h3>

      <div className={styles.grid}>
        {workout.exercises.map((exercise, index) => {
          const percent = getExercisePercent(index);

          return (
            <div key={exercise._id} className={styles.exerciseCard}>
              <WorkoutInput
                value={progress[index] ?? 0}
                max={exercise.quantity}
                onChange={(value) => {
                  const updated = [...progress];
                  updated[index] = value;
                  setProgress(updated);
                }}
              />

              <div className={styles.exerciseHeader}>
                <span>{exercise.name}</span>
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
    </div>
  );
}
