'use client';

import styles from './courseworkoutspage.module.css';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  WorkoutApi,
  CourseProgressApi,
  WorkoutProgressApi,
} from '@/sharedTypes/sharedTypes';
import {
  getCourseWorkouts,
  getCourseProgress,
} from '@/services/courses/coursesApi';
import { showError } from '@/utils/toast';

export default function CourseWorkoutsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [workouts, setWorkouts] = useState<WorkoutApi[]>([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(
    null,
  );
  const [workoutProgress, setWorkoutProgress] = useState<
    Record<string, number[]>
  >({});

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const workoutsData = await getCourseWorkouts(id);
        setWorkouts(workoutsData);

        const progressData: CourseProgressApi = await getCourseProgress(id);
        const progressMap: Record<string, number[]> = {};

        progressData.workoutsProgress?.forEach((wp: WorkoutProgressApi) => {
          progressMap[wp.workoutId] = wp.progressData ?? [];
        });

        setWorkoutProgress(progressMap);
      } catch {
        showError('Ошибка загрузки тренировок');
      }
    };

    loadData();

    const handleFocus = () => loadData();
    window.addEventListener('focus', handleFocus);

    return () => window.removeEventListener('focus', handleFocus);
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
      <div className={styles.modal}>
        <h1 className={styles.title}>Выберите тренировку</h1>

        <div className={styles.list}>
          {workouts.map((workout) => {
            const completed = isCompleted(workout);
            const isSelected = selectedWorkoutId === workout._id;
            return (
              <div
                key={workout._id}
                className={`${styles.item} ${isSelected ? styles['item--selected'] : ''}`}
                onClick={() => setSelectedWorkoutId(workout._id)}
              >
                <div
                  className={`${styles.indicator} ${
                    completed ? styles.completed : ''
                  } ${isSelected ? styles['indicator--selected'] : ''}`}
                >
                  {completed && (
                    <Image
                      src="/img/icon/checkmark.svg"
                      alt="completed"
                      width={14}
                      height={14}
                      className={styles.checkmark}
                    />
                  )}
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