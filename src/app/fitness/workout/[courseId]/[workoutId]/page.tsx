'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import FitnessLayout from '../../../FitnessLayout';
import {
  getWorkoutById,
  getCourseProgress,
  getCourseById,
} from '@/services/courses/coursesApi';
import { updateCourseProgress } from '@/store/features/progressSlice';
import UserProgressModal from './UserProgressModal';
import {
  WorkoutApi,
  CourseProgressApi,
  WorkoutProgressApi,
  CourseApiType,
} from '@/sharedTypes/sharedTypes';

export default function WorkoutPage() {
  const { courseId, workoutId } = useParams<{
    courseId: string;
    workoutId: string;
  }>();

  const dispatch = useAppDispatch();

  const [course, setCourse] = useState<CourseApiType | null>(null);
  const [workout, setWorkout] = useState<WorkoutApi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState<number[]>([]);

  // ====== Общий прогресс тренировки ======
  const calculateTotalProgress = (): number => {
    if (!workout || !progress.length) return 0;

    const totalRequiredReps = workout.exercises.reduce(
      (sum, exercise) => sum + exercise.quantity,
      0,
    );

    const totalCompletedReps = progress.reduce((sum, value) => sum + value, 0);

    if (totalRequiredReps === 0) return 0;

    const percent = (totalCompletedReps / totalRequiredReps) * 100;

    return Math.min(100, Math.round(percent));
  };

  const totalProgress = calculateTotalProgress();

  // ====== Загружаем курс ======
  useEffect(() => {
    if (!courseId) return;

    getCourseById(courseId).then((data: CourseApiType) => {
      setCourse(data);
    });
  }, [courseId]);

  // ====== Загружаем тренировку ======
  useEffect(() => {
    if (!workoutId) return;

    getWorkoutById(workoutId).then((data: WorkoutApi) => {
      setWorkout(data);
      const initialProgress = new Array(data.exercises.length).fill(0);
      setProgress(initialProgress);
    });
  }, [workoutId]);

  // ====== Загружаем прогресс курса ======
  useEffect(() => {
    if (!courseId || !workoutId) return;

    getCourseProgress(courseId).then((data: CourseProgressApi) => {
      // 🔹 считаем завершённые тренировки для глобального профиля
      const completedWorkouts =
        data.workoutsProgress?.filter(
          (wp: WorkoutProgressApi) => wp.workoutCompleted,
        ).length ?? 0;

      const totalWorkouts = data.workoutsProgress?.length ?? 0;

      dispatch(
        updateCourseProgress({
          courseId,
          completedWorkouts,
          totalWorkouts,
        }),
      );

      // 🔹 подставляем прогресс текущей тренировки
      const workoutProgress = data.workoutsProgress?.find(
        (wp: WorkoutProgressApi) => wp.workoutId === workoutId,
      );

      if (workoutProgress) {
        setProgress(workoutProgress.progressData || []);
      }
    });
  }, [courseId, workoutId, dispatch]);

  // ====== Обновление из модалки ======
  const handleProgressUpdate = (newProgress: number[]) => {
    setProgress([...newProgress]);
  };

  if (!workout) return <div>Загрузка...</div>;

  return (
    <FitnessLayout>
      <div>
        <h1>{course?.nameRU}</h1>
        <h1>{workout.name}</h1>

        {/* ===== Прогресс бар ===== */}
        <div
          style={{
            margin: '20px 0',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h3>Прогресс выполнения тренировки</h3>

          <div
            style={{
              width: '100%',
              height: '20px',
              backgroundColor: '#e9ecef',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${totalProgress}%`,
                height: '100%',
                backgroundColor:
                  totalProgress >= 70
                    ? '#28a745'
                    : totalProgress >= 40
                      ? '#ffc107'
                      : '#dc3545',
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
            Выполнено: {totalProgress}%
          </p>
        </div>

        <iframe src={workout.video} width="560" height="315" />

        {/* ===== Список упражнений ===== */}
        <div style={{ margin: '30px 0' }}>
          <h3>Задания тренировки:</h3>

          {workout.exercises.map((exercise, index) => (
            <div
              key={exercise._id}
              style={{
                marginBottom: '15px',
                padding: '15px',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>
                  <strong>{exercise.name}</strong>
                </span>

                <span
                  style={{
                    padding: '5px 10px',
                    borderRadius: '12px',
                    backgroundColor:
                      progress[index] > 0 ? '#d4edda' : '#f8d7da',
                    color: progress[index] > 0 ? '#155724' : '#721c24',
                  }}
                >
                  {progress[index] > 0
                    ? `${progress[index]} повторений`
                    : 'Не выполнено'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Заполнить прогресс
        </button>

        {isModalOpen && (
          <UserProgressModal
            workout={workout}
            courseId={courseId}
            workoutId={workoutId}
            progress={progress}
            onProgressUpdate={handleProgressUpdate}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </FitnessLayout>
  );
}

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import FitnessLayout from '../../../FitnessLayout';
// import {
//   getWorkoutById,
//   getCourseProgress,
// } from '@/services/courses/coursesApi';
// import { setCourseProgress } from '@/store/features/progressSlice';
// import UserProgressModal from './UserProgressModal';
// import {
//   WorkoutApi,
//   CourseProgressApi,
//   WorkoutProgressApi,
//   CourseApiType,
// } from '@/sharedTypes/sharedTypes';
// import { getCourseById } from '@/services/courses/coursesApi';

// export default function WorkoutPage() {
//   const [course, setCourse] = useState<CourseApiType | null>(null);
//   const { courseId, workoutId } = useParams<{
//     courseId: string;
//     workoutId: string;
//     // course: CourseApiType;
//   }>();

//   const dispatch = useAppDispatch();

//   const [workout, setWorkout] = useState<WorkoutApi | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [progress, setProgress] = useState<number[]>([]); // прогресс по каждому упражнению

//   // Вычисляем общий прогресс в процентах (без использования состояния)
//   // const calculateTotalProgress = (): number => {
//   //   if (!workout || !progress.length) return 0;

//   //   const totalExercises = workout.exercises.length;
//   //   const completedExercises = progress.filter(p => p > 0).length;

//   //   return totalExercises > 0
//   //     ? Math.round((completedExercises / totalExercises) * 100)
//   //     : 0;
//   // };

//   const calculateTotalProgress = (): number => {
//     if (!workout || !progress.length) return 0;

//     const totalRequiredReps = workout.exercises.reduce(
//       (sum, exercise) => sum + exercise.quantity,
//       0,
//     );

//     const totalCompletedReps = progress.reduce((sum, value) => sum + value, 0);

//     if (totalRequiredReps === 0) return 0;

//     const percent = (totalCompletedReps / totalRequiredReps) * 100;

//     return Math.min(100, Math.round(percent));
//   };

//   const totalProgress = calculateTotalProgress(); // вычисляем при каждом рендере
//   useEffect(() => {
//     if (!courseId) return;

//     getCourseById(courseId).then((data: CourseApiType) => {
//       setCourse(data);
//     });
//   }, [courseId]);
//   // Загружаем тренировку
//   useEffect(() => {
//     if (!workoutId) return;

//     getWorkoutById(workoutId).then((data: WorkoutApi) => {
//       setWorkout(data);
//       // Инициализируем прогресс: массив нулей для каждого упражнения
//       const initialProgress = new Array(data.exercises.length).fill(0);
//       setProgress(initialProgress);
//     });
//   }, [workoutId]);

//   // Загружаем прогресс курса ОДИН раз
//   useEffect(() => {
//     if (!courseId) return;

//     getCourseProgress(courseId).then((data: CourseProgressApi) => {
//       // dispatch(setCourseProgress(data));
//       dispatch(
//         updateCourseProgress({
//           courseId,
//           completedWorkouts: newCompleted,
//           totalWorkouts,
//         }),
//       );
//       // Ищем прогресс для текущей тренировки
//       const workoutProgress = data.workoutsProgress?.find(
//         (wp: WorkoutProgressApi) => wp.workoutId === workoutId,
//       );
//       if (workoutProgress) {
//         setProgress(workoutProgress.progressData || []);
//       }
//     });
//   }, [courseId, dispatch, workoutId]);

//   // Обработчик обновления прогресса из модального окна
//   const handleProgressUpdate = (newProgress: number[]) => {
//     setProgress([...newProgress]);
//   };

//   if (!workout) return <div>Загрузка...</div>;

//   return (
//     <FitnessLayout>
//       <div>
//         {/* <h1>{course.nameRU}</h1> */}
//         <h1>{course?.nameRU}</h1>
//         <h1>{workout.name}</h1>

//         {/* Отображение общего прогресса */}
//         <div
//           style={{
//             margin: '20px 0',
//             padding: '15px',
//             backgroundColor: '#f8f9fa',
//             borderRadius: '8px',
//             textAlign: 'center',
//           }}
//         >
//           <h3>Прогресс выполнения тренировки</h3>
//           <div
//             style={{
//               width: '100%',
//               height: '20px',
//               backgroundColor: '#e9ecef',
//               borderRadius: '10px',
//               overflow: 'hidden',
//             }}
//           >
//             <div
//               style={{
//                 width: `${totalProgress}%`,
//                 height: '100%',
//                 backgroundColor:
//                   totalProgress >= 70
//                     ? '#28a745'
//                     : totalProgress >= 40
//                       ? '#ffc107'
//                       : '#dc3545',
//                 transition: 'width 0.3s ease',
//               }}
//             ></div>
//           </div>
//           <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
//             Выполнено: {totalProgress}%
//           </p>
//         </div>

//         <iframe src={workout.video} width="560" height="315" />

//         {/* Список упражнений с текущим прогрессом */}
//         <div style={{ margin: '30px 0' }}>
//           <h3>Задания тренировки:</h3>
//           {workout.exercises.map((exercise, index) => (
//             <div
//               key={exercise._id}
//               style={{
//                 marginBottom: '15px',
//                 padding: '15px',
//                 border: '1px solid #dee2e6',
//                 borderRadius: '8px',
//               }}
//             >
//               <div
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                 }}
//               >
//                 <span>
//                   <strong>{exercise.name}</strong>
//                 </span>
//                 <span
//                   style={{
//                     padding: '5px 10px',
//                     borderRadius: '12px',
//                     backgroundColor:
//                       progress[index] > 0 ? '#d4edda' : '#f8d7da',
//                     color: progress[index] > 0 ? '#155724' : '#721c24',
//                   }}
//                 >
//                   {progress[index] > 0
//                     ? `${progress[index]} повторений`
//                     : 'Не выполнено'}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={() => setIsModalOpen(true)}
//           style={{
//             marginTop: '20px',
//             padding: '10px 20px',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//           }}
//         >
//           Заполнить прогресс
//         </button>

//         {isModalOpen && (
//           <UserProgressModal
//             workout={workout}
//             courseId={courseId}
//             workoutId={workoutId}
//             progress={progress}
//             onProgressUpdate={handleProgressUpdate}
//             onClose={() => setIsModalOpen(false)}
//           />
//         )}
//       </div>
//     </FitnessLayout>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import FitnessLayout from '../../../FitnessLayout';
// import {
//   getWorkoutById,
//   getCourseProgress,
// } from '@/services/courses/coursesApi';
// import { setCourseProgress } from '@/store/features/progressSlice';
// import UserProgressModal from './UserProgressModal';
// import { WorkoutApi, CourseProgressApi, WorkoutProgressApi, CourseApiType } from '@/sharedTypes/sharedTypes';
// import { getCourseById } from '@/services/courses/coursesApi';

// export default function WorkoutPage() {
//   const [course, setCourse] = useState<CourseApiType | null>(null);
//   const { courseId, workoutId } = useParams<{
//     courseId: string;
//     workoutId: string;
//     // course: CourseApiType;
//   }>();

//   const dispatch = useAppDispatch();

//   const [workout, setWorkout] = useState<WorkoutApi | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [progress, setProgress] = useState<number[]>([]); // прогресс по каждому упражнению

//   // Вычисляем общий прогресс в процентах (без использования состояния)
//   // const calculateTotalProgress = (): number => {
//   //   if (!workout || !progress.length) return 0;

//   //   const totalExercises = workout.exercises.length;
//   //   const completedExercises = progress.filter(p => p > 0).length;

//   //   return totalExercises > 0
//   //     ? Math.round((completedExercises / totalExercises) * 100)
//   //     : 0;
//   // };

//   const calculateTotalProgress = (): number => {
//   if (!workout || !progress.length) return 0;

//   const totalRequiredReps = workout.exercises.reduce(
//     (sum, exercise) => sum + exercise.quantity,
//     0
//   );

//   const totalCompletedReps = progress.reduce(
//     (sum, value) => sum + value,
//     0
//   );

//   if (totalRequiredReps === 0) return 0;

//   const percent = (totalCompletedReps / totalRequiredReps) * 100;

//   return Math.min(100, Math.round(percent));
// };

//   const totalProgress = calculateTotalProgress(); // вычисляем при каждом рендере
// useEffect(() => {
//   if (!courseId) return;

//   getCourseById(courseId).then((data: CourseApiType) => {
//     setCourse(data);
//   });
// }, [courseId]);
//   // Загружаем тренировку
//   useEffect(() => {
//     if (!workoutId) return;

//     getWorkoutById(workoutId).then((data: WorkoutApi) => {
//       setWorkout(data);
//       // Инициализируем прогресс: массив нулей для каждого упражнения
//       const initialProgress = new Array(data.exercises.length).fill(0);
//       setProgress(initialProgress);
//     });
//   }, [workoutId]);

//   // Загружаем прогресс курса ОДИН раз
//   useEffect(() => {
//     if (!courseId) return;

//     getCourseProgress(courseId).then((data: CourseProgressApi) => {
//       dispatch(setCourseProgress(data));
//       // Ищем прогресс для текущей тренировки
//       const workoutProgress = data.workoutsProgress?.find(
//         (wp: WorkoutProgressApi) => wp.workoutId === workoutId
//       );
//       if (workoutProgress) {
//         setProgress(workoutProgress.progressData || []);
//       }
//     });
//   }, [courseId, dispatch, workoutId]);

//   // Обработчик обновления прогресса из модального окна
//   const handleProgressUpdate = (newProgress: number[]) => {
//     setProgress([...newProgress]);
//   };

//   if (!workout) return <div>Загрузка...</div>;

//   return (
//     <FitnessLayout>
//       <div>
//         {/* <h1>{course.nameRU}</h1> */}
//         <h1>{course?.nameRU}</h1>
//         <h1>{workout.name}</h1>

//         {/* Отображение общего прогресса */}
//         <div style={{
//           margin: '20px 0',
//           padding: '15px',
//           backgroundColor: '#f8f9fa',
//           borderRadius: '8px',
//           textAlign: 'center'
//         }}>
//           <h3>Прогресс выполнения тренировки</h3>
//           <div style={{
//             width: '100%',
//             height: '20px',
//             backgroundColor: '#e9ecef',
//             borderRadius: '10px',
//             overflow: 'hidden'
//           }}>
//             <div style={{
//               width: `${totalProgress}%`,
//               height: '100%',
//               backgroundColor: totalProgress >= 70 ? '#28a745' :
//                            totalProgress >= 40 ? '#ffc107' : '#dc3545',
//               transition: 'width 0.3s ease'
//             }}></div>
//           </div>
//           <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
//             Выполнено: {totalProgress}%
//           </p>
//         </div>

//         <iframe src={workout.video} width="560" height="315" />

//         {/* Список упражнений с текущим прогрессом */}
//         <div style={{ margin: '30px 0' }}>
//           <h3>Задания тренировки:</h3>
//           {workout.exercises.map((exercise, index) => (
//             <div key={exercise._id} style={{
//               marginBottom: '15px',
//               padding: '15px',
//               border: '1px solid #dee2e6',
//               borderRadius: '8px'
//             }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <span><strong>{exercise.name}</strong></span>
//                 <span style={{
//                   padding: '5px 10px',
//                   borderRadius: '12px',
//                   backgroundColor: progress[index] > 0 ? '#d4edda' : '#f8d7da',
//                   color: progress[index] > 0 ? '#155724' : '#721c24'
//                 }}>
//                   {progress[index] > 0 ? `${progress[index]} повторений` : 'Не выполнено'}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button onClick={() => setIsModalOpen(true)} style={{
//           marginTop: '20px',
//           padding: '10px 20px',
//           backgroundColor: '#007bff',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer'
//         }}>
//           Заполнить прогресс
//         </button>

//         {isModalOpen && (
//           <UserProgressModal
//             workout={workout}
//             courseId={courseId}
//             workoutId={workoutId}
//             progress={progress}
//             onProgressUpdate={handleProgressUpdate}
//             onClose={() => setIsModalOpen(false)}
//           />
//         )}
//       </div>
//     </FitnessLayout>
//   );
// }
