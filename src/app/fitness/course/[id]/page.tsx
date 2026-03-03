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
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(
    null,
  );

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
              <div className={styles.itemSubtitle}>Йога на каждый день</div>
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
