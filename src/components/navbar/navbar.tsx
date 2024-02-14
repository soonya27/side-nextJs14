import Link from 'next/link';
import styles from './navbar.module.css';


export default function Navbar() {
  return (
    <header className={styles.header}>
      <h1>
        <Link href="/">LOGO</Link>
      </h1>
      <ul className={styles.navbar}>
        <li></li>
        <li><Link href="/boards">시공 견적후기</Link></li>
        <li><Link href="/community">인테리어 이야기</Link></li>
      </ul>
      <ul className={styles.util}>
        <li><button type="button">찾기</button></li>
        <li><Link href="/join">회원가입</Link></li>
        <li><Link href="/login">로그인</Link></li>
      </ul>

    </header>
  );
}
