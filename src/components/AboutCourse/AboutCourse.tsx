'use client';

import styles from './aboutCourse.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { CourseApiType } from '@/sharedTypes/sharedTypes';
import { dividingBlocks } from '@/utils/dividingBlocks';
import { skillImageMap } from '@/data';
import { useState } from 'react';
import { addCourseToUser } from '@/services/courses/coursesApi';
import axios from 'axios';

interface AboutCourseProps {
  course: CourseApiType;
  username?: string;
}

export default function AboutCourse({ course, username }: AboutCourseProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const skillImage =
    skillImageMap.find((c) => c.name === course.nameRU)?.image ??
    '/img/skillCard1.png';

  const onAddCourse = async () => {
    if (!username || isAdded || isLoading) return;

    setIsLoading(true);

    try {
      const res = await addCourseToUser(course._id);

      setIsAdded(true);
      console.log(res?.data?.message ?? 'Курс добавлен');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message as string | undefined;

        if (message === 'Курс уже был добавлен!') {
          setIsAdded(true);
          console.log(message);
        } else {
          console.error(message ?? 'Ошибка API');
        }
      } else {
        console.error('Неизвестная ошибка');
      }
    } finally {
      setIsLoading(false);
    }
  };
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
            priority
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

            {username && !isAdded ? (
              <button
                className={styles.txtContainer__btn}
                disabled={isLoading}
                onClick={onAddCourse}
              >
                {isLoading ? 'Добавление...' : 'Добавить курс'}
              </button>
            ) : !username ? (
              <Link className={styles.txtContainer__btn} href="/auth/signin">
                Войдите, чтобы добавить курс
              </Link>
            ) : (
              // <p>Курс добавлен!</p>
              <p className={styles.added}>Курс добавлен ✓</p>
            )}
          </div>
        </div>

        <Image
          width={604}
          height={604}
          className={styles.skillPoster__posterImg}
          src="/img/poster.png"
          alt="постер"
          // style={{ width: 'auto', height: 'auto' }}
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