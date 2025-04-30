// 코드가 너무 길어지는 것 이외에도 책임 분리가 필요하면 top-header, bottom-header 2개의 컴포넌트로 분리
import '../../styles/header.scss';

export default function Header() {
  return (
    <header>
      <ul>
        <li>
          <a href='#'>사이트맵</a>
        </li>
        <div className='btn-wrap'>
          <li>
            <a href='#'>로그인</a>
          </li>
          <li>
            <a href='#'>마이페이지</a>
          </li>
        </div>
      </ul>
    </header>
  );
}
