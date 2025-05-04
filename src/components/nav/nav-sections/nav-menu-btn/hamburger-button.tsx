import { useState } from 'react';

export default function HamburgerButton({ onClick }: { onClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onClick(); // 외부 토글 상태도 전달
  };

  return (
    <>
      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={handleToggle}
        aria-label='모바일 메뉴 열기'>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  );
}
