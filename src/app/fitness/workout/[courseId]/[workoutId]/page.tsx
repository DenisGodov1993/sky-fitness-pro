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
import AboutWorkout from '@/components/AboutWorkout/AboutWorkout';

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
  const [progress, setProgress] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* =============================
     Загрузка курса
  ==============================*/

  useEffect(() => {
    if (!courseId) return;

    getCourseById(courseId).then((data: CourseApiType) => {
      setCourse(data);
    });
  }, [courseId]);

  /* =============================
     Загрузка тренировки
  ==============================*/

  useEffect(() => {
    if (!workoutId) return;

    getWorkoutById(workoutId).then((data: WorkoutApi) => {
      setWorkout(data);
      setProgress(new Array(data.exercises.length).fill(0));
    });
  }, [workoutId]);

  /* =============================
     Загрузка прогресса
  ==============================*/

  useEffect(() => {
    if (!courseId || !workoutId) return;

    getCourseProgress(courseId).then((data: CourseProgressApi) => {
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

      const workoutProgress = data.workoutsProgress?.find(
        (wp: WorkoutProgressApi) => wp.workoutId === workoutId,
      );

      if (workoutProgress) {
        setProgress(workoutProgress.progressData || []);
      }
    });
  }, [courseId, workoutId, dispatch]);

  const hasProgress = progress.some((value) => value > 0);

  const handleProgressUpdate = (newProgress: number[]) => {
    setProgress([...newProgress]);
  };

  if (!workout) return <div>Загрузка...</div>;

  return (
    <FitnessLayout>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* ===== Название курса ===== */}

        <h1 style={{ marginBottom: '20px' }}>{course?.nameRU}</h1>

        {/* ===== Видео ===== */}

        <div
          style={{
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '30px',
          }}
        >
          <iframe
            src={workout.video}
            width="100%"
            height="450"
            allowFullScreen
          />
        </div>

        {/* ===== Упражнения ===== */}

        <AboutWorkout
          workout={workout}
          progress={progress}
          setProgress={setProgress}
        />

        {/* ===== Кнопка ===== */}

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            marginTop: '25px',
            padding: '12px 22px',
            background: '#9BE22D',
            border: 'none',
            borderRadius: '20px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {hasProgress ? 'Обновить свой прогресс' : 'Заполнить свой прогресс'}
        </button>

        {/* ===== Модалка ===== */}

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
// import { useAppDispatch } from '@/store/store';
// import FitnessLayout from '../../../FitnessLayout';
// import { WorkoutInput } from '@/components/WorkoutInput/WorkoutInput';

// import {
//   getWorkoutById,
//   getCourseProgress,
//   getCourseById,
// } from '@/services/courses/coursesApi';

// import { updateCourseProgress } from '@/store/features/progressSlice';
// import UserProgressModal from './UserProgressModal';

// import {
//   WorkoutApi,
//   CourseProgressApi,
//   WorkoutProgressApi,
//   CourseApiType,
// } from '@/sharedTypes/sharedTypes';

// export default function WorkoutPage() {
//   const { courseId, workoutId } = useParams<{
//     courseId: string;
//     workoutId: string;
//   }>();

//   const dispatch = useAppDispatch();

//   const [course, setCourse] = useState<CourseApiType | null>(null);
//   const [workout, setWorkout] = useState<WorkoutApi | null>(null);
//   const [progress, setProgress] = useState<number[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   /* =============================
//      Загрузка курса
//   ==============================*/

//   useEffect(() => {
//     if (!courseId) return;

//     getCourseById(courseId).then((data: CourseApiType) => {
//       setCourse(data);
//     });
//   }, [courseId]);

//   /* =============================
//      Загрузка тренировки
//   ==============================*/

//   useEffect(() => {
//     if (!workoutId) return;

//     getWorkoutById(workoutId).then((data: WorkoutApi) => {
//       setWorkout(data);
//       setProgress(new Array(data.exercises.length).fill(0));
//     });
//   }, [workoutId]);

//   /* =============================
//      Загрузка прогресса
//   ==============================*/

//   useEffect(() => {
//     if (!courseId || !workoutId) return;

//     getCourseProgress(courseId).then((data: CourseProgressApi) => {
//       const completedWorkouts =
//         data.workoutsProgress?.filter(
//           (wp: WorkoutProgressApi) => wp.workoutCompleted,
//         ).length ?? 0;

//       const totalWorkouts = data.workoutsProgress?.length ?? 0;

//       dispatch(
//         updateCourseProgress({
//           courseId,
//           completedWorkouts,
//           totalWorkouts,
//         }),
//       );

//       const workoutProgress = data.workoutsProgress?.find(
//         (wp: WorkoutProgressApi) => wp.workoutId === workoutId,
//       );

//       if (workoutProgress) {
//         setProgress(workoutProgress.progressData || []);
//       }
//     });
//   }, [courseId, workoutId, dispatch]);

//   /* =============================
//      Процент выполнения упражнения
//   ==============================*/

//   const getExercisePercent = (index: number) => {
//     if (!workout) return 0;

//     const required = workout.exercises[index].quantity;
//     const done = progress[index] || 0;

//     if (required === 0) return 0;

//     const percent = (done / required) * 100;

//     return Math.min(100, Math.round(percent));
//   };

//   /* =============================
//      Проверка был ли прогресс
//   ==============================*/

//   const hasProgress = progress.some((value) => value > 0);

//   /* =============================
//      Обновление из модалки
//   ==============================*/

//   const handleProgressUpdate = (newProgress: number[]) => {
//     setProgress([...newProgress]);
//   };

//   if (!workout) return <div>Загрузка...</div>;

//   return (
//     <FitnessLayout>
//       <div style={{ maxWidth: '900px', margin: '0 auto' }}>
//         {/* ===== Название курса ===== */}

//         <h1 style={{ marginBottom: '20px' }}>{course?.nameRU}</h1>

//         {/* ===== Видео ===== */}

//         <div
//           style={{
//             width: '100%',
//             borderRadius: '12px',
//             overflow: 'hidden',
//             marginBottom: '30px',
//           }}
//         >
//           <iframe
//             src={workout.video}
//             width="100%"
//             height="450"
//             allowFullScreen
//           />
//         </div>

//         {/* ===== Контейнер упражнений ===== */}

//         <div
//           style={{
//             background: '#f8f9fa',
//             borderRadius: '12px',
//             padding: '25px',
//           }}
//         >
//           <h3 style={{ marginBottom: '20px' }}>Упражнения тренировки</h3>

//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: '1fr 1fr 1fr',
//               gap: '20px',
//             }}
//           >
//             {workout.exercises.map((exercise, index) => {
//               const percent = getExercisePercent(index);

//               return (
//                 <div key={exercise._id}>
//                   <WorkoutInput
//                     value={progress[index] ?? 0}
//                     max={exercise.quantity}
//                     onChange={(value) => {
//                       const updated = [...progress];
//                       updated[index] = value;
//                       setProgress(updated);
//                     }}
//                   />
//                   {/* Название + процент */}
//                   <div
//                     style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       marginBottom: '6px',
//                       fontSize: '14px',
//                     }}
//                   >
//                     <span>{exercise.name}</span>
//                     <span>{percent}%</span>
//                   </div>

//                   {/* Progress bar */}

//                   <div
//                     style={{
//                       width: '100%',
//                       height: '6px',
//                       background: '#e5e5e5',
//                       borderRadius: '4px',
//                       overflow: 'hidden',
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: `${percent}%`,
//                         height: '100%',
//                         background: '#28a745',
//                         transition: 'width 0.3s',
//                       }}
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* ===== Кнопка ===== */}

//           <button
//             onClick={() => setIsModalOpen(true)}
//             style={{
//               marginTop: '25px',
//               padding: '12px 22px',
//               background: '#9BE22D',
//               border: 'none',
//               borderRadius: '20px',
//               fontWeight: 600,
//               cursor: 'pointer',
//             }}
//           >
//             {hasProgress ? 'Обновить свой прогресс' : 'Заполнить свой прогресс'}
//           </button>
//         </div>

//         {/* ===== Модалка ===== */}

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
// import { useAppDispatch } from '@/store/store';
// import FitnessLayout from '../../../FitnessLayout';
// // import WorkoutInput from '@/components/WorkoutInput/WorkoutInput';

// import {
//   getWorkoutById,
//   getCourseProgress,
//   getCourseById,
// } from '@/services/courses/coursesApi';

// import { updateCourseProgress } from '@/store/features/progressSlice';
// import UserProgressModal from './UserProgressModal';

// import {
//   WorkoutApi,
//   CourseProgressApi,
//   WorkoutProgressApi,
//   CourseApiType,
// } from '@/sharedTypes/sharedTypes';

// export default function WorkoutPage() {
//   const { courseId, workoutId } = useParams<{
//     courseId: string;
//     workoutId: string;
//   }>();

//   const dispatch = useAppDispatch();

//   const [course, setCourse] = useState<CourseApiType | null>(null);
//   const [workout, setWorkout] = useState<WorkoutApi | null>(null);
//   const [progress, setProgress] = useState<number[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   /* =============================
//      Загрузка курса
//   ==============================*/

//   useEffect(() => {
//     if (!courseId) return;

//     getCourseById(courseId).then((data: CourseApiType) => {
//       setCourse(data);
//     });
//   }, [courseId]);

//   /* =============================
//      Загрузка тренировки
//   ==============================*/

//   useEffect(() => {
//     if (!workoutId) return;

//     getWorkoutById(workoutId).then((data: WorkoutApi) => {
//       setWorkout(data);
//       setProgress(new Array(data.exercises.length).fill(0));
//     });
//   }, [workoutId]);

//   /* =============================
//      Загрузка прогресса
//   ==============================*/

//   useEffect(() => {
//     if (!courseId || !workoutId) return;

//     getCourseProgress(courseId).then((data: CourseProgressApi) => {
//       const completedWorkouts =
//         data.workoutsProgress?.filter(
//           (wp: WorkoutProgressApi) => wp.workoutCompleted,
//         ).length ?? 0;

//       const totalWorkouts = data.workoutsProgress?.length ?? 0;

//       dispatch(
//         updateCourseProgress({
//           courseId,
//           completedWorkouts,
//           totalWorkouts,
//         }),
//       );

//       const workoutProgress = data.workoutsProgress?.find(
//         (wp: WorkoutProgressApi) => wp.workoutId === workoutId,
//       );

//       if (workoutProgress) {
//         setProgress(workoutProgress.progressData || []);
//       }
//     });
//   }, [courseId, workoutId, dispatch]);

//   /* =============================
//      Процент выполнения упражнения
//   ==============================*/

//   const getExercisePercent = (index: number) => {
//     if (!workout) return 0;

//     const required = workout.exercises[index].quantity;
//     const done = progress[index] || 0;

//     if (required === 0) return 0;

//     const percent = (done / required) * 100;

//     return Math.min(100, Math.round(percent));
//   };

//   /* =============================
//      Проверка был ли прогресс
//   ==============================*/

//   const hasProgress = progress.some((value) => value > 0);

//   /* =============================
//      Обновление из модалки
//   ==============================*/

//   const handleProgressUpdate = (newProgress: number[]) => {
//     setProgress([...newProgress]);
//   };

//   if (!workout) return <div>Загрузка...</div>;

//   return (
//     <FitnessLayout>
//       <div style={{ maxWidth: '900px', margin: '0 auto' }}>
//         {/* ===== Название курса ===== */}

//         <h1 style={{ marginBottom: '20px' }}>{course?.nameRU}</h1>

//         {/* ===== Видео ===== */}

//         <div
//           style={{
//             width: '100%',
//             borderRadius: '12px',
//             overflow: 'hidden',
//             marginBottom: '30px',
//           }}
//         >
//           <iframe
//             src={workout.video}
//             width="100%"
//             height="450"
//             allowFullScreen
//           />
//         </div>

//         {/* ===== Контейнер упражнений ===== */}

//         <div
//           style={{
//             background: '#f8f9fa',
//             borderRadius: '12px',
//             padding: '25px',
//           }}
//         >
//           <h3 style={{ marginBottom: '20px' }}>Упражнения тренировки</h3>

//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: '1fr 1fr 1fr',
//               gap: '20px',
//             }}
//           >
//             {workout.exercises.map((exercise, index) => {
//               const percent = getExercisePercent(index);

//               return (
//                 <div key={exercise._id}>
//                   {/* Название + процент */}

//                   <div
//                     style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       marginBottom: '6px',
//                       fontSize: '14px',
//                     }}
//                   >
//                     <span>{exercise.name}</span>
//                     <span>{percent}%</span>
//                   </div>

//                   {/* Progress bar */}

//                   <div
//                     style={{
//                       width: '100%',
//                       height: '6px',
//                       background: '#e5e5e5',
//                       borderRadius: '4px',
//                       overflow: 'hidden',
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: `${percent}%`,
//                         height: '100%',
//                         background: '#28a745',
//                         transition: 'width 0.3s',
//                       }}
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* ===== Кнопка ===== */}

//           <button
//             onClick={() => setIsModalOpen(true)}
//             style={{
//               marginTop: '25px',
//               padding: '12px 22px',
//               background: '#9BE22D',
//               border: 'none',
//               borderRadius: '20px',
//               fontWeight: 600,
//               cursor: 'pointer',
//             }}
//           >
//             {hasProgress ? 'Обновить свой прогресс' : 'Заполнить свой прогресс'}
//           </button>
//         </div>

//         {/* ===== Модалка ===== */}

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
// import { useAppDispatch } from '@/store/store';
// import FitnessLayout from '../../../FitnessLayout';
// import {
//   getWorkoutById,
//   getCourseProgress,
//   getCourseById,
// } from '@/services/courses/coursesApi';
// import { updateCourseProgress } from '@/store/features/progressSlice';
// import UserProgressModal from './UserProgressModal';
// import {
//   WorkoutApi,
//   CourseProgressApi,
//   WorkoutProgressApi,
//   CourseApiType,
// } from '@/sharedTypes/sharedTypes';

// export default function WorkoutPage() {
//   const { courseId, workoutId } = useParams<{
//     courseId: string;
//     workoutId: string;
//   }>();

//   const dispatch = useAppDispatch();

//   const [course, setCourse] = useState<CourseApiType | null>(null);
//   const [workout, setWorkout] = useState<WorkoutApi | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [progress, setProgress] = useState<number[]>([]);

//   // ====== Общий прогресс тренировки ======
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

//   const totalProgress = calculateTotalProgress();

//   // ====== Загружаем курс ======
//   useEffect(() => {
//     if (!courseId) return;

//     getCourseById(courseId).then((data: CourseApiType) => {
//       setCourse(data);
//     });
//   }, [courseId]);

//   // ====== Загружаем тренировку ======
//   useEffect(() => {
//     if (!workoutId) return;

//     getWorkoutById(workoutId).then((data: WorkoutApi) => {
//       setWorkout(data);
//       const initialProgress = new Array(data.exercises.length).fill(0);
//       setProgress(initialProgress);
//     });
//   }, [workoutId]);

//   // ====== Загружаем прогресс курса ======
//   useEffect(() => {
//     if (!courseId || !workoutId) return;

//     getCourseProgress(courseId).then((data: CourseProgressApi) => {
//       // 🔹 считаем завершённые тренировки для глобального профиля
//       const completedWorkouts =
//         data.workoutsProgress?.filter(
//           (wp: WorkoutProgressApi) => wp.workoutCompleted,
//         ).length ?? 0;

//       const totalWorkouts = data.workoutsProgress?.length ?? 0;

//       dispatch(
//         updateCourseProgress({
//           courseId,
//           completedWorkouts,
//           totalWorkouts,
//         }),
//       );

//       // 🔹 подставляем прогресс текущей тренировки
//       const workoutProgress = data.workoutsProgress?.find(
//         (wp: WorkoutProgressApi) => wp.workoutId === workoutId,
//       );

//       if (workoutProgress) {
//         setProgress(workoutProgress.progressData || []);
//       }
//     });
//   }, [courseId, workoutId, dispatch]);

//   // ====== Обновление из модалки ======
//   const handleProgressUpdate = (newProgress: number[]) => {
//     setProgress([...newProgress]);
//   };

//   if (!workout) return <div>Загрузка...</div>;

//   return (
//     <FitnessLayout>
//       <div>
//         <h1>{course?.nameRU}</h1>
//         <h1>{workout.name}</h1>

//         {/* ===== Прогресс бар ===== */}
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
//             />
//           </div>

//           <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
//             Выполнено: {totalProgress}%
//           </p>
//         </div>

//         <iframe src={workout.video} width="560" height="315" />

//         {/* ===== Список упражнений ===== */}
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
