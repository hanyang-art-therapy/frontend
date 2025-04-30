import '../../styles/nav.scss';
import Logo from '../../images/logo.png';

export default function Nav() {
  return (
    <nav className='nav-container'>
      <div className='icon-wrap'>
        {/* 왼쪽 로고 */}
        <ul className='logo-wrap'>
          <li>
            <a href='/'>
              <img src={Logo} alt='logo' />
              <span>미술치료학과</span>
            </a>
          </li>
        </ul>

        {/* 오른쪽 메뉴 */}
        <ul className='menu-wrap'>
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
            <a href='#'>입학 안내</a>
          </li>
          <li>
            <a href='#'>자유 게시판</a>
          </li>
          <li>
            <a href='#'>돋보기</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
