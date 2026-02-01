'use client';

import FitnessLayout from '@/app/fitness/FitnessLayout';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';

export default function Home() {
  const { fetchError, fetchIsLoading, allCourses } = useAppSelector(
    (state) => state.courses,
  );

  return (
    <FitnessLayout>
      <Centerblock
        // courses={courses}
        // courses={allCourses}
        // isLoading={fetchIsLoading}
        // errorRes={fetchError}
        // itemName="Фитнес курсы"
      />
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
