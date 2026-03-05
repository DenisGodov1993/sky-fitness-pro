'use client';

import { useState } from 'react';
import {
  WorkoutApi,
  CourseProgressApi,
  WorkoutProgressApi,
} from '@/sharedTypes/sharedTypes';

import {
  saveWorkoutProgress,
  getCourseProgress,
} from '@/services/courses/coursesApi';

import { useAppDispatch } from '@/store/store';
import { updateCourseProgress } from '@/store/features/progressSlice';

import styles from './UserProgressModal.module.css';

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

            <div className={styles.content}>
              {workout.exercises.map((exercise, index) => (
                <div key={exercise._id} className={styles.exercise}>
                  <p className={styles.question}>
                    Сколько раз вы сделали {exercise.name.toLowerCase()}?
                  </p>

                  <input
                    type="number"
                    min="0"
                    value={tempProgress[index] || ''}
                    onChange={(e) => {
                      const value =
                        e.target.value === ''
                          ? 0
                          : Number(e.target.value);

                      const updated = [...tempProgress];
                      updated[index] = Math.max(0, value);

                      setTempProgress(updated);
                    }}
                    className={styles.input}
                  />
                </div>
              ))}
            </div>

            <button
              className={styles.saveButton}
              onClick={handleSave}
            >
              Сохранить
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import {
//   WorkoutApi,
//   CourseProgressApi,
//   WorkoutProgressApi,
// } from '@/sharedTypes/sharedTypes';
// import {
//   saveWorkoutProgress,
//   getCourseProgress,
// } from '@/services/courses/coursesApi';
// import { useAppDispatch } from '@/store/store';
// import { updateCourseProgress } from '@/store/features/progressSlice';
// import { CSSProperties } from 'react';

// interface UserProgressModalProps {
//   workout: WorkoutApi;
//   courseId: string;
//   workoutId: string;
//   progress: number[];
//   onProgressUpdate: (newProgress: number[]) => void;
//   onClose: () => void;
// }

// export default function UserProgressModal({
//   workout,
//   courseId,
//   workoutId,
//   progress,
//   onProgressUpdate,
//   onClose,
// }: UserProgressModalProps) {
//   const dispatch = useAppDispatch();

//   const initialProgress = [...progress];
//   const [tempProgress, setTempProgress] = useState<number[]>(initialProgress);

//   const [showSuccess, setShowSuccess] = useState(false); // 👈 новое состояние

//   const handleSave = async () => {
//     if (tempProgress.length !== workout.exercises.length) {
//       alert('Ошибка длины массива');
//       return;
//     }

//     try {
//       await saveWorkoutProgress(courseId, workoutId, tempProgress);

//       const updatedCourseProgress: CourseProgressApi =
//         await getCourseProgress(courseId);

//       const completedWorkouts =
//         updatedCourseProgress.workoutsProgress?.filter(
//           (wp: WorkoutProgressApi) => wp.workoutCompleted,
//         ).length ?? 0;

//       const totalWorkouts = updatedCourseProgress.workoutsProgress?.length ?? 0;

//       dispatch(
//         updateCourseProgress({
//           courseId,
//           completedWorkouts,
//           totalWorkouts,
//         }),
//       );

//       onProgressUpdate(tempProgress);

//       // ✅ Показываем success-экран
//       setShowSuccess(true);

//       // ⏳ Закрываем через 3 секунды
//       setTimeout(() => {
//         onClose();
//       }, 3000);
//     } catch (error) {
//       console.error(error);
//       alert('Ошибка сохранения');
//     }
//   };

//   return (
//     <div style={overlayStyle}>
//       <div style={modalStyle}>
//         {showSuccess ? (
//           /* ===== Экран успеха ===== */
//           <div style={successContainer}>
//             <div style={checkmark}>✔</div>
//             <h2>Ваш прогресс засчитан!</h2>
//           </div>
//         ) : (
//           /* ===== Основная форма ===== */
//           <>
//             <h2>Введите прогресс</h2>

//             {workout.exercises.map((exercise, index) => (
//               <div key={exercise._id} style={exerciseStyle}>
//                 <p style={exerciseNameStyle}>{exercise.name}</p>

//                 <input
//                   type="number"
//                   min="0"
//                   value={tempProgress[index]}
//                   onChange={(e) => {
//                     const value =
//                       e.target.value === '' ? 0 : Number(e.target.value);

//                     const updated = [...tempProgress];
//                     updated[index] = Math.max(0, value);
//                     setTempProgress(updated);
//                   }}
//                   style={inputStyle}
//                 />
//               </div>
//             ))}

//             <div style={buttonContainerStyle}>
//               <button onClick={onClose} style={cancelButtonStyle}>
//                 Отмена
//               </button>

//               <button onClick={handleSave} style={saveButtonStyle}>
//                 Сохранить
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ===== Стили ===== */

// const overlayStyle: CSSProperties = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   backgroundColor: 'rgba(0,0,0,0.5)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   zIndex: 1000,
// };

// const modalStyle: CSSProperties = {
//   background: 'white',
//   padding: '30px',
//   borderRadius: '8px',
//   maxWidth: '500px',
//   width: '90%',
//   textAlign: 'center',
// };

// const successContainer: CSSProperties = {
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   gap: '20px',
// };

// const checkmark: CSSProperties = {
//   fontSize: '64px',
//   color: '#28a745',
// };

// const exerciseStyle: CSSProperties = {
//   marginBottom: '15px',
//   display: 'flex',
//   alignItems: 'center',
//   gap: '15px',
// };

// const exerciseNameStyle: CSSProperties = {
//   flex: 1,
//   margin: 0,
// };

// const inputStyle: CSSProperties = {
//   width: '80px',
//   padding: '8px',
//   border: '1px solid #ddd',
//   borderRadius: '4px',
//   textAlign: 'center',
// };

// const buttonContainerStyle: CSSProperties = {
//   display: 'flex',
//   gap: '10px',
//   marginTop: '20px',
//   justifyContent: 'flex-end',
// };

// const cancelButtonStyle: CSSProperties = {
//   padding: '10px 20px',
//   backgroundColor: '#6c757d',
//   color: 'white',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
// };

// const saveButtonStyle: CSSProperties = {
//   padding: '10px 20px',
//   backgroundColor: '#28a745',
//   color: 'white',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
// };
