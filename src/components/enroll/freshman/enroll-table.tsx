import { Link } from 'react-router-dom';
import { SquareArrowOutUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/enroll/common';

type EnrollTableData = {
  readonly category: string;
  readonly content: string;
  readonly link?: string;
  readonly highlight?: string;
};

type EnrollTableProps = {
  title: string;
  headers: readonly string[];
  data: readonly EnrollTableData[];
};

export default function EnrollTable({
  title,
  headers,
  data,
}: EnrollTableProps) {
  const renderCellContent = (row: EnrollTableData) => {
    if (row.link) {
      return (
        <Link
          to={row.link}
          target='_blank'
          className='underline hover:text-primary transition-colors flex justify-center items-center gap-2'
        >
          <SquareArrowOutUpRight className='w-4 h-4' />
          {row.content}
        </Link>
      );
    }

    if (row.highlight) {
      return (
        <>
          {row.content} <span className='t-b-16'>{row.highlight}</span>
        </>
      );
    }

    return row.content;
  };

  return (
    <div className='space-y-6'>
      <SectionHeader title={title} />

      <div className='overflow-hidden rounded-[5px] border border-bg-gray-d box-shadow-style'>
        <table className='w-full'>
          <thead>
            <tr className='bg-bg-gray-fa divide-x divide-bg-gray-d'>
              {headers.map((header, index) => (
                <th key={index} className='p-2 sm:p-4 t-b-16 text-center'>
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={index} className='border-t border-bg-gray-d text-center'>
                <td className='p-4 t-m-16 border-r border-bg-gray-d'>
                  {row.category}
                </td>
                <td className='p-4 t-r-16 text-center'>
                  {renderCellContent(row)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
