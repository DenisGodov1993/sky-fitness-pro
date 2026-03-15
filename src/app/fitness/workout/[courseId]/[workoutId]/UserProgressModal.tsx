'use client';

import { useState } from 'react';
import styles from './UserProgressModal.module.css';
import { useAppDispatch } from '@/store/store';
import Image from 'next/image';
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
import { showSuccess, showError } from '@/utils/toast';

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
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSave = async () => {
    try {
      await saveWorkoutProgress(courseId, workoutId, tempProgress);
      const updatedCourseProgress: CourseProgressApi =
        await getCourseProgress(courseId);
      const completedWorkouts =
        updatedCourseProgress.workoutsProgress?.filter(
          (wp: WorkoutProgressApi) => wp.workoutCompleted,
        ).length ?? 0;
      const totalWorkouts = updatedCourseProgress.workoutsProgress?.length ?? 0;
      dispatch(
        updateCourseProgress({
          courseId,
          completedWorkouts,
          totalWorkouts,
        }),
      );
      onProgressUpdate(tempProgress);
      showSuccess('Прогресс сохранён');
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
      showError('Ошибка сохранения прогресса');
    }
  };

  return (
    <div className={styles.overlay}>
      {isSuccess ? (
        <div className={styles.success}>
          <p className={styles.txt}>Ваш прогресс засчитан!</p>
          <div className={styles.check}>
            <Image
              width={68}
              height={68}
              src="/img/check.jpg"
              alt="галочка"
              // style={{ width: 'auto', height: 'auto' }}
              priority
            />
          </div>
        </div>
      ) : (
        <div className={styles.modalProgress}>
          <h2 className={styles.title}>Мой прогресс</h2>

          <div className={styles.content}>
            {workout.exercises.map((exercise, index) => (
              <div key={exercise._id} className={styles.exercise}>
                <p className={styles.question}>
                  Сколько раз вы сделали {exercise.name.toLowerCase()}?
                </p>
                <input
                  type="number"
                  min="0"
                  value={tempProgress[index] === 0 ? '' : tempProgress[index]}
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
                  className={`${styles.input} ${
                    tempProgress[index] === 0
                      ? styles.placeholderStyle
                      : styles.filled
                  }`}
                />
              </div>
            ))}
          </div>
          <button className={styles.saveButton} onClick={handleSave}>
            Сохранить
          </button>
        </div>
      )}
    </div>
  );
}