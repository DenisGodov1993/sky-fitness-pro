// 'use client';

import styles from './centerblock.module.css';
import Image from 'next/image';
// import Link from 'next/link';
import { data } from '@/data';

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
          alt="title__image"
        />
      </div>
      <div className={styles.centerblock__content}>
        {data.map((course, index) => (
          <div key={course._id} className={styles.content__card}>
            <div className={styles.card__imageContainer}>
              <Image
                width={360}
                height={325}
                className={styles.card__img}
                src={course.image}
                alt={course.name}
              />
              <button className={styles.card__imgPlusSvg} aria-label="Добавить">
                <Image
                  width={32}
                  height={32}
                  src="/img/icon/plus.svg"
                  alt={'Добавить'}
                />
              </button>
            </div>
            <div className={styles.card__textContainer}>
              <h3 className={styles.textContainer__title}>{course.name}</h3>
              <div className={styles.textContainer__info}>
                <div className={styles.info__txt}>
                  <div className={styles.txt__1}>
                    <svg className={styles.txt__1Svg}>
                      <use xlinkHref="/img/icon/calendar.svg"></use>
                    </svg>
                    <p>{course.number_of_days} дней</p>
                  </div>
                  <div className={styles.txt__2}>
                    <svg className={styles.txt__2Svg}>
                      <use xlinkHref="/img/icon/watch.svg"></use>
                    </svg>
                    <p>
                      {course.duration.from}-{course.duration.to} мин/день
                    </p>
                  </div>
                </div>
                <div className={styles.txt__3}>
                  <svg className={styles.txt__3Svg}>
                    <use xlinkHref="/img/icon/complexity.svg"></use>
                  </svg>
                  <p>Сложность: {course.difficulty}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button id="backTotop" className={styles.backTotop} onClick={scrollToTop}>
        Наверх ↑
      </button>
    </div>
  );
}
