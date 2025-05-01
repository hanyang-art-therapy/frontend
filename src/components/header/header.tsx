// 코드가 너무 길어지는 것 이외에도 책임 분리가 필요하면 top-header, bottom-header 2개의 컴포넌트로 분리
import styles from '@/styles/header/header.module.scss';

export default function Header() {
  return (
    <header>
      <div className={styles.headerWrap}>
        <ul className={styles.siteWrap}>
          <li>
            <a href='#'>사이트맵</a>
          </li>
        </ul>

        <ul className={styles.btnWrap}>
          <li className={styles.loginBtn}>
            <a href='/signin'>로그인</a>
          </li>
          <li className={styles.myPageBtn}>
            <a href='/my-page'>마이페이지</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
