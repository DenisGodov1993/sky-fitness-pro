'use client';

import FitnessLayout from '@/app/fitness/FitnessLayout';
import Centerblock from '@/components/Centerblock/Centerblock';
import { getCourses } from '@/services/courses/coursesApi';
import { setAllCourses } from '@/store/features/courseSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';

export default function Home() {
  // const { fetchError, fetchIsLoading, allCourses } = useAppSelector(
  //   (state) => state.courses,
  // );
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCourses().then((data) => {
      dispatch(setAllCourses(data));
    });
  }, []);

  return (
    <FitnessLayout>
      <Centerblock />
    </FitnessLayout>
  );
}

// 'use client';

// import FitnessLayout from '@/app/fitness/FitnessLayout';
// import Centerblock from '@/components/Centerblock/Centerblock';

// export default function Home() {
//   return (
//     <FitnessLayout>
//       <Centerblock  />
//     </FitnessLayout>
//   );
// }
