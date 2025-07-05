export default function IsFixedCheckbox({
  isFixed,
  setIsFixed,
}: {
  isFixed: boolean;
  setIsFixed: (checked: boolean) => void;
}) {
  return (
    <div className='flex items-center gap-2'>
      <input
        type='checkbox'
        checked={isFixed}
        onChange={(e) => setIsFixed(e.target.checked)}
        id='isFixed'
        className='w-4 h-4 border-2 border-bg-gray-d/60 rounded'
      />
      <label htmlFor='isFixed' className='t-b-16 hidden md:block'>
        이 게시물을 상단에 고정
      </label>
      <label htmlFor='isFixed' className='t-b-16 block md:hidden'>
        상단 고정
      </label>
    </div>
  );
}
