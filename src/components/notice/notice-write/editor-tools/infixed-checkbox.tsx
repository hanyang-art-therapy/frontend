export default function IsFixedCheckbox({
  isFixed,
  setIsFixed,
}: {
  isFixed: boolean;
  setIsFixed: (checked: boolean) => void;
}) {
  return (
    <div className='flex items-center gap-2 m-2'>
      <input
        type='checkbox'
        checked={isFixed}
        onChange={(e) => setIsFixed(e.target.checked)}
        id='isFixed'
        className='w-4 h-4 border-2 border-bg-gray-d/60 rounded'
      />
      <label htmlFor='isFixed' className='t-b-16'>
        중요한 게시물로 설정
      </label>
    </div>
  );
}
