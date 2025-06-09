export default function IsFixedCheckbox({
  isFixed,
  setIsFixed,
}: {
  isFixed: boolean;
  setIsFixed: (checked: boolean) => void;
}) {
  return (
    <div className='flex items-center gap-2 mt-4'>
      <input
        type='checkbox'
        checked={isFixed}
        onChange={(e) => setIsFixed(e.target.checked)}
        id='isFixed'
        className='w-4 h-4 border-[#ddd] rounded border'
      />
      <label htmlFor='isFixed' className='font-semibold'>
        중요한 게시물로 설정
      </label>
    </div>
  );
}
