'use client';

import { useState } from 'react';
import styles from './UserProgressModal.module.css';
import { useAppDispatch } from '@/store/store';
import { updateCourseProgress } from '@/store/features/progressSlice';
import {
  WorkoutApi,
  CourseProgressApi,
  WorkoutProgressApi,
} from '@/sharedTypes/sharedTypes';
import {
  saveWorkoutProgress,
  getCourseProgress,
} from '@/services/courses/coursesApi';

interface UserProgressModalProps {
  workout: WorkoutApi;
  courseId: string;
  workoutId: string;
  progress: number[];
  onProgressUpdate: (newProgress: number[]) => void;
  onClose: () => void;
}

export default function UserProgressModal({
  workout,
  courseId,
  workoutId,
  progress,
  onProgressUpdate,
  onClose,
}: UserProgressModalProps) {
  const dispatch = useAppDispatch();

  const [tempProgress, setTempProgress] = useState<number[]>([...progress]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    try {
      await saveWorkoutProgress(courseId, workoutId, tempProgress);

      const updatedCourseProgress: CourseProgressApi =
        await getCourseProgress(courseId);

      const completedWorkouts =
        updatedCourseProgress.workoutsProgress?.filter(
          (wp: WorkoutProgressApi) => wp.workoutCompleted,
        ).length ?? 0;

      const totalWorkouts =
        updatedCourseProgress.workoutsProgress?.length ?? 0;

      dispatch(
        updateCourseProgress({
          courseId,
          completedWorkouts,
          totalWorkouts,
        }),
      );

      onProgressUpdate(tempProgress);

      setShowSuccess(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      alert('Ошибка сохранения');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {showSuccess ? (
          <div className={styles.success}>
            <div className={styles.check}>✔</div>
            <p>Ваш прогресс засчитан!</p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Мой прогресс</h2>

            {/* scroll container */}
            <div className={styles.content}>
              {workout.exercises.map((exercise, index) => (
                <div key={exercise._id} className={styles.exercise}>
                  <p className={styles.question}>
                    Сколько раз вы сделали {exercise.name.toLowerCase()}?
                  </p>

                  <input
                    type="number"
                    min="0"
                    value={tempProgress[index] ?? ''}
                    placeholder="0"   
                    onChange={(e) => {
                      const value =
                        e.target.value === ''
                          ? 0
                          : Math.max(0, Number(e.target.value));

                      const updated = [...tempProgress];
                      updated[index] = value;

                      setTempProgress(updated);
                    }}
                    className={styles.input}
                  />
                </div>
              ))}
            </div>

            <button className={styles.saveButton} onClick={handleSave}>
              Сохранить
            </button>
          </>
        )}
      </div>
    </div>
  );
}