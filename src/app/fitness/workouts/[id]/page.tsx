'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCourseWorkouts } from '@/services/courses/coursesApi';
import { WorkoutApi, ExerciseApi } from '@/sharedTypes/sharedTypes';

export default function WorkoutPage() {
  const params = useParams<{ courseId: string; workoutId: string }>();
  const [workout, setWorkout] = useState<WorkoutApi | null>(null);

  useEffect(() => {
    getCourseWorkouts(params.courseId).then((data) => {
      const selectedWorkout = data.find((w: WorkoutApi) => w._id === params.workoutId);
      if (selectedWorkout) setWorkout(selectedWorkout);
    });
  }, [params.courseId, params.workoutId]);

  if (!workout) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>{workout.name}</h2>
      <iframe
        src={workout.video}
        width="560"
        height="315"
        title={workout.name}
      />

      {workout.exercises.map((ex: ExerciseApi, i: number) => (
        <div key={ex._id}>
          <p>{ex.name}</p>
          <input type="number" defaultValue={ex.quantity} min={0} />
        </div>
      ))}
    </div>
  );
}

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { getCourseWorkouts } from '@/services/courses/coursesApi';
// import { WorkoutApi, ExerciseApi } from '@/sharedTypes/sharedTypes';

// export default function WorkoutPage() {
//   const params = useParams<{ courseId: string; workoutId: string }>();
//   const [workout, setWorkout] = useState<WorkoutApi | null>(null);

//   useEffect(() => {
//     getCourseWorkouts(params.courseId).then((data) => {
//       const selectedWorkout = data.find((w: WorkoutApi) => w._id === params.workoutId);
//       if (selectedWorkout) setWorkout(selectedWorkout);
//     });
//   }, [params.courseId, params.workoutId]);

//   if (!workout) return <div>Загрузка...</div>;

//   return (
//     <div>
//       <h2>{workout.name}</h2>
//       <iframe
//         src={workout.video}
//         width="560"
//         height="315"
//         title={workout.name}
//       />

//       {workout.exercises.map((ex: ExerciseApi, i: number) => (
//         <div key={ex._id}>
//           <p>{ex.name}</p>
//           <input type="number" defaultValue={ex.quantity} min={0} />
//         </div>
//       ))}
//     </div>
//   );
// }










