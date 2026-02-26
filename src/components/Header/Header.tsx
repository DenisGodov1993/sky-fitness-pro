'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import styles from './header.module.css';
import { useRouter } from 'next/navigation';
import { clearUser } from '@/store/features/authSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
    router.push('/auth/signin');
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
        <p className={styles.logo__text}>Онлайн-тренировки для занятий дома</p>
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
                  href="/profile"
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
//   const { username, id: userId } = useAppSelector((state) => state.auth);

//   const displayName = username
//     ? username.split('@')[0][0].toUpperCase() + username.split('@')[0].slice(1)
//     : '';

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   const toggleMenu = () => setIsMenuOpen((prev) => !prev);
//   const closeMenu = () => setIsMenuOpen(false);

//   const logout = () => {
//     dispatch(clearUser());
//     router.push('/auth/signin');
//     closeMenu();
//   };

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
//         closeMenu();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

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
//       {/* Если пользователь авторизован — показываем меню */}
//       {username ? (
//         <div ref={menuRef} className={styles.header__userWrapper}>
//           <button
//             type="button"
//             className={styles.header__user}
//             onClick={toggleMenu}
//             aria-expanded={isMenuOpen}
//             aria-label="Меню пользователя"
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
//               aria-hidden="true"
//             />
//           </button>

//           {isMenuOpen && (
//             <div className={styles.userMenu} role="menu">
//               <div className={styles.userMenu__info}>
//                 <p className={styles.info__titleName}>{displayName}</p>
//                 <p className={styles.info__mail}>{username}</p>
//               </div>
//               <div className={styles.userMenu__btn}>
//                 {/* userId всегда есть, если пользователь авторизован */}
//                 <Link
//                   href={`/fitness/myProfile/${userId}`}
//                   className={styles.btn__profile}
//                   onClick={closeMenu}
//                   role="menuitem"
//                 >
//                   Мой профиль
//                 </Link>
//                 <button
//                   className={styles.btn__exit}
//                   onClick={logout}
//                   role="menuitem"
//                 >
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
