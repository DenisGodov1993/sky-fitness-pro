'use client';

import styles from './aboutCourse.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { CourseApiType } from '@/sharedTypes/sharedTypes';
import { dividingBlocks } from '@/utils/dividingBlocks';
import { skillImageMap } from '@/data';
import { useAppSelector } from '@/store/store';

interface AboutCourseProps {
  course: CourseApiType;
  username?: string;
  isLoading?: boolean;
  onAddCourse?: () => void;
}

export default function AboutCourse({
  course,
  username,
  isLoading,
  onAddCourse,
}: AboutCourseProps) {
  // Получаем список выбранных курсов из Redux
  const selectedCourses = useAppSelector(
    (state) => state.auth.selectedCourses ?? [],
  );

  // Проверяем, добавлен ли курс
  const isAdded = selectedCourses.includes(course._id);

  const skillImage =
    skillImageMap.find((c) => c.name === course.nameRU)?.image ??
    '/img/skillCard1.png';

  return (
    <>
      <div className={styles.skillCard}>
        {skillImage && (
          <Image
            width={1160}
            height={310}
            className={styles.skillCard__image}
            src={skillImage}
            alt={course.nameRU}
            style={{ width: 'auto', height: 'auto' }}
            // priority
            priority={true}
          />
        )}
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Подойдет для вас, если:</h2>
          <div className={styles.conteiner}>
            {course.fitting.slice(0, 3).map((text, index) => (
              <div key={text} className={styles.content}>
                <div className={styles.contentInfo}>
                  <p className={styles.number}>{index + 1}</p>
                  <p className={styles.text}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.skillCard__directionsCourses}>
          <h2 className={styles.directionsCourses__text}>Направления</h2>
          <div className={styles.directionsCourses__dirCourse}>
            <div className={styles.dirCourse__wrapper}>
              {dividingBlocks(course.directions, 2).map((block, i) => (
                <div key={i} className={styles.dirCourse__block}>
                  {block.map((name, j) => (
                    <div key={j} className={styles.dirCourse__item}>
                      <Image
                        width={19.5}
                        height={19.5}
                        src="/img/icon/star.svg"
                        alt="звезда"
                      />
                      <p className={styles.dirCourse__txt}>{name}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.skillPoster}>
        <div className={styles.posterContainer}>
          <div className={styles.posterContainer__txtContainer}>
            <h3 className={styles.txtContainer__title}>
              Начните путь <br />к новому телу
            </h3>

            <div className={styles.txtContainer__list}>
              <ul>
                <li>проработка всех групп мышц</li>
                <li>тренировка суставов</li>
                <li>улучшение циркуляции крови</li>
                <li>упражнения заряжают бодростью</li>
                <li>помогают противостоять стрессам</li>
              </ul>
            </div>

            {/* Кнопка добавления курса или текст, если курс уже добавлен */}
            {username ? (
              isAdded ? (
                <p className={styles.added}>Курс добавлен ✓</p>
              ) : (
                <button
                  className={styles.txtContainer__btn}
                  disabled={isLoading}
                  onClick={onAddCourse}
                >
                  {isLoading ? 'Добавление...' : 'Добавить курс'}
                </button>
              )
            ) : (
              <Link className={styles.txtContainer__btn} href="/auth/signin">
                Войдите, чтобы добавить курс
              </Link>
            )}
          </div>
        </div>

        <Image
          width={604}
          height={604}
          className={styles.skillPoster__posterImg}
          src="/img/poster.png"
          alt="постер"
          priority
        />

        <Image
          width={670}
          height={391}
          className={styles.skillPoster__posterImgSvg}
          src="/img/icon/greenLine.svg"
          alt="линия"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    </>
  );
}