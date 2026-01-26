'use client';

import Image from 'next/image';
import styles from './navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
          // priority
        />
      </div>
    </nav>
  );
}
