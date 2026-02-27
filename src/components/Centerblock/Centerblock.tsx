import styles from './centerblock.module.css';
import Image from 'next/image';
import { CourseCard } from '@components/CourseCard/CourseCard';
import { useAppSelector } from '@/store/store';

export default function Centerblock() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const courses = useAppSelector((state) => state.courses.allCourses);

  // Сортируем по order прямо перед рендером
  const sortedCourses = courses.slice().sort((a, b) => a.order - b.order);

  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__title}>
        <h2 className={styles.title__text}>
          <span>Начните заниматься спортом</span>
          <span>и улучшите качество жизни</span>
        </h2>
        <div className={styles.title__imageText}>
          <p className={styles.imageText__text}>
            Измени своё <br />
            тело за полгода! 
          </p>
          <Image
            width={30.24}
            height={35.17}
            className={styles.imageText__img}
            src="/img/img_tail.png"
            alt="img_tail"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </div>

      <div className={styles.centerblock__content}>
        {sortedCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
      <button id="backTotop" className={styles.backTotop} onClick={scrollToTop}>
        Наверх ↑
      </button>
    </div>
  );
}

// import styles from './centerblock.module.css';
// import Image from 'next/image';
// import { CourseCard } from '@components/CourseCard/CourseCard';
// import { useAppSelector } from '@/store/store';

// export default function Centerblock() {
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const courses = useAppSelector((state) => state.courses.allCourses);

//   // Сортируем по order прямо перед рендером
//   const sortedCourses = courses.slice().sort((a, b) => a.order - b.order);

//   return (
//     <div className={styles.centerblock}>
//       <div className={styles.centerblock__title}>
//         <h2 className={styles.title__text}>
//           <span>Начните заниматься спортом</span>
//           <span>и улучшите качество жизни</span>
//         </h2>
//         <Image
//           width={288}
//           height={102}
//           className={styles.title__image}
//           src="/img/title.svg"
//           alt="title"
//           style={{ width: 'auto', height: 'auto' }}
//         />
//       </div>

//       <div className={styles.centerblock__content}>
//         {sortedCourses.map((course) => (
//           <CourseCard key={course._id} course={course} />
//         ))}
//       </div>
//       <button id="backTotop" className={styles.backTotop} onClick={scrollToTop}>
//         Наверх ↑
//       </button>
//     </div>
//   );
// }

// import styles from './centerblock.module.css';
// import Image from 'next/image';
// // import { fitCourses } from '@/data';
// import { CourseApiType } from '@/sharedTypes/sharedTypes';
// import { CourseCard } from '@components/CourseCard/CourseCard';
// import { useAppSelector } from '@/store/store';

// export default function Centerblock() {
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const courses = useAppSelector((state) => state.courses.allCourses);

//   return (

//     <div className={styles.centerblock}>
//       <div className={styles.centerblock__title}>
//         <h2 className={styles.title__text}>
//           <span>Начните заниматься спортом</span>
//           <span>и улучшите качество жизни</span>
//         </h2>
//         <Image
//           width={288}
//           height={102}
//           className={styles.title__image}
//           src="/img/title.svg"
//           alt="title"
//           style={{ width: 'auto', height: 'auto' }}
//         />
//       </div>

//       <div className={styles.centerblock__content}>
//         { courses.map((course) => (
//           <CourseCard key={course._id} course={course} />
//         ))}
//       </div>
//       <button id="backTotop" className={styles.backTotop} onClick={scrollToTop}>
//         Наверх ↑
//       </button>
//     </div>
//   );
// }
