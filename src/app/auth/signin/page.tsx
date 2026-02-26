'use client';

import styles from './signin.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { loginUser } from '@/services/auth/authApi';
import { AxiosError } from 'axios';
import { useAppDispatch } from '@/store/store';
import { setUser } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Заполните все поля');
      return;
    }

    setIsLoading(true);

    try {
      const res = await loginUser({ email, password });

      // сохраняем токен
      localStorage.setItem('username', email);
      localStorage.setItem('token', res.token);

      dispatch(
        setUser({
          username: email,
          token: res.token,
        }),
      );

      router.push('/fitness/main');
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Ошибка авторизации');
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

          {errorMessage && (
            <div className={styles.errorContainer}>{errorMessage}</div>
          )}
        </div>
        <div className={styles.login__btn}>
          <button
            disabled={isLoading}
            onClick={onSubmit}
            className={styles.btn__enter}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>

          <Link href="/auth/signup" className={styles.btn__signup}>
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </>
  );
}

// 'use client';

// import { useState } from 'react';
// import { useAppDispatch } from '@/store/store';
// import { setUser } from '@/store/features/authSlice';
// import { useRouter } from 'next/navigation';
// import { loginUser } from '@/services/auth/authApi';
// import { AxiosError } from 'axios';
// import Link from 'next/link';
// import Image from 'next/image';
// import styles from './signin.module.css';

// export default function SignIn() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (!email.trim() || !password.trim()) {
//       setErrorMessage('Заполните все поля');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const res = await loginUser({ email, password });

//       // предполагаем, что API возвращает { token: string, userId: string }
//       dispatch(
//         setUser({
//           username: email,
//           token: res.token,
//           id: res.userId,
//         }),
//       );

//       localStorage.setItem('username', email);
//       localStorage.setItem('token', res.token);
//       localStorage.setItem('userId', res.userId);

//       router.push('/fitness/main');
//     } catch (error) {
//       if (error instanceof AxiosError && error.response) {
//         setErrorMessage(error.response.data.message);
//       } else {
//         setErrorMessage('Ошибка авторизации');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Link href="/fitness/main">
//         <div className={styles.modal__logo}>
//           <Image src="/img/logo.svg" alt="logo" width={220} height={35} />
//         </div>
//       </Link>

//       <div className={styles.modal__login}>
//         <input
//           type="email"
//           placeholder="Почта"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={styles.input__field}
//         />
//         <input
//           type="password"
//           placeholder="Пароль"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className={styles.input__field}
//         />
//         {errorMessage && (
//           <div className={styles.errorContainer}>{errorMessage}</div>
//         )}
//         <button
//           onClick={onSubmit}
//           disabled={isLoading}
//           className={styles.btn__enter}
//         >
//           {isLoading ? 'Вход...' : 'Войти'}
//         </button>
//         <Link href="/auth/signup" className={styles.btn__signup}>
//           Зарегистрироваться
//         </Link>
//       </div>
//     </>
//   );
// }

// 'use client';

// import styles from './signin.module.css';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useState } from 'react';
// import { loginUser } from '@/services/auth/authApi';
// import { AxiosError } from 'axios';
// import { useAppDispatch } from '@/store/store';
// import { setUser } from '@/store/features/authSlice';
// import { useRouter } from 'next/navigation';

// export default function SignIn() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (!email.trim() || !password.trim()) {
//       setErrorMessage('Заполните все поля');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const res = await loginUser({ email, password });

//       dispatch(
//         setUser({
//           username: email,
//           token: res.token,
//           id: res.userId,
//         }),
//       );

//       // сохраняем токен
//       localStorage.setItem('username', email);
//       localStorage.setItem('token', res.token);
//       localStorage.setItem('userId', res.userId);

//       router.push('/fitness/main');
//     } catch (error) {
//       if (error instanceof AxiosError && error.response) {
//         setErrorMessage(error.response.data.message);
//       } else {
//         setErrorMessage('Ошибка авторизации');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Link href="/fitness/main">
//         <div className={styles.modal__logo}>
//           <Image src="/img/logo.svg" alt="logo" width={220} height={35} />
//         </div>
//       </Link>

//       <div className={styles.modal__login}>
//         <input
//           className={styles.input__field}
//           type="email"
//           placeholder="Почта"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           className={styles.input__field}
//           type="password"
//           placeholder="Пароль"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {errorMessage && (
//           <div className={styles.errorContainer}>{errorMessage}</div>
//         )}

//         <button
//           disabled={isLoading}
//           onClick={onSubmit}
//           className={styles.btn__enter}
//         >
//           {isLoading ? 'Вход...' : 'Войти'}
//         </button>

//         <Link href="/auth/signup" className={styles.btn__signup}>
//           Зарегистрироваться
//         </Link>
//       </div>
//     </>
//   );
// }
