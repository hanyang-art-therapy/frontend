import { CURRICULUMS } from '@/constants/intro/curriculum';

type CurriculumSection = (typeof CURRICULUMS.sections)[number];

type CurriculumProps = {
  section: CurriculumSection;
  index: number;
};

export default function Curriculum({ section, index }: CurriculumProps) {
  return (
    <div className='bg-white rounded-[5px] box-shadow-style'>
      <div className='border-b border-bg-gray-d p-4 rounded-t-[5px]'>
        <div className='flex items-center'>
          <div className='w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center t-b-14 mr-3'>
            {index + 1}
          </div>
          <h3 className='t-b-18'>{section.title}</h3>
        </div>
        <p className='text-gray-6 t-r-14 mt-2 ml-10'>{section.description}</p>
      </div>

      <div className='p-6'>
        <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 list-disc list-inside'>
          {section.subjects.map((subject, subIndex) => (
            <li key={subIndex} className='px-3 py-2 t-r-14'>
              {subject}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
