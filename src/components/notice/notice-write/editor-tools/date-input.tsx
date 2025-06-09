export default function DateInput({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}) {
  return (
    <div className='flex'>
      {/* 시작일 */}
      <div className='flex items-center gap-2 pr-[10px] md:pr-0'>
        <label className='font-semibold whitespace-nowrap t-b-16 w-[40px] mr-[8px] md:mr-0'>
          시작일
        </label>
        <input
          type='date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className='border border-gray-300 rounded px-3 py-2 w-[100px] md:w-[140px]'
        />
      </div>

      {/* 종료일 */}
      <div className='flex items-center gap-2'>
        <label className='whitespace-nowrap t-b-16 w-[40px] mr-[8px] md:mr-0'>
          종료일
        </label>
        <input
          type='date'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className='border border-gray-300 rounded px-3 py-2 w-[100px] md:w-[140px]'
        />
      </div>
    </div>
  );
}
