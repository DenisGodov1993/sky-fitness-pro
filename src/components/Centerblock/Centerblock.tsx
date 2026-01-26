import styles from './centerblock.module.css';
// import Track from '../Track/Track';
// import { data } from '@/data';

export default function Centerblock() {

  return (
    <div className={styles.centerblock}>
      
      <h2 className={styles.centerblock__h2}>Начните заниматься спортоми улучшите качество жизни</h2>

      <div className={styles.centerblock__filter}>
        
      </div>

      <div className={styles.centerblock__content}>

        <div className={styles.content__playlist}> 
          {/* {data.map((track) => (
            <Track key={track._id} track={track} />
          ))} */}
        </div>
      </div> 
    </div>

//     <section class="games-box center">
//         <div class="text-box">
//             <h2 class="text-box__title" id="about-games">Об играх</h2>
//             <p class="text-box__text">В моей коллекции представлено 6 игр на разные темы. <br> Игры несложные — в них может поиграть каждый. <br> Все игры доступны для пользования.</p>
//         </div>
//         <div class="about-games">
//             <div class="about">
//                 <a class="about__game" href="#game1" hrefTab="#game-1">
//                     <article class="about__game about__game_1-3">
//                         <img class="about__img" src="img/game1.jpeg" alt="игра 1">
//                         <div class="game-text">
//                             <p class="game-text__1">Игра № 1</p>
//                             <p class="game-text__2">Угадай число</p>
//                         </div>
//                     </article>
//                 </a>
//                 <a class="about__game" href="#game4" hrefTab="#game-4">
//                     <article class="about__game about__game_4-6">
//                         <img class="about__img" src="img/game4.jpeg" alt="игра 4">
//                         <div class="game-text">
//                             <p class="game-text__1">Игра №4</p>
//                             <p class="game-text__2">Камень, ножницы, <br> бумага</p>
//                         </div>
//                     </article>
//                 </a>
//             </div>
//             <div class="about">
//                 <a class="about__game" href="#game2" hrefTab="#game-2">
//                     <article class="about__game about__game_2-5">
//                         <img class="about__img" src="img/game2.jpeg" alt="игра 2">
//                         <div class="game-text">
//                             <p class="game-text__1">Игра № 2</p>
//                             <p class="game-text__2">Простая арифметика</p>
//                         </div>
//                     </article> 
//                 </a>
//                 <a class="about__game" href="#game5" hrefTab="#game-5">
//                     <article class="about__game about__game_2-5">
//                         <img class="about__img" src="img/game5.jpeg" alt="игра 5">
//                         <div class="game-text">
//                             <p class="game-text__1">Игра №5</p>
//                             <p class="game-text__2">Простая викторина</p>
//                         </div>
//                     </article>
//                 </a>
//             </div>
//             <div class="about">
//                 <a class="about__game" href="#game3" hrefTab="#game-3">
//                     <article class="about__game about__game_1-3">
//                         <img class="about__img" src="img/game3.jpeg" alt="игра 3">
//                         <div class="game-text">
//                             <p class="game-text__1">Игра №3</p>
//                             <p class="game-text__2">Переверни текст</p>
//                         </div>
//                     </article>
//                 </a>
//                 <a class="about__game" href="#game6" hrefTab="#game-6">
//                     <article class="about__game about__game_4-6">
//                         <img class="about__img" src="img/game6.jpeg" alt="игра 6">
//                         <div class="game-text">
//                             <p class="game-text__1">Игра №6</p>
//                             <p class="game-text__2">Генератор случайных цветов</p>
//                         </div>
//                     </article>
//                 </a>
//             </div>
//         </div>
//     </section>



  );
}