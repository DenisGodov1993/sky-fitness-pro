'use client';

import styles from './page.module.css';
import Header from '@/components/Header/Header';
import Centerblock from '@/components/Centerblock/Centerblock';
// import { useEffect } from 'react';
// import { getCourses } from '@/services/courses/coursesApi';

export default function Home() {
  // useEffect(() => {
  //   getCourses();
  // }, []);

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <Header />
        <Centerblock />
      </main>
    </div>
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
