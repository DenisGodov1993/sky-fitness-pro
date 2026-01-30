'use client';

import styles from './signup.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { registerUser, loginUser } from '@/services/auth/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { setUser } from '@/store/features/authSlice';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const validatePassword = (password: string): string | null => {
    if (password.length < 6)
      return 'Пароль должен содержать не менее 6 символов';
    const specialChars = password.match(/[^A-Za-z0-9]/g)?.length || 0;
    if (specialChars < 2)
      return 'Пароль должен содержать не менее 2 спецсимволов';
    if (!/[A-Z]/.test(password))
      return 'Пароль должен содержать как минимум одну заглавную букву';
    return null;
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password || !repeatPassword) {
      return setErrorMessage('Заполните все поля');
    }

    if (password !== repeatPassword) {
      return setErrorMessage('Пароли не совпадают');
    }

    const passwordError = validatePassword(password);
    if (passwordError) return setErrorMessage(passwordError);

    setIsLoading(true);

    try {
      await registerUser({ email, password });

      const res = await loginUser({ email, password });

      dispatch(
        setUser({
          username: email,
          token: res.token,
        }),
      );

      router.push('/auth/signin');
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Ошибка регистрации');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <a href="/fitness/main">
        <div className={styles.modal__logo}>
          <Image src="/img/logo.svg" alt="logo" width={220} height={35} priority />
        </div>
      </a>

      <div className={styles.modal__login}>
        <div className={styles.login__input}>
          <input
            className={styles.input__field}
            type="email"
            placeholder="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input__field}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={styles.input__field}
            type="password"
            placeholder="Повторите пароль"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />

          {errorMessage && (
            <div className={styles.errorContainer}>{errorMessage}</div>
          )}
        </div>

        <div className={styles.login__btn}>
          <button onClick={onSubmit} disabled={isLoading} className={styles.btn__enter}>
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
          <Link href="/auth/signin" className={styles.btn__signup}>
            Войти
          </Link>
        </div>
      </div>
    </>
  );
}


// 'use client';

// import styles from './signup.module.css';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ChangeEvent, useState } from 'react';
// import { registerUser } from '@/services/auth/authApi';
// import { AxiosError } from 'axios';
// import { useRouter } from 'next/navigation';

// export default function SignUp() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const onChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
//     setRepeatPassword(e.target.value);
//   };

//   // Проверка пароля по требованиям API
//   const validatePassword = (password: string): string | null => {
//     if (password.length < 6)
//       return 'Пароль должен содержать не менее 6 символов';
//     const specialChars = password.match(/[^A-Za-z0-9]/g)?.length || 0;
//     if (specialChars < 2)
//       return 'Пароль должен содержать не менее 2 спецсимволов';
//     if (!/[A-Z]/.test(password))
//       return 'Пароль должен содержать как минимум одну заглавную букву';
//     return null;
//   };

//   const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (!email.trim() || !password.trim() || !repeatPassword.trim()) {
//       return setErrorMessage('Заполните все поля');
//     }

//     if (password !== repeatPassword) {
//       return setErrorMessage('Пароли не совпадают');
//     }

//     const passwordError = validatePassword(password);
//     if (passwordError) {
//       return setErrorMessage(passwordError);
//     }

//     setIsLoading(true);

//     registerUser({ email, password })
//       .then(() => {
//         alert('Регистрация прошла успешно Войдите в аккаунт.');
//         router.push('/auth/signin');
//       })
//       .catch((error) => {
//         if (error instanceof AxiosError) {
//           if (error.response) {
//             setErrorMessage(
//               error.response.data.message || 'Ошибка регистрации',
//             );
//           } else if (error.request) {
//             setErrorMessage('Нет соединения с сервером');
//           } else {
//             setErrorMessage('Произошла ошибка');
//           }
//         } else {
//           setErrorMessage('Неизвестная ошибка');
//         }
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <>
//       <a href="/fitness/main">
//         <div className={styles.modal__logo}>
//           <Image
//             src="/img/logo.svg"
//             alt="logo"
//             width={220}
//             height={35}
//             priority
//             style={{ width: 'auto', height: 'auto' }}
//           />
//         </div>
//       </a>
//       <div className={styles.modal__login}>
//         <div className={styles.login__input}>
//           <input
//             className={styles.input__field}
//             type="email"
//             name="email"
//             placeholder="Почта"
//             value={email}
//             onChange={onChangeEmail}
//             disabled={isLoading}
//           />
//           <input
//             className={styles.input__field}
//             type="password"
//             name="password"
//             placeholder="Пароль"
//             value={password}
//             onChange={onChangePassword}
//             disabled={isLoading}
//           />
//           <input
//             className={styles.input__field}
//             type="password"
//             name="repeatPassword"
//             placeholder="Повторите пароль"
//             value={repeatPassword}
//             onChange={onChangeRepeatPassword}
//             disabled={isLoading}
//           />
//           {errorMessage && (
//             <div className={styles.errorContainer}>{errorMessage}</div>
//           )}
//         </div>

//         <div className={styles.login__btn}>
//           <button
//             type="button"
//             disabled={isLoading}
//             onClick={onSubmit}
//             className={styles.btn__enter}
//           >
//             {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
//           </button>
//           <Link href="/auth/signin" className={styles.btn__signup}>
//             Войти
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }

// 'use client';

// import styles from './signup.module.css';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ChangeEvent, useState } from 'react';
// import { registerUser } from '@/services/auth/authApi';
// import { AxiosError } from 'axios';

// export default function SignUp() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const onChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
//     setRepeatPassword(e.target.value);
//   };

//   const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (!email.trim() || !password.trim() || !repeatPassword.trim()) {
//       return setErrorMessage('Заполните все поля');
//     }

//     if (password !== repeatPassword) {
//       return setErrorMessage('Пароли не совпадают');
//     }

//     setIsLoading(true);

//     registerUser({ email, password })
//       .then((res) => {
//         console.log(res);
//         // можно сделать редирект на login
//         // router.push('/auth/signin');
//       })
//       .catch((error) => {
//         if (error instanceof AxiosError) {
//           if (error.response) {
//             setErrorMessage(error.response.data.message);
//           } else if (error.request) {
//             setErrorMessage('Интернет отсутствует, попробуйте позже');
//           } else {
//             setErrorMessage('Неизвестная ошибка');
//           }
//         }
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <>
//       <a href="/fitness/main">
//         <div className={styles.modal__logo}>
//           <Image
//             src="/img/logo.svg"
//             alt="logo"
//             width={220}
//             height={35}
//             priority
//           />
//         </div>
//       </a>
//       <div className={styles.modal__login}>
//         <div className={styles.login__input}>
//           <input
//             className={styles.input__field}
//             type="text"
//             name="login"
//             placeholder="Почта"
//             value={email}
//             onChange={onChangeEmail}
//           />
//           <input
//             className={styles.input__field}
//             type="password"
//             name="password"
//             placeholder="Пароль"
//             value={password}
//             onChange={onChangePassword}
//           />
//           <input
//             className={styles.input__field}
//             type="password"
//             name="repeatPassword"
//             placeholder="Повторите пароль"
//             value={repeatPassword}
//              onChange={onChangeRepeatPassword}
//           />
//           <div className={styles.errorContainer}>{errorMessage}</div>
//         </div>

//         <div className={styles.login__btn}>
//           <button
//             type="button"
//             disabled={isLoading}
//             onClick={onSubmit}
//             className={styles.btn__enter}
//           >
//             Зарегистрироваться
//           </button>
//           <Link href={'/auth/signin'} className={styles.btn__signup}>
//             Войти
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }

// import styles from './signup.module.css';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function SignUp() {
//   return (
//     <>
//       <a href="/fitness/main">
//         <div className={styles.modal__logo}>
//           <Image
//             src="/img/logo.svg"
//             alt="logo"
//             width={220}
//             height={35}
//             priority
//           />
//         </div>
//       </a>
//       <div className={styles.modal__login}>
//         <div className={styles.login__input}>
//           <input
//             className={styles.input__field}
//             type="text"
//             name="login"
//             placeholder="Почта"
//           />
//           <input
//             className={styles.input__field}
//             type="password"
//             name="password"
//             placeholder="Пароль"
//           />
//           <input
//             className={styles.input__field}
//             type="password"
//             name="password"
//             placeholder="Повторите пароль"
//           />
//           <div className={styles.errorContainer}>{/*Блок для ошибок*/}</div>
//         </div>

//         <div className={styles.login__btn}>
//           <button className={styles.btn__enter}>Зарегистрироваться</button>
//           <Link href={'/auth/signin'} className={styles.btn__signup}>
//             Войти
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }
