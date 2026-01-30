
'use client';

import Image from 'next/image';
import styles from './header.module.css';
import Link from 'next/link';

export default function Header() {
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
      <Link className={styles.header__btn} href="btn">
        Войти
      </Link>
    </div>
  );
}


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

