import SectionHeader from '@/components/enroll/common/section-header';

type ScholarshipData = {
  readonly discountRate: string;
  readonly condition: string;
};

type ScholarshipTableProps = {
  title: string;
  data: readonly ScholarshipData[];
};

export default function ScholarshipTable({
  title,
  data,
}: ScholarshipTableProps) {
  const formatCondition = (condition: string) => {
    return condition.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < condition.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className='space-y-6'>
      <SectionHeader title={title} />

      <div className='overflow-hidden rounded-lg border border-bg-gray-d box-shadow-style'>
        <table className='w-full'>
          <thead>
            <tr className='bg-bg-gray-fa'>
              <th className='p-4 sm:p-6 t-b-16 border-r border-bg-gray-d text-center'>
                감면율
              </th>
              <th className='p-4 sm:p-6 t-b-16 text-center'>자격 조건</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={index} className='border-t border-bg-gray-d'>
                <td className='p-4 sm:p-6 t-m-16 border-r border-bg-gray-d text-center align-top'>
                  <span className='inline-block px-3 py-1 bg-primary text-white rounded-[5px] t-b-14'>
                    {row.discountRate}
                  </span>
                </td>

                <td className='p-4 sm:p-6 t-r-14 text-left align-top'>
                  {formatCondition(row.condition)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
