import SectionHeader from '@/components/enroll/common/section-header';

type MouTableData = {
  readonly institution: string;
  readonly field: string;
  readonly summary: string;
};

type MouTableProps = {
  title: string;
  description: string;
  headers: readonly string[];
  data: readonly MouTableData[];
};

export default function MouTable({ title, headers, data }: MouTableProps) {
  return (
    <div className='space-y-6'>
      <SectionHeader title={title} />

      <div className='overflow-hidden rounded-[5px] border border-bg-gray-d box-shadow-style'>
        <table className='w-full'>
          <thead>
            <tr className='bg-bg-gray-fa divide-x divide-bg-gray-d'>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className='p-2 sm:p-4 t-b-14 sm:t-b-16 text-center'
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className='border-t border-bg-gray-d divide-x divide-bg-gray-d text-center'
              >
                <td className='p-2 sm:p-4 t-m-14 sm:t-m-16 border-r border-bg-gray-d'>
                  {row.institution}
                </td>
                <td className='p-2 sm:p-4 t-r-12 sm:t-r-16 text-center'>
                  {row.field}
                </td>
                <td className='p-2 sm:p-4 t-r-12 sm:t-r-16 text-center'>
                  {row.summary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
