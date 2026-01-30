// import { ReactNode } from 'react';
// import styles from './layout.module.css';
// // import dynamic from 'next/dynamic';

// // Динамический импорт, чтобы избежать SSR-ошибок с localStorage
// // const Home = dynamic(() => import('@/app/fitness/main/page'), { ssr: false });

// interface AuthLayoutProps {
//   children: ReactNode;
// }

// export default function AuthLayout({ children }: AuthLayoutProps) {
//   return (
//     <div className={styles.wrapper}>
//       {/* Фон — главная страница */}
//       <div className={styles.background}>
//         <Home />
//       </div>

//       {/* Полупрозрачная подложка + модалка */}
//       <div className={styles.containerAuth}>
//         <div className={styles.modal__block}>
//           <form className={styles.modal__form}>{children}</form>
//         </div>
//       </div>
//     </div>
//   );
// }


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
// import MainPage from '@/app/fitness/main/page'; // 👈 подключаем главную

// interface AuthLayoutProps {
//   children: ReactNode;
// }

// export default function AuthLayout({ children }: AuthLayoutProps) {
//   return (
//     <div className={styles.authRoot}>
//       {/* ФОН — главная страница */}
//       <div className={styles.background}>
//         <MainPage />
//       </div>

//       {/* МОДАЛЬНОЕ ОКНО — авторизация/регистрация */}
//       <div className={styles.wrapper}>
//         <div className={styles.containerAuth}>
//           <div className={styles.modal__block}>
//             <form className={styles.modal__form}>{children}</form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { ReactNode } from 'react';
// import styles from './layout.module.css';

// interface AuthLayoutProps {
//   children: ReactNode;
// }

// export default function AuthLayout({ children }: AuthLayoutProps) {
//   return (
//     <>
//       <div className={styles.wrapper}>
//         <div className={styles.containerAuth}>
//           <div className={styles.modal__block}>
//             <form className={styles.modal__form}>{children}</form>
//           </div>
//         </div>
//       </div> 
//     </>
//   );
// }
