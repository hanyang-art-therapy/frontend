import styles from '@/styles/nav/nav.module.scss';

export default function Nav() {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.iconWrap}>
        {/* 왼쪽 로고 */}
        <ul className={styles.logoWrap}>
          <li>
            <a href='/'>
              <img src='/images/logo.webp' alt='logo' />
              <span>미술치료학과</span>
            </a>
          </li>
        </ul>

        {/* 오른쪽 메뉴 */}
        <ul className={styles.menuWrap}>
          <li>
            <a href='#'>학과소개</a>
          </li>
          <li>
            <a href='#'>임상활동</a>
          </li>
          <li>
            <a href='/gallery'>ART+THERAPY 展</a>
          </li>
          <li>
            <a href='#'>입학안내</a>
          </li>
          <li>
            <a href='#'>자유게시판</a>
          </li>
          <li>
            <a href='#'>돋보기</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
