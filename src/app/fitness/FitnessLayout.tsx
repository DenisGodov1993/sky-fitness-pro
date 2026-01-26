'use client';

import { ReactNode } from 'react';
import styles from './FitnessLayout.module.css';


interface FitnessLayoutProps {
  children: ReactNode;
}

export default function FitnessLayout({ children }: FitnessLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className="header"></header>

        <main className={styles.centerblock}></main>

        <footer className="footer"></footer>
      </div>
    </div>
  );
}
