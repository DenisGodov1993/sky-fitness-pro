export const courseImageMap = [
  { name: 'Йога', image: '/img/skill1.svg' },
  { name: 'Стретчинг', image: '/img/skill2.svg' },
  { name: 'Фитнес', image: '/img/skill3.svg' },
  { name: 'Степ-аэробика', image: '/img/skill4.svg' },
  { name: 'Бодифлекс', image: '/img/skill5.svg' },
];

export const skillImageMap = [
  { name: 'Йога', image: '/img/skillCard1.png' },
  { name: 'Стретчинг', image: '/img/skillCard2.png' },
  { name: 'Фитнес', image: '/img/skillCard3.png' },
  { name: 'Степ-аэробика', image: '/img/skillCard4.png' },
  { name: 'Бодифлекс', image: '/img/skillCard5.png' },
];

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useAppSelector } from '@/store/store';
// import { useEffect, useRef, useState } from 'react';
// import styles from './header.module.css';

// export default function Header() {
//   const email = useAppSelector((state) => state.auth.email); // используем email

//   // Преобразуем email в "имя пользователя"
//   const username = email ? email.split('@')[0] : '';
//   const displayName =
//     username.length > 0 ? username[0].toUpperCase() + username.slice(1) : '';

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

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

//   return (
//     <header className={styles.header}>
//       {/* Логотип */}
//       <div className={styles.header__logo}>
//         <Image
//           width={250}
//           height={170}
//           className={styles.logo__image}
//           src="/img/logo.svg"
//           alt="logo"
//         />
//         <p className={styles.logo__text}>
//           Онлайн-тренировки для занятий дома
//         </p>
//       </div>

//       {/* Пользователь / Войти */}
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

//             {/* Показываем красиво обработанный email */}
//             <span className={styles.header__userName}>{displayName}</span>

//             <Image
//               width={12}
//               height={8}
//               src="/img/icon/arrow-down.svg"
//               alt="стрелка"
//               className={`${styles.header__arrow} ${
//                 isMenuOpen ? styles.header__arrow_open : ''
//               }`}
//             />
//           </button>

//           {isMenuOpen && (
//             <div className={styles.userMenu}>
//               <Link
//                 href="/profile"
//                 className={styles.userMenu__item}
//                 onClick={closeMenu}
//               >
//                 Мой профиль
//               </Link>

//               <button
//                 className={styles.userMenu__item}
//                 onClick={() => {
//                   // dispatch(logout())
//                   closeMenu();
//                 }}
//               >
//                 Выйти
//               </button>
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