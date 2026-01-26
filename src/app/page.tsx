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

import './page.css';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={'wrapper'}>
      <div className={'container'}>
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
              <p className={'logo__text'}>
                Онлайн-тренировки для занятий дома{' '}
              </p>
            </div>
            <a className={'header__btn'} href="btn">
              Войти
            </a>
          </div>
          {/* <div className={'sidebar__personal'}>
            <p className={'sidebar__personalName'}>Sergey.Ivanov</p>
            <div className={'sidebar__icon'}>
              <svg>
                <use xlinkHref="/img/icon/sprite.svg#logout"></use>
              </svg>
            </div>
          </div> */}

          <div className={'centerblock'}>
            <h2 className={'centerblock__h2'}>
              {' '}
              Начните заниматься спортом и улучшите качество жизни
            </h2>

            <div className={'centerblock__content'}>
              <a className="about__game" href="#game1">
                <article className="about__game about__game_1-3">
                  {/* <img className="about__img" src="img/game1.jpeg" alt="игра 1"> */}
                  <Image
                    width={360}
                    height={170}
                    className={'sidebar__img'}
                    src="/img/skill1.svg"
                    alt={'Йога'}
                  />
                  <div className="game-text">
                    <p className="game-text__1">Игра № 1</p>
                    <p className="game-text__2">Угадай число</p>
                  </div>
                </article>
              </a>
              <a className="about__game" href="#game4">
                <article className="about__game about__game_4-6">
                  {/* <img className="about__img" src="img/game4.jpeg" alt="игра 4"> */}
                  <Image
                    width={250}
                    height={170}
                    className={'sidebar__img'}
                    src="/img/skill2.svg"
                    alt={'Стретчинг'}
                  />
                  <div className="game-text">
                    <p className="game-text__1">Игра №4</p>
                    <p className="game-text__2">Камень, ножницы, бумага</p>
                  </div>
                </article>
              </a>
            </div>
          </div>
        </main>

        <footer className="footer"></footer>
      </div>
    </div>
  );
}
