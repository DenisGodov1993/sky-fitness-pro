import { ReactNode } from 'react';
import styles from './layout.module.css';
import Home from '@/app/fitness/main/page';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.wrapper}>
      {/* Главная страница — фон */}
      <div className={styles.background}>
        <Home />
      </div>

      {/* Затемнение + модалка */}
      <div className={styles.containerAuth}>
        <div className={styles.modal__block}>
          <form className={styles.modal__form}>{children}</form>
        </div>
      </div>
    </div>
  );
}

// import { ReactNode } from 'react';
// import styles from './layout.module.css';
// import Home from '@/app/fitness/main/page';

// interface AuthLayoutProps {
//   children: ReactNode;
// }

// export default function AuthLayout({ children }: AuthLayoutProps) {
//   return (
//     <div className={styles.wrapper}>
//       {/* Главная страница — фон */}
//       <div className={styles.background}>
//         <Home />
//       </div>

//       {/* Затемнение + модалка */}
//       <div className={styles.containerAuth}>
//         <div className={styles.modal__block}>
//           <form className={styles.modal__form}>{children}</form>
//         </div>
//       </div>
//     </div>
//   );
// }
