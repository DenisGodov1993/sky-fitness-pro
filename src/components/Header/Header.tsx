'use client';

import Image from 'next/image';
import styles from './header.module.css';
import Link from 'next/link';
import { useAppSelector } from '@/store/store';
import { useState } from 'react';

export default function Header() {
  const username = useAppSelector((state) => state.auth.username);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // // Логика для обработки клика "Выйти" (например, dispatch logout action)
  // const handleLogout = () => {
  //   // Здесь логика выхода из аккаунта (например, dispatch(logout()))
  //   closeModal();
  // };

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.svg"
          alt={'logo'}
        />
        <p className={styles.logo__text}>Онлайн-тренировки для занятий дома</p>
      </div>

      {username ? (
        <div className={styles.header__user} >
          {/* onClick={() => openModal()} */}
          <Image
            width={41.67}
            height={41.67}
            className={styles.header__userIcon}
            src="/img/icon/user.svg"
            alt={'иконка пользователя'}
          />
          <span className={styles.header__userName}>{username}</span>
        </div>
      ) : (
        <Link className={styles.header__btn}  href={'/auth/signin'}>
          Войти
        </Link>
      )}

      {/* Модальное окно */}
      {isModalOpen && (
        <div className={styles.modal}>
          {/* <button onClick={closeModal} className={styles.modal__close}>
            Закрыть
          </button>
          <button onClick={handleLogout} className={styles.modal__btn}>
            Выйти
          </button>
          <button onClick={closeModal} className={styles.modal__btn}>
            Мой профиль
          </button> */}
        </div>
      )}
    </div>
  );
}

// 'use client';

// import Image from 'next/image';
// import styles from './header.module.css';
// import Link from 'next/link';
// import { useAppSelector } from '@/store/store';

// export default function Header() {
//   const username = useAppSelector((state) => state.auth.username);

//   return (
//     <div className={styles.header}>
//       <div className={styles.header__logo}>
//         <Image
//           width={250}
//           height={170}
//           className={styles.logo__image}
//           src="/img/logo.svg"
//           alt={'logo'}
//         />
//         <p className={styles.logo__text}>Онлайн-тренировки для занятий дома</p>
//       </div>
//       {username ? (
//         <div className={styles.header__user}>
//           {/* onClick={() => openModal()} */}
//           <Image
//             width={41.67}
//             height={41.67}
//             className={styles.header__userIcon}
//             src="/img/icon/user.svg"
//             alt={'иконка пользователя'}
//           />
//           <span className={styles.header__userName}>{username}</span>
//         </div>
//       ) : (

//       <Link className={styles.header__btn} href="btn">
//         Войти
//       </Link>
//       )}
//     </div>
//   );
// }

// 'use client';

// import Image from 'next/image';
// import styles from './header.module.css';
// import Link from 'next/link';

// export default function Header() {
//   return (
//     <div className={styles.header}>
//       <div className={styles.header__logo}>
//         <Image
//           width={250}
//           height={170}
//           className={styles.logo__image}
//           src="/img/logo.svg"
//           alt={'logo'}
//         />
//         <p className={styles.logo__text}>Онлайн-тренировки для занятий дома</p>
//       </div>
//       <Link className={styles.header__btn} href="btn">
//         Войти
//       </Link>
//     </div>
//   );
// }

// import styles from './header.module.css';
// import Image from 'next/image';
// import Link from 'next/link';

// export default function Header() {
//   return (
//     <header id="header" className={styles.header}>
//       <div className={styles.container}>
//         <div className={styles.logo__wrapper}>
//           <Link href="/" className={styles.logo}>
//             <Image
//               width={220}
//               height={35}
//               className={styles.logo__image}
//               src="/logo.png"
//               alt="SkyFitnessPro logo"
//               priority
//             />
//           </Link>
//           <p className={styles.tagline}>Онлайн-тренировки для занятий дома</p>
//         </div>
//         <Link href="/login" className={styles.login__btn}>
//           Войти
//         </Link>
//       </div>
//     </header>
//   );
// }
