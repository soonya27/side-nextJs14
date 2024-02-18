'use client';
import Link from 'next/link';
import styles from './navbar.module.css';
import { usePathname } from 'next/navigation';


const navList = [
  { text: '시공 견적후기', href: '/boards' },
  { text: '인테리어 이야기', href: '/community' },
]


export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <h1>
        <Link href="/">LOGO</Link>
      </h1>
      <ul className={styles.navbar}>
        {
          navList.map(({ text, href }) => (
            <li className={`${pathname === href && styles.navbarClicked}`}>
              <Link href={href}>{text}</Link>
            </li>
          ))
        }
      </ul>
      <ul className={styles.util}>
        <li><button type="button">찾기</button></li>
        <li><Link href="/join">회원가입</Link></li>
        <li><Link href="/login">로그인</Link></li>
      </ul>

    </header>
  );
}
