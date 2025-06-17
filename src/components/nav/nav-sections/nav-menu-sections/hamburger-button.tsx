type HamburgerButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function HamburgerButton({
  isOpen,
  onClick,
}: HamburgerButtonProps) {
  return (
    <button
      className={`hamburger ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label='모바일 메뉴 열기'
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}
