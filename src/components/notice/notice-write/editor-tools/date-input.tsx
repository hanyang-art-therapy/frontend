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
    <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
      {/* 시작일 */}
      <div className='flex items-center md:gap-2 pr-[10px] md:pr-0'>
        <label className='t-b-16 whitespace-nowrap t-b-16 w-[40px] mr-[8px] md:mr-0'>
          시작일
        </label>
        <input
          type='date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          onClick={(e) => e.currentTarget.showPicker()}
          className='border-2 border-bg-gray-d/60 rounded px-3 py-2 md:w-auto min-w-[160px]'
        />
      </div>

      {/* 종료일 */}
      <div className='flex items-center md:gap-2'>
        <label className='whitespace-nowrap t-b-16 w-[40px] mr-[8px] md:mr-0'>
          종료일
        </label>
        <input
          type='date'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          onClick={(e) => e.currentTarget.showPicker()}
          className='border-2 border-bg-gray-d/60 rounded px-3 py-2 md:w-auto min-w-[160px]'
        />
      </div>
    </div>
  );
}
