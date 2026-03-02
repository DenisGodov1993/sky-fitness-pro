'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { WorkoutApi } from '@/sharedTypes/sharedTypes';
import { useAppDispatch } from '@/store/store';
import {
  saveWorkoutProgress,
  getCourseProgress,
} from '@/services/courses/coursesApi';
import { setCourseProgress } from '@/store/features/progressSlice';
import { getWorkoutById } from '@/services/courses/coursesApi';

export default function WorkoutPage() {
  const { courseId, workoutId } = useParams<{
    courseId: string;
    workoutId: string;
  }>();

  const dispatch = useAppDispatch();

  const [workout, setWorkout] = useState<WorkoutApi | null>(null);
  const [progress, setProgress] = useState<number[]>([]);

  useEffect(() => {
    if (!workoutId) return;
     getWorkoutById(workoutId).then((data: WorkoutApi) => {
    setWorkout(data);
    setProgress(new Array(data.exercises.length).fill(0));
  });
}, [workoutId]);

  const handleSave = async () => {
    if (!courseId || !workoutId) return;

    await saveWorkoutProgress(courseId, workoutId, progress);

    const updatedProgress = await getCourseProgress(courseId);
    dispatch(setCourseProgress(updatedProgress));

    alert('Прогресс сохранён!');
  };

  if (!workout) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>{workout.name}</h1>

      <iframe src={workout.video} width="560" height="315" />

      {workout.exercises.map((exercise, index) => (
        <div key={exercise._id}>
          <p>{exercise.name}</p>
          <input
            type="number"
            value={progress[index]}
            onChange={(e) => {
              const updated = [...progress];
              updated[index] = Number(e.target.value);
              setProgress(updated);
            }}
          />
        </div>
      ))}

      <button onClick={handleSave}>Сохранить прогресс</button>
    </div>
  );
}

// 'use client';

// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '@/services/constants';

// export default function WorkoutPage() {
//   const { courseId, workoutId } = useParams();

//   const [workout, setWorkout] = useState<any>(null);
//   const [progress, setProgress] = useState<number[]>([]);

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/workouts/${workoutId}`)
//       .then((res) => {
//         setWorkout(res.data);
//         setProgress(new Array(res.data.exercises.length).fill(0));
//       });
//   }, [workoutId]);

//   const saveProgress = async () => {
//     await axios.patch(
//       `${BASE_URL}/courses/${courseId}/workouts/${workoutId}`,
//       { progressData: progress }
//     );
//     alert('Прогресс сохранён!');
//   };

//   if (!workout) return <div>Загрузка...</div>;

//   return (
//     <div>
//       <h1>{workout.name}</h1>

//       <iframe
//         width="560"
//         height="315"
//         src={workout.video}
//         title="video"
//       />

//       {workout.exercises.map((ex: any, index: number) => (
//         <div key={ex._id}>
//           <p>{ex.name}</p>
//           <input
//             type="number"
//             value={progress[index]}
//             onChange={(e) => {
//               const updated = [...progress];
//               updated[index] = Number(e.target.value);
//               setProgress(updated);
//             }}
//           />
//         </div>
//       ))}

//       <button onClick={saveProgress}>Сохранить прогресс</button>
//     </div>
//   );
// }
