// import Link from 'next/link';

// export default function NotFound() {
//   return <Link href={'/fitness/main'}>На главную</Link>;
// }

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: 40 }}>
      <h1>404 — Страница не найдена</h1>
      <p>Такой страницы не существует.</p>

      <Link href="/fitness/main">
        Вернуться на главную
      </Link>
    </div>
  );
}