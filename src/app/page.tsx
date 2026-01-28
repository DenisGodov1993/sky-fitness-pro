'use client';

// import './page.css';
// import Image from 'next/image';
// import Link from 'next/link';
import styles from './page.module.css';
import Header from '@/components/Header/Header';
import Centerblock from '@/components/Header/Header';

export default function Home() {
  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   });
  // };

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <Header />
        <Centerblock />
        {/* <div className={styles.header}>
          <div className={styles.header__logo}>
            <Image
              width={250}
              height={170}
              className={styles.logo__image}
              src="/img/logo.svg"
              alt={'logo'}
            />
            <p className={styles.logo__text}>
              Онлайн-тренировки для занятий дома
            </p>
          </div>
          <Link className={styles.header__btn} href="btn">
            Войти
          </Link>
        </div> */}
        {/* <div className={styles.centerblock}>
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
            <div className={styles.content__card} id="card__1">
              <div className={styles.card__imageContainer}>
                <Image
                  width={360}
                  height={325}
                  className={styles.card__img}
                  src="/img/skill1.svg"
                  alt={'Йога'}
                />
                <button
                  className={styles.card__imgPlusSvg}
                  aria-label="Добавить"
                >
                  <Image
                    width={32}
                    height={32}
                    src="/img/icon/plus.svg"
                    alt={'Добавить'}
                  />
                </button>
              </div>
              <div className={styles.card__textContainer}>
                <h3 className={styles.textContainer__title}>Йога</h3>
                <div className={styles.textContainer__info}>
                  <div className={styles.info__txt}>
                    <div className={styles.txt__1}>
                      <svg className={styles.txt__1Svg}>
                        <use xlinkHref="/img/icon/calendar.svg"></use>
                      </svg>
                      <p>25 дней</p>
                    </div>
                    <div className={styles.txt__2}>
                      <svg className={styles.txt__2Svg}>
                        <use xlinkHref="/img/icon/watch.svg"></use>
                      </svg>
                      <p>20-50 мин/день</p>
                    </div>
                  </div>
                  <div className={styles.txt__3}>
                    <svg className={styles.txt__3Svg}>
                      <use xlinkHref="/img/icon/complexity.svg"></use>
                    </svg>
                    <p>Сложность</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.content__card} id="card__2">
              <div className={styles.card__imageContainer}>
                <Image
                  width={360}
                  height={325}
                  className={styles.card__img}
                  src="/img/skill2.svg"
                  alt={'Стретчинг'}
                />
                <button
                  className={styles.card__imgPlusSvg}
                  aria-label="Добавить"
                >
                  <Image
                    width={32}
                    height={32}
                    src="/img/icon/plus.svg"
                    alt={'Добавить'}
                  />
                </button>
              </div>
              <div className={styles.card__textContainer}>
                <h3 className={styles.textContainer__title}>Стретчинг</h3>
                <div className={styles.textContainer__info}>
                  <div className={styles.info__txt}>
                    <div className={styles.txt__1}>
                      <svg className={styles.txt__1Svg}>
                        <use xlinkHref="/img/icon/calendar.svg"></use>
                      </svg>
                      <p>25 дней</p>
                    </div>
                    <div className={styles.txt__2}>
                      <svg className={styles.txt__2Svg}>
                        <use xlinkHref="/img/icon/watch.svg"></use>
                      </svg>
                      <p>20-50 мин/день</p>
                    </div>
                  </div>
                  <div className={styles.txt__3}>
                    <svg className={styles.txt__3Svg}>
                      <use xlinkHref="/img/icon/complexity.svg"></use>
                    </svg>
                    <p>Сложность</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.content__card} id="card__3">
              <div className={styles.card__imageContainer}>
                <Image
                  width={360}
                  height={325}
                  className={styles.card__img}
                  src="/img/skill3.svg"
                  alt={'Фитнес'}
                />
                <button
                  className={styles.card__imgPlusSvg}
                  aria-label="Добавить"
                >
                  <Image
                    width={32}
                    height={32}
                    src="/img/icon/plus.svg"
                    alt={'Добавить'}
                  />
                </button>
              </div>
              <div className={styles.card__textContainer}>
                <h3 className={styles.textContainer__title}>Фитнес</h3>
                <div className={styles.textContainer__info}>
                  <div className={styles.info__txt}>
                    <div className={styles.txt__1}>
                      <svg className={styles.txt__1Svg}>
                        <use xlinkHref="/img/icon/calendar.svg"></use>
                      </svg>
                      <p>25 дней</p>
                    </div>
                    <div className={styles.txt__2}>
                      <svg className={styles.txt__2Svg}>
                        <use xlinkHref="/img/icon/watch.svg"></use>
                      </svg>
                      <p>20-50 мин/день</p>
                    </div>
                  </div>
                  <div className={styles.txt__3}>
                    <svg className={styles.txt__3Svg}>
                      <use xlinkHref="/img/icon/complexity.svg"></use>
                    </svg>
                    <p>Сложность</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.content__card} id="card__4">
              <div className={styles.card__imageContainer}>
                <Image
                  width={360}
                  height={325}
                  className={styles.card__img}
                  src="/img/skill4.svg"
                  alt={'Степ-аэробика'}
                />
                <button
                  className={styles.card__imgPlusSvg}
                  aria-label="Добавить"
                >
                  <Image
                    width={32}
                    height={32}
                    src="/img/icon/plus.svg"
                    alt={'Добавить'}
                  />
                </button>
              </div>
              <div className={styles.card__textContainer}>
                <h3 className={styles.textContainer__title}>Степ-аэробика</h3>
                <div className={styles.textContainer__info}>
                  <div className={styles.info__txt}>
                    <div className={styles.txt__1}>
                      <svg className={styles.txt__1Svg}>
                        <use xlinkHref="/img/icon/calendar.svg"></use>
                      </svg>
                      <p>25 дней</p>
                    </div>
                    <div className={styles.txt__2}>
                      <svg className={styles.txt__2Svg}>
                        <use xlinkHref="/img/icon/watch.svg"></use>
                      </svg>
                      <p>20-50 мин/день</p>
                    </div>
                  </div>
                  <div className={styles.txt__3}>
                    <svg className={styles.txt__3Svg}>
                      <use xlinkHref="/img/icon/complexity.svg"></use>
                    </svg>
                    <p>Сложность</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.content__card} id="card__5">
              <div className={styles.card__imageContainer}>
                <Image
                  width={360}
                  height={325}
                  className={styles.card__img}
                  src="/img/skill5.svg"
                  alt={'Бодифлекс'}
                />
                <button
                  className={styles.card__imgPlusSvg}
                  aria-label="Добавить"
                >
                  <Image
                    width={32}
                    height={32}
                    src="/img/icon/plus.svg"
                    alt={'Добавить'}
                  />
                </button>
              </div>
              <div className={styles.card__textContainer}>
                <h3 className={styles.textContainer__title}>Бодифлекс</h3>
                <div className={styles.textContainer__info}>
                  <div className={styles.info__txt}>
                    <div className={styles.txt__1}>
                      <svg className={styles.txt__1Svg}>
                        <use xlinkHref="/img/icon/calendar.svg"></use>
                      </svg>
                      <p>25 дней</p>
                    </div>
                    <div className={styles.txt__2}>
                      <svg className={styles.txt__2Svg}>
                        <use xlinkHref="/img/icon/watch.svg"></use>
                      </svg>
                      <p>20-50 мин/день</p>
                    </div>
                  </div>
                  <div className={styles.txt__3}>
                    <svg className={styles.txt__3Svg}>
                      <use xlinkHref="/img/icon/complexity.svg"></use>
                    </svg>
                    <p>Сложность</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            id="backTotop"
            className={styles.backTotop}
            onClick={scrollToTop}
          >
            Наверх ↑
          </button>
        </div> */}
      </main>
    </div>
  );
}

// 'use client';

// import './page.css';
// import Image from 'next/image';

// export default function Home() {
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <div className={'wrapper'}>
//       <main className={'main'}>
//         <div className={'header'}>
//           <div className={'header__logo'}>
//             <Image
//               width={250}
//               height={170}
//               className={'logo__image'}
//               src="/img/logo.svg"
//               alt={'logo'}
//             />
//             <p className={'logo__text'}>Онлайн-тренировки для занятий дома</p>
//           </div>
//           <a className={'header__btn'} href="btn">
//             Войти
//           </a>
//         </div>
//         <div className={'centerblock'}>
//           <div className={'centerblock__title'}>
//             <h2 className={'title__text'}>
//               <span>Начните заниматься спортом</span>
//               <span>и улучшите качество жизни</span>
//             </h2>
//             <Image
//               width={288}
//               height={102}
//               className={'title__image'}
//               src="/img/title.svg"
//               alt="title__image"
//             />
//           </div>
//           <div className={'centerblock__content'}>
//             <div className={'content-card'} id="content-card-1">
//               <div className="card-image-container">
//                 <Image
//                   width={360}
//                   height={325}
//                   className={'content-card__img'}
//                   src="/img/skill1.svg"
//                   alt={'Йога'}
//                 />
//                 <button
//                   className={'content-card__imgPlusSvg'}
//                   aria-label="Добавить"
//                 >
//                   <Image
//                     width={32}
//                     height={32}
//                     src="/img/icon/plus.svg"
//                     alt={'Добавить'}
//                   />
//                 </button>
//               </div>

//               <div className={'content-card__card-text'}>
//                 <h3 className={'card-text__title'}>Йога</h3>
//                 <div className={'card-text__info'}>
//                   <div className={'card-text__info-txt'}>
//                     <div className={'card-text__txt1'}>
//                       <svg className={'card-text__txt1Svg'}>
//                         <use xlinkHref="/img/icon/calendar.svg"></use>
//                       </svg>
//                       <p>25 дней</p>
//                     </div>
//                     <div className={'card-text__txt2'}>
//                       <svg className={'card-text__txt2Svg'}>
//                         <use xlinkHref="/img/icon/watch.svg"></use>
//                       </svg>
//                       <p>20-50 мин/день</p>
//                     </div>
//                   </div>
//                   <div className={'card-text__txt3'}>
//                     <svg className={'card-text__txt3Svg'}>
//                       <use xlinkHref="/img/icon/complexity.svg"></use>
//                     </svg>
//                     <p>Сложность</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className={'content-card'} id="content-card-2">
//               <div className="card-image-container">
//                 <Image
//                   width={360}
//                   height={325}
//                   className={'content-card__img'}
//                   src="/img/skill2.svg"
//                   alt={'Стретчинг'}
//                 />
//                 <button
//                   className={'content-card__imgPlusSvg'}
//                   aria-label="Добавить"
//                 >
//                   <Image
//                     width={32}
//                     height={32}
//                     src="/img/icon/plus.svg"
//                     alt={'Добавить'}
//                   />
//                 </button>
//               </div>
//               <div className={'content-card__card-text'}>
//                 <h3 className={'card-text__title'}>Стретчинг</h3>
//                 <div className={'card-text__info'}>
//                   <div className={'card-text__info-txt'}>
//                     <div className={'card-text__txt1'}>
//                       <svg className={'card-text__txt1Svg'}>
//                         <use xlinkHref="/img/icon/calendar.svg"></use>
//                       </svg>
//                       <p>25 дней</p>
//                     </div>
//                     <div className={'card-text__txt2'}>
//                       <svg className={'card-text__txt2Svg'}>
//                         <use xlinkHref="/img/icon/watch.svg"></use>
//                       </svg>
//                       <p>20-50 мин/день</p>
//                     </div>
//                   </div>
//                   <div className={'card-text__txt3'}>
//                     <svg className={'card-text__txt3Svg'}>
//                       <use xlinkHref="/img/icon/complexity.svg"></use>
//                     </svg>
//                     <p>Сложность</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className={'content-card'} id="content-card-3">
//               <div className="card-image-container">
//                 <Image
//                   width={360}
//                   height={325}
//                   className={'content-card__img'}
//                   src="/img/skill3.svg"
//                   alt={'Фитнес'}
//                 />
//                 <button
//                   className={'content-card__imgPlusSvg'}
//                   aria-label="Добавить"
//                 >
//                   <Image
//                     width={32}
//                     height={32}
//                     src="/img/icon/plus.svg"
//                     alt={'Добавить'}
//                   />
//                 </button>
//               </div>
//               <div className={'content-card__card-text'}>
//                 <h3 className={'card-text__title'}>Фитнес</h3>
//                 <div className={'card-text__info'}>
//                   <div className={'card-text__info-txt'}>
//                     <div className={'card-text__txt1'}>
//                       <svg className={'card-text__txt1Svg'}>
//                         <use xlinkHref="/img/icon/calendar.svg"></use>
//                       </svg>
//                       <p>25 дней</p>
//                     </div>
//                     <div className={'card-text__txt2'}>
//                       <svg className={'card-text__txt2Svg'}>
//                         <use xlinkHref="/img/icon/watch.svg"></use>
//                       </svg>
//                       <p>20-50 мин/день</p>
//                     </div>
//                   </div>
//                   <div className={'card-text__txt3'}>
//                     <svg className={'card-text__txt3Svg'}>
//                       <use xlinkHref="/img/icon/complexity.svg"></use>
//                     </svg>
//                     <p>Сложность</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className={'content-card'} id="content-card-4">
//               <div className="card-image-container">
//                 <Image
//                   width={360}
//                   height={325}
//                   className={'content-card__img'}
//                   src="/img/skill4.svg"
//                   alt={'Степ-аэробика'}
//                 />
//                 <button
//                   className={'content-card__imgPlusSvg'}
//                   aria-label="Добавить"
//                 >
//                   <Image
//                     width={32}
//                     height={32}
//                     src="/img/icon/plus.svg"
//                     alt={'Добавить'}
//                   />
//                 </button>
//               </div>
//               <div className={'content-card__card-text'}>
//                 <h3 className={'card-text__title'}>Степ-аэробика</h3>
//                 <div className={'card-text__info'}>
//                   <div className={'card-text__info-txt'}>
//                     <div className={'card-text__txt1'}>
//                       <svg className={'card-text__txt1Svg'}>
//                         <use xlinkHref="/img/icon/calendar.svg"></use>
//                       </svg>
//                       <p>25 дней</p>
//                     </div>
//                     <div className={'card-text__txt2'}>
//                       <svg className={'card-text__txt2Svg'}>
//                         <use xlinkHref="/img/icon/watch.svg"></use>
//                       </svg>
//                       <p>20-50 мин/день</p>
//                     </div>
//                   </div>
//                   <div className={'card-text__txt3'}>
//                     <svg className={'card-text__txt3Svg'}>
//                       <use xlinkHref="/img/icon/complexity.svg"></use>
//                     </svg>
//                     <p>Сложность</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className={'content-card'} id="content-card-5">
//               <div className="card-image-container">
//                 <Image
//                   width={360}
//                   height={325}
//                   className={'content-card__img'}
//                   src="/img/skill5.svg"
//                   alt={'Бодифлекс'}
//                 />
//                 <button
//                   className={'content-card__imgPlusSvg'}
//                   aria-label="Добавить"
//                 >
//                   <Image
//                     width={32}
//                     height={32}
//                     src="/img/icon/plus.svg"
//                     alt={'Добавить'}
//                   />
//                 </button>
//               </div>
//               <div className={'content-card__card-text'}>
//                 <h3 className={'card-text__title'}>Бодифлекс</h3>
//                 <div className={'card-text__info'}>
//                   <div className={'card-text__info-txt'}>
//                     <div className={'card-text__txt1'}>
//                       <svg className={'card-text__txt1Svg'}>
//                         <use xlinkHref="/img/icon/calendar.svg"></use>
//                       </svg>
//                       <p>25 дней</p>
//                     </div>
//                     <div className={'card-text__txt2'}>
//                       <svg className={'card-text__txt2Svg'}>
//                         <use xlinkHref="/img/icon/watch.svg"></use>
//                       </svg>
//                       <p>20-50 мин/день</p>
//                     </div>
//                   </div>
//                   <div className={'card-text__txt3'}>
//                     <svg className={'card-text__txt3Svg'}>
//                       <use xlinkHref="/img/icon/complexity.svg"></use>
//                     </svg>
//                     <p>Сложность</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <button
//             id="back-to-top"
//             className="back-to-top"
//             onClick={scrollToTop}
//           >
//             Наверх ↑
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }
