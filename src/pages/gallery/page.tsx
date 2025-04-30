import { useState } from 'react';
import '../../styles/gallery.scss';

export default function GalleryPage() {
  // 각 메뉴 상태 관리 useState
  interface MenuState {
    기수별: boolean;
    연도별: boolean;
    작가명: boolean;
  }

  const [isOpen, setIsOpen] = useState<MenuState>({
    기수별: false,
    연도별: false,
    작가명: false,
  });

  // 토글 함수 (메뉴 열기/닫기)

  const toggleMenu = (menu: keyof MenuState) => {
    setIsOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // 검색어 처리 로직

  const handleSearch = () => {
    console.log('검색어:', searchQuery);
  };

  const artworkImages = [
    '/images/art1.jpg',
    '/images/art2.jpg',
    '/images/art3.jpg',
    '/images/art4.jpg',
    '/images/art5.jpg',
    '/images/art6.jpg',
    '/images/art7.jpg',
    '/images/art8.jpg',
    '/images/art9.jpg',
    '/images/art10.jpeg',
    '/images/art11.jpg',
    '/images/art12.jpg',
  ];

  return (
    <div className='gallery-wrap'>
      <div className='banner'>
        <span>ART+THERAPY 展</span>
      </div>
      <div className='top-content'>
        <ul className='main-menu'>
          <li className='submenu'>
            <a
              href='#'
              className='menu-text'
              onClick={() => toggleMenu('기수별')}>
              기수별
            </a>
            {isOpen['기수별'] && (
              <ul className='menu-drop-text'>
                <li>
                  <a href='#'>25기</a>
                </li>
                <li>
                  <a href='#'>26기</a>
                </li>
                <li>
                  <a href='#'>27기</a>
                </li>
                <li>
                  <a href='#'>28기</a>
                </li>
                <li>
                  <a href='#'>29기</a>
                </li>
                <li>
                  <a href='#'>30기</a>
                </li>
                <li>
                  <a href='#'>31기</a>
                </li>
              </ul>
            )}
          </li>
          <li className='submenu'>
            <a
              href='#'
              className='menu-text'
              onClick={() => toggleMenu('연도별')}>
              연도별
            </a>
            {isOpen['연도별'] && (
              <ul className='menu-drop-text'>
                <li>
                  <a href='#'>2020</a>
                </li>
                <li>
                  <a href='#'>2021</a>
                </li>
                <li>
                  <a href='#'>2022</a>
                </li>
                <li>
                  <a href='#'>2023</a>
                </li>
                <li>
                  <a href='#'>2024</a>
                </li>
                <li>
                  <a href='#'>2025</a>
                </li>
              </ul>
            )}
          </li>
          <li className='submenu'>
            <a
              href='#'
              className='menu-text'
              onClick={() => toggleMenu('작가명')}>
              작가명
            </a>
            {isOpen['작가명'] && (
              <ul className='menu-drop-text'>
                <li>
                  <a href='#'>제목</a>
                </li>
                <li>
                  <a href='#'>본문</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
        <div className='search-bar'>
          <input
            type='search'
            name='searchQuery'
            id='search-input'
            placeholder='검색어를 입력하세요...'
            value={searchQuery}
            onChange={handleChange}
            aria-label='Search'
          />
        </div>
        <button onClick={handleSearch} aria-label='Search button'>
          검색
        </button>
      </div>
      <div className='main-content'>
        <div className='gallery-box-inner'>
          {artworkImages.map((src, i) => (
            <div className='artwork-box' key={i}>
              <div className='artwork'>
                <img src={src} alt={`${i + 1}번 작품`} />
              </div>
              <span>{i + 1}번 작품</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
