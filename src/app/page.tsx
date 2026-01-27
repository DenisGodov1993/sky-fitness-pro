// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function HomeRedirect() {
//   const router = useRouter();

//   useEffect(() => {
//     router.replace('/fitness/main');
//   }, [router]);

//   return null;
// }

// import './page.css';

'use client';

import './page.css';
import Image from 'next/image';

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={'wrapper'}>
      <main className={'main'}>
        <div className={'header'}>
          <div className={'header__logo'}>
            <Image
              width={250}
              height={170}
              className={'logo__image'}
              src="/img/logo.svg"
              alt={'logo'}
            />
            <p className={'logo__text'}>Онлайн-тренировки для занятий дома</p>
          </div>
          <a className={'header__btn'} href="btn">
            Войти
          </a>
        </div>
        <div className={'centerblock'}>
          <div className={'centerblock__title'}>
            <h2 className={'title__text'}>
              <span>Начните заниматься спортом</span>
              <span>и улучшите качество жизни</span>
            </h2>
            <Image
              width={288}
              height={102}
              className={'title__image'}
              src="/img/title.svg"
              alt="title__image"
            />
          </div>
          <div className={'centerblock__content'}>
            <div className={'content-card'} id="content-card-1">
              <div className="card-image-container">
                <Image
                  width={360}
                  height={325}
                  className={'content-card__img'}
                  src="/img/skill1.svg"
                  alt={'Йога'}
                />
                <button
                  className={'content-card__imgPlusSvg'}
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

              <div className={'content-card__card-text'}>
                <h3 className={'card-text__title'}>Йога</h3>
                <div className={'card-text__info'}>
                  <div className={'card-text__info-txt'}>
                    <div className={'card-text__txt1'}>
                      <svg className={'card-text__txt1Svg'}>
                        <use xlinkHref="/img/icon/calendar.svg"></use>
                      </svg>
                      <p>25 дней</p>
                    </div>
                    <div className={'card-text__txt2'}>
                      <svg className={'card-text__txt2Svg'}>
                        <use xlinkHref="/img/icon/watch.svg"></use>
                      </svg>
                      <p>20-50 мин/день</p>
                    </div>
                  </div>
                  <div className={'card-text__txt3'}>
                    <svg className={'card-text__txt3Svg'}>
                      <use xlinkHref="/img/icon/complexity.svg"></use>
                    </svg>
                    <p>Сложность</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={'content-card'} id="content-card-2">
              <div className="card-image-container">
                <Image
                  width={360}
                  height={325}
                  className={'content-card__img'}
                  src="/img/skill2.svg"
                  alt={'Стретчинг'}
                />
                <button
                  className={'content-card__imgPlusSvg'}
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
              <div className={'content-card__card-text'}>
                <h3 className={'card-text__title'}>Стретчинг</h3>
                <div className={'card-text__info'}>
                  <div className={'card-text__info-txt'}>
                    <div className={'card-text__txt1'}>
                      <svg className={'card-text__txt1Svg'}>
                        <use xlinkHref="/img/icon/calendar.svg"></use>
                      </svg>
                      <p>25 дней</p>
                    </div>
                    <div className={'card-text__txt2'}>
                      <svg className={'card-text__txt2Svg'}>
                        <use xlinkHref="/img/icon/watch.svg"></use>
                      </svg>
                      <p>20-50 мин/день</p>
                    </div>
                  </div>
                  <div className={'card-text__txt3'}>
                    <svg className={'card-text__txt3Svg'}>
                      <use xlinkHref="/img/icon/complexity.svg"></use>
                    </svg>
                    <p>Сложность</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={'content-card'} id="content-card-3">
              <div className="card-image-container">
                <Image
                  width={360}
                  height={325}
                  className={'content-card__img'}
                  src="/img/skill3.svg"
                  alt={'Фитнес'}
                />
                <button
                  className={'content-card__imgPlusSvg'}
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
              <div className={'content-card__card-text'}>
                <h3 className={'card-text__title'}>Фитнес</h3>
                <div className={'card-text__info'}>
                  <div className={'card-text__info-txt'}>
                    <div className={'card-text__txt1'}>
                      <svg className={'card-text__txt1Svg'}>
                        <use xlinkHref="/img/icon/calendar.svg"></use>
                      </svg>
                      <p>25 дней</p>
                    </div>
                    <div className={'card-text__txt2'}>
                      <svg className={'card-text__txt2Svg'}>
                        <use xlinkHref="/img/icon/watch.svg"></use>
                      </svg>
                      <p>20-50 мин/день</p>
                    </div>
                  </div>
                  <div className={'card-text__txt3'}>
                    <svg className={'card-text__txt3Svg'}>
                      <use xlinkHref="/img/icon/complexity.svg"></use>
                    </svg>
                    <p>Сложность</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={'content-card'} id="content-card-4">
              <div className="card-image-container">
                <Image
                  width={360}
                  height={325}
                  className={'content-card__img'}
                  src="/img/skill4.svg"
                  alt={'Степ-аэробика'}
                />
                <button
                  className={'content-card__imgPlusSvg'}
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
              <div className={'content-card__card-text'}>
                <h3 className={'card-text__title'}>Степ-аэробика</h3>
                <div className={'card-text__info'}>
                  <div className={'card-text__info-txt'}>
                    <div className={'card-text__txt1'}>
                      <svg className={'card-text__txt1Svg'}>
                        <use xlinkHref="/img/icon/calendar.svg"></use>
                      </svg>
                      <p>25 дней</p>
                    </div>
                    <div className={'card-text__txt2'}>
                      <svg className={'card-text__txt2Svg'}>
                        <use xlinkHref="/img/icon/watch.svg"></use>
                      </svg>
                      <p>20-50 мин/день</p>
                    </div>
                  </div>
                  <div className={'card-text__txt3'}>
                    <svg className={'card-text__txt3Svg'}>
                      <use xlinkHref="/img/icon/complexity.svg"></use>
                    </svg>
                    <p>Сложность</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={'content-card'} id="content-card-5">
              <div className="card-image-container">
                <Image
                  width={360}
                  height={325}
                  className={'content-card__img'}
                  src="/img/skill5.svg"
                  alt={'Бодифлекс'}
                />
                <button
                  className={'content-card__imgPlusSvg'}
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
              <div className={'content-card__card-text'}>
                <h3 className={'card-text__title'}>Бодифлекс</h3>
                <div className={'card-text__info'}>
                  <div className={'card-text__info-txt'}>
                    <div className={'card-text__txt1'}>
                      <svg className={'card-text__txt1Svg'}>
                        <use xlinkHref="/img/icon/calendar.svg"></use>
                      </svg>
                      <p>25 дней</p>
                    </div>
                    <div className={'card-text__txt2'}>
                      <svg className={'card-text__txt2Svg'}>
                        <use xlinkHref="/img/icon/watch.svg"></use>
                      </svg>
                      <p>20-50 мин/день</p>
                    </div>
                  </div>
                  <div className={'card-text__txt3'}>
                    <svg className={'card-text__txt3Svg'}>
                      <use xlinkHref="/img/icon/complexity.svg"></use>
                    </svg>
                    <p>Сложность</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            id="back-to-top"
            className="back-to-top"
            onClick={scrollToTop}
          >
            Наверх ↑
          </button>
        </div>
      </main>
    </div>
  );
}
