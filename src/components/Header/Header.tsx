// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { useEffect, useRef, useState } from 'react';
// import styles from './header.module.css';
// import { clearUser } from '@/store/features/authSlice';
// import { useRouter } from 'next/navigation';

// export default function Header() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const email = useAppSelector((state) => state.auth.username);

//   // Преобразуем email в "имя пользователя"
//   //  Имя пользователя должно приходить с бэкенда, сейчас используется email
//   const displayName = email
//     ? email.split('@')[0][0].toUpperCase() + email.split('@')[0].slice(1)
//     : '';

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   // переключает состояние меню (открыть/закрыть)
//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };
//   // закрывает меню
//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   // закрытие по клику вне меню
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
//         closeMenu();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // // Переход на профиль
//   // const goToProfile = () => {
//   //   router.push('/myProfile');
//   //   closeMenu();
//   // };
//   // Выход из аккаунта
//   const logout = () => {
//     dispatch(clearUser());
//     router.push('/auth/signin');
//     closeMenu();
//   };

//   return (
//     <header className={styles.header}>
//       <div className={styles.header__logo}>
//         <Image
//           width={250}
//           height={170}
//           className={styles.logo__image}
//           src="/img/logo.svg"
//           alt="logo"
//         />
//         <p className={styles.logo__text}>Онлайн-тренировки для занятий дома</p>
//       </div>

//       {/* Пользователь / Войти */}
//       {typeof window !== 'undefined' && email ? (
//         <div ref={menuRef} className={styles.header__userWrapper}>
//           <button
//             type="button"
//             className={styles.header__user}
//             onClick={toggleMenu}
//           >
//             <Image
//               width={42}
//               height={42}
//               className={styles.header__userIcon}
//               src="/img/icon/user.svg"
//               alt="иконка пользователя"
//             />
//             <span className={styles.header__userName}>{displayName}</span>
//             <span
//               className={`${styles.header__arrow} ${
//                 isMenuOpen ? styles.header__arrow_open : ''
//               }`}
//             />
//           </button>

//           {isMenuOpen && (
//             <div className={styles.userMenu}>
//               <div className={styles.userMenu__info}>
//                 <p className={styles.info__titleName}>{displayName}</p>
//                 <p className={styles.info__mail}>{email}</p>
//               </div>
//               <div className={styles.userMenu__btn}>
//                  <Link
//                   href="/profile"
//                   className={styles.btn__profile}
//                   onClick={closeMenu}
//                   // href="/fitness/myProfile"
//                    href={`/fitness/myProfile/${email}`}
//                 >
//                   Мой профиль
//                 </Link>
//                 {/* <button className={styles.btn__profile} onClick={goToProfile}>
//                   Мой профиль
//                 </button> */}
//                 <button className={styles.btn__exit} onClick={logout}>
//                   Выйти
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         <Link className={styles.header__btn} href="/auth/signin">
//           Войти
//         </Link>
//       )}
//     </header>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import styles from './header.module.css';
// import { clearUser } from '@/store/features/authSlice';

export default function Header() {
  const email = useAppSelector((state) => state.auth.username);

  // Преобразуем email в "имя пользователя"
  //  Имя пользователя должно приходить с бэкенда, сейчас используется email
  const displayName = email
    ? email.split('@')[0][0].toUpperCase() + email.split('@')[0].slice(1)
    : '';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // закрытие по клику вне меню
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const logout = () => {
  //   dispatch(clearUser());
  //   router.push('/auth/signin');
  // };

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.svg"
          alt="logo"
        />
        <p className={styles.logo__text}>Онлайн-тренировки для занятий дома</p>
      </div>

      {/* Пользователь / Войти */}
      {email ? (
        <div ref={menuRef} className={styles.header__userWrapper}>
          <button
            type="button"
            className={styles.header__user}
            onClick={toggleMenu}
          >
            <Image
              width={42}
              height={42}
              className={styles.header__userIcon}
              src="/img/icon/user.svg"
              alt="иконка пользователя"
            />

            {/* обработанный email */}
            <span className={styles.header__userName}>{displayName}</span>

            <span
              className={`${styles.header__arrow} ${
                isMenuOpen ? styles.header__arrow_open : ''
              }`}
            />
          </button>

          {isMenuOpen && (
            <div className={styles.userMenu}>
              <div className={styles.userMenu__info}>
                <p className={styles.info__titleName}>{displayName}</p>
                <p className={styles.info__mail}>{email}</p>
              </div>
              <div className={styles.userMenu__btn}>
                <Link
                  href="/profile"
                  className={styles.btn__profile}
                  onClick={closeMenu}
                >
                  Мой профиль
                </Link>

                <button
                  className={styles.btn__exit}
                  onClick={() => {
                    // dispatch(logout())
                    closeMenu();
                  }}
                >
                  Выйти
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link className={styles.header__btn} href="/auth/signin">
          Войти
        </Link>
      )}
    </header>
  );
}
