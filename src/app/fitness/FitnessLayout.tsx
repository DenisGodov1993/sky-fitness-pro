'use client';

import { ReactNode } from 'react';
import styles from './FitnessLayout.module.css';
import Header from '@/components/Header/Header';
import FetchingCourses from '@/components/FetchingCourses/FetchingCourses';
import { useAuthInit } from '@/hooks/useAuthInit';
// import ProfilePage from '@/app/fitness/profile/page';

interface FitnessLayoutProps {
  children: ReactNode;
}

export default function FitnessLayout({ children }: FitnessLayoutProps) {
  const isChecked = useAuthInit();

  if (!isChecked) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.wrapper}>
        {/* Страница профиля — фон */}
            {/* <div className={styles.background}>
              <ProfilePage />
            </div> */}
      <div className={styles.main}>
        <Header />
        <main className={styles.centerblock}>
          <FetchingCourses />
          {children}
        </main>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
