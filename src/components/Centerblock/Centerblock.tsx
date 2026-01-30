import styles from './centerblock.module.css';
import Image from 'next/image';
import { fitCourses } from '@/data';
import { CourseCard } from '@components/CourseCard/CourseCard';

export default function Centerblock() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__title}>
        <h2 className={styles.title__text}>
          <span>Начните заниматься спортом</span>
          <span>и улучшите качество жизни</span>
        </h2>
        <Image
          width={288}
          height={102}
          className={styles.title__image}
          src="/img/title.svg"
          alt="title"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>

      <div className={styles.centerblock__content}>
        {fitCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <button id="backTotop" className={styles.backTotop} onClick={scrollToTop}>
        Наверх ↑
      </button>
    </div>
  );
}
