import { CURRICULUMS } from '@/constants/intro/curriculum';
import { parseTextWithBold } from '@/lib/helper/text-bolder';

export default function Reference() {
  const { notes } = CURRICULUMS;

  return (
    <div className='rounded-[5px]'>
      <div className='space-y-4'>
        {notes.map((note, index) => (
          <div key={index} className='bg-white rounded-md p-4'>
            <h4 className='t-b-16 mb-2'>- {note.title}</h4>
            <p className='t-r-14 pl-4'>{parseTextWithBold(note.content)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
