export default function TitleInput({
  title,
  setTitle,
}: {
  title: string;
  setTitle: (title: string) => void;
}) {
  return (
    <div className='flex items-center gap-2 flex-grow t-b-16'>
      <label className='font-semibold whitespace-nowrap w-[30px]'>제목</label>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='제목을 입력해주세요'
        className='w-[94%] border border-gray-300 rounded px-3 py-2'
      />
    </div>
  );
}
