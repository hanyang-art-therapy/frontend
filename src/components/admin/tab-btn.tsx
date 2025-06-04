export type TabType = 'view' | 'form';

interface TabButtonProps {
  isSelected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}

export default function TabButton({
  isSelected,
  onSelect,
  children,
}: TabButtonProps) {
  return (
    <button
      className={`relative py-[15px] inline-block px-[15px] cursor-pointer t-m-16
    ${isSelected ? 'text-primary t-b-16' : 'text-gray-9 hover:text-gray-6'}
  `}
      onClick={onSelect}
    >
      <span
        className={`after:content-[""] after:absolute after:left-0 after:bottom-[5px] after:h-[3px] after:bg-bg-primary after:transition-all after:duration-500
      ${isSelected ? 'after:w-full t-b-16' : 'after:w-0'}
    `}
      >
        {children}
      </span>
    </button>
  );
}
