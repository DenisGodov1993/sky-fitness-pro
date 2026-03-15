'use client';

import { ReactNode } from 'react';
import styles from './FitnessLayout.module.css';
import Header from '@/components/Header/Header';
import FetchingCourses from '@/components/FetchingCourses/FetchingCourses';
import { useAuthInit } from '@/hooks/useAuthInit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <div className={styles.main}>
        <Header />
        <main className={styles.centerblock}>
          <FetchingCourses />
          {children}
        </main>
        <footer className="footer"></footer>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}