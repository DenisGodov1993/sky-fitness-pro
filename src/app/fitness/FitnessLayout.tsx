'use client';

import { ReactNode } from 'react';
import styles from './FitnessLayout.module.css';
import Header from '@/components/Header/Header';
import FetchingCourses from '@/components/FetchingCourses/FetchingCourses';

interface FitnessLayoutProps {
  children: ReactNode;
}

export default function FitnessLayout({ children }: FitnessLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Header />

        <main className={styles.centerblock}>
          <>
            <FetchingCourses />
            {children}
          </>
        </main>

        <footer className="footer"></footer>
      </div>
    </div>
  );
}
