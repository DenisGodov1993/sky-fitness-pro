'use client';

import styles from './signup.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
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
      <Link href="/fitness/main">
        <div className={styles.modal__logo}>
          <Image
            src="/img/logo.svg"
            alt="logo"
            width={220}
            height={35}
            priority
          />
        </div>
      </Link>

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
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className={styles.btn__enter}
          >
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
          <Link href={'/auth/signin'} className={styles.btn__signup}>
            Войти
          </Link>
        </div>
      </div>
    </>
  );
}

// 'use client';

// import { useState } from 'react';
// import styles from './signup.module.css';
// import Link from 'next/link';
// import Image from 'next/image';
// import { registerUser, loginUser } from '@/services/auth/authApi';
// import { AxiosError } from 'axios';
// import { useRouter } from 'next/navigation';
// import { useAppDispatch } from '@/store/store';
// import { setUser } from '@/store/features/authSlice';

// export default function SignUp() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();
//   const dispatch = useAppDispatch();

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

//   const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (!email || !password || !repeatPassword) {
//       return setErrorMessage('Заполните все поля');
//     }

//     if (password !== repeatPassword) {
//       return setErrorMessage('Пароли не совпадают');
//     }

//     const passwordError = validatePassword(password);
//     if (passwordError) return setErrorMessage(passwordError);

//     setIsLoading(true);

//     try {
//       await registerUser({ email, password });

//       const res = await loginUser({ email, password });

//       dispatch(
//         setUser({
//           id: res.userId,
//           username: email,
//           token: res.token,
//         }),
//       );
//       localStorage.setItem('username', email);
//       localStorage.setItem('token', res.token);
//       localStorage.setItem('userId', res.userId);

//       router.push('/fitness/main');

//       // router.push('/auth/signin');
//     } catch (error) {
//       if (error instanceof AxiosError && error.response) {
//         setErrorMessage(error.response.data.message);
//       } else {
//         setErrorMessage('Ошибка регистрации');
//       }
//     } finally {
//       setIsLoading(false);
//     }
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
//             type="email"
//             placeholder="Почта"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             className={styles.input__field}
//             type="password"
//             placeholder="Пароль"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <input
//             className={styles.input__field}
//             type="password"
//             placeholder="Повторите пароль"
//             value={repeatPassword}
//             onChange={(e) => setRepeatPassword(e.target.value)}
//           />

//           {errorMessage && (
//             <div className={styles.errorContainer}>{errorMessage}</div>
//           )}
//         </div>

//         <div className={styles.login__btn}>
//           <button
//             onClick={onSubmit}
//             disabled={isLoading}
//             className={styles.btn__enter}
//           >
//             {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
//           </button>
//           <Link href={'/auth/signin'} className={styles.btn__signup}>
//             Войти
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }
