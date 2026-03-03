'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import styles from './header.module.css';
import { usePathname } from 'next/navigation'; // Заменяем useRouter на usePathname
import { clearUser } from '@/store/features/authSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const currentPath = usePathname(); // Получаем текущий путь


  // Определяем, нужно ли скрывать текст (на страницах профиля и тренировки)
  const shouldHideText =
    currentPath?.startsWith('/fitness/profile') ||
    currentPath?.startsWith('/fitness/workout');

  const email = useAppSelector((state) => state.auth.username);

  const displayName = email
    ? email.split('@')[0][0].toUpperCase() + email.split('@')[0].slice(1)
    : '';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logout = () => {
    dispatch(clearUser());
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    // Для навигации в App Router можно использовать router.push или напрямую next/navigation
    window.location.href = '/auth/signin'; // Простой способ для выхода
    closeMenu();
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link href="/fitness/main">
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src="/img/logo.svg"
            alt="logo"
          />
        </Link>
        {/* Условно отображаем текст */}
        {!shouldHideText && (
          <p className={styles.logo__text}>Онлайн-тренировки для занятий дома</p>
        )}
      </div>

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
                  href="/fitness/profile"
                  className={styles.btn__profile}
                  onClick={closeMenu}
                >
                  Мой профиль
                </Link>

                <button className={styles.btn__exit} onClick={logout}>
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

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { useEffect, useRef, useState } from 'react';
// import styles from './header.module.css';
// import { useRouter } from 'next/navigation';
// import { clearUser } from '@/store/features/authSlice';

// export default function Header() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const email = useAppSelector((state) => state.auth.username);

//   const displayName = email
//     ? email.split('@')[0][0].toUpperCase() + email.split('@')[0].slice(1)
//     : '';

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   const toggleMenu = () => setIsMenuOpen((prev) => !prev);
//   const closeMenu = () => setIsMenuOpen(false);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
//         closeMenu();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const logout = () => {
//     dispatch(clearUser());
//     localStorage.removeItem('username');
//     localStorage.removeItem('token');
//     router.push('/auth/signin');
//     closeMenu();
//   };

//   return (
//     <header className={styles.header}>
//       <div className={styles.header__logo}>
//         <Link href="/fitness/main">
//           <Image
//             width={250}
//             height={170}
//             className={styles.logo__image}
//             src="/img/logo.svg"
//             alt="logo"
//           />
//         </Link>
//         <p className={styles.logo__text}>Онлайн-тренировки для занятий дома</p>
//       </div>

//       {email ? (
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
//                 <Link
//                   href="/fitness/profile"
//                   className={styles.btn__profile}
//                   onClick={closeMenu}
//                 >
//                   Мой профиль
//                 </Link>

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
