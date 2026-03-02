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
//       const selectedWorkout = data.find(
//         (w: WorkoutApi) => w._id === params.workoutId,
//       );
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






// 'use client';

// import styles from './courseworkoutspage.module.css';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { getCourseWorkouts } from '@/services/courses/coursesApi';
// import Link from 'next/link';
// // import axios from 'axios';

// export default function CourseWorkoutsPage() {
//   const { id } = useParams();
//   const [workouts, setWorkouts] = useState([]);

//   useEffect(() => {
//     if (!id) return;

//     getCourseWorkouts(id as string)
//       .then(setWorkouts)
//       .catch(() => alert('Ошибка загрузки тренировок'));
//   }, [id]);

//   return (
//     // <>
//     <div className={styles.wrapper}>
//       <div className={styles.modal__selectWorkout}>
//         <h1 className={styles.selectWorkout__title}>Выберите тренировку</h1>
//         {workouts.map((workout: any) => (
//         <div key={workout._id}className={styles.selectWorkout__content}>
//           <div>
//             <div>
//               <div>
//                 <div>
//                   <h2>Утренняя практика{workout.name}</h2>
//                   <p>Йога на каждый день / 1 день </p>
//                 </div>
//               </div>
//             </div>
//             <div>ползунок</div>
//           </div>
//         </div>
//         <Link className={styles.selectWorkout__btn} href={`/fitness/workout/${id}/${workout._id}`}>Начать</Link>
//         {/* <button className={styles.selectWorkout__btn}>Начать</button> */}
//       </div>
//     </div>
//     // {/* </> */}
//     // <div> href="#"
//     //   <h1>Тренировки курса</h1>

//     //   {/* {workouts.map((workout: any) => (
//     //     <div key={workout._id}>
//     //       <h3>{workout.name}</h3>

//     //   <Link href={`/fitness/workout/${id}/${workout._id}`}>
//     //     Открыть урок
//     //   </Link>
//     //     </div>
//     //   ))} */}
//     // </div>
//   );
// }
