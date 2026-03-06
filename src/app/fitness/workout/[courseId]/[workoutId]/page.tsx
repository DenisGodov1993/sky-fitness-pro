'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import FitnessLayout from '../../../FitnessLayout';
import { updateCourseProgress } from '@/store/features/progressSlice';
import styles from './workoutpage.module.css';
import UserProgressModal from './UserProgressModal';
import AboutWorkout from '@/components/AboutWorkout/AboutWorkout';
import {
  getWorkoutById,
  getCourseProgress,
  getCourseById,
} from '@/services/courses/coursesApi';
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

  // Загрузка курса
  useEffect(() => {
    if (!courseId) return;

    getCourseById(courseId).then((data: CourseApiType) => {
      setCourse(data);
    });
  }, [courseId]);

  // Загрузка тренировки
  useEffect(() => {
    if (!workoutId) return;

    getWorkoutById(workoutId).then((data: WorkoutApi) => {
      setWorkout(data);
      setProgress(new Array(data.exercises.length).fill(0));
    });
  }, [workoutId]);

  // Загрузка прогресса
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

  const handleProgressUpdate = (newProgress: number[]) => {
    setProgress([...newProgress]);
  };

  if (!workout) return <div>Загрузка...</div>;

  return (
    <FitnessLayout>
      <div className={styles.container}>
        {/* Название курса */}
        <div className={styles.courseTitle}>
          <h1 className={styles.courseTitle__text}>{course?.nameRU}</h1>
        </div>

        {/* Видео */}
        <div className={styles.videoContainer}>
          <iframe
            src={workout.video}
            width="100%"
            height="639"
            allowFullScreen
          />
        </div>

        {/* Упражнения */}
        <AboutWorkout
          workout={workout}
          progress={progress}
          setProgress={setProgress}
          onProgressButtonClick={() => setIsModalOpen(true)}
        />

        {/* Модалка */}
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
// import { updateCourseProgress } from '@/store/features/progressSlice';
// import styles from './workoutpage.module.css';
// import UserProgressModal from './UserProgressModal';
// import AboutWorkout from '@/components/AboutWorkout/AboutWorkout';
// import {
//   getWorkoutById,
//   getCourseProgress,
//   getCourseById,
// } from '@/services/courses/coursesApi';
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

//   // Загрузка курса
//   useEffect(() => {
//     if (!courseId) return;

//     getCourseById(courseId).then((data: CourseApiType) => {
//       setCourse(data);
//     });
//   }, [courseId]);

//   // Загрузка тренировки
//   useEffect(() => {
//     if (!workoutId) return;

//     getWorkoutById(workoutId).then((data: WorkoutApi) => {
//       setWorkout(data);
//       setProgress(new Array(data.exercises.length).fill(0));
//     });
//   }, [workoutId]);

//   // Загрузка прогресса
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

//   // const hasProgress = progress.some((value) => value > 0);

//   const handleProgressUpdate = (newProgress: number[]) => {
//     setProgress([...newProgress]);
//   };

//   if (!workout) return <div>Загрузка...</div>;

//   return (
//     <FitnessLayout>
//       <div className={styles.container}>
//         {/* Название курса */}
//         <div className={styles.courseTitle}>
//           <h1 className={styles.courseTitle__text}>{course?.nameRU}</h1>
//         </div>
//         {/* Видео */}
//         <div className={styles.videoContainer}>
//           <iframe
//             src={workout.video}
//             width="100%"
//             height="450"
//             allowFullScreen
//           />
//         </div>
//         {/* Упражнения */}
//         <AboutWorkout
//           workout={workout}
//           progress={progress}
//           setProgress={setProgress}
//           onProgressButtonClick={() => setIsModalOpen(true)}
//         />

//         {/* <button
//           onClick={() => setIsModalOpen(true)}
//           className={styles.progressButton}
//         >
//           {hasProgress ? 'Обновить свой прогресс' : 'Заполнить свой прогресс'}
//         </button> */}

//         {/* Модалка */}
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
// import { updateCourseProgress } from '@/store/features/progressSlice';
// import UserProgressModal from './UserProgressModal';
// import AboutWorkout from '@/components/AboutWorkout/AboutWorkout';
// import {
//   getWorkoutById,
//   getCourseProgress,
//   getCourseById,
// } from '@/services/courses/coursesApi';
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

//   // Загрузка курса
//   useEffect(() => {
//     if (!courseId) return;

//     getCourseById(courseId).then((data: CourseApiType) => {
//       setCourse(data);
//     });
//   }, [courseId]);

//   // Загрузка тренировки
//   useEffect(() => {
//     if (!workoutId) return;

//     getWorkoutById(workoutId).then((data: WorkoutApi) => {
//       setWorkout(data);
//       setProgress(new Array(data.exercises.length).fill(0));
//     });
//   }, [workoutId]);

//   // Загрузка прогресса
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

//   const hasProgress = progress.some((value) => value > 0);

//   const handleProgressUpdate = (newProgress: number[]) => {
//     setProgress([...newProgress]);
//   };

//   if (!workout) return <div>Загрузка...</div>;

//   return (
//     <FitnessLayout>
//       <div style={{ maxWidth: '900px', margin: '0 auto' }}>
//         {/* Название курса */}
//         <h1 style={{ marginBottom: '20px' }}>{course?.nameRU}</h1>

//         {/* Видео */}
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

//         {/* Упражнения */}
//         <AboutWorkout
//           workout={workout}
//           progress={progress}
//           setProgress={setProgress}
//         />

//         <button
//           onClick={() => setIsModalOpen(true)}
//           style={{
//             marginTop: '25px',
//             padding: '12px 22px',
//             background: '#9BE22D',
//             border: 'none',
//             borderRadius: '20px',
//             fontWeight: 600,
//             cursor: 'pointer',
//           }}
//         >
//           {hasProgress ? 'Обновить свой прогресс' : 'Заполнить свой прогресс'}
//         </button>

//         {/* Модалка */}
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
