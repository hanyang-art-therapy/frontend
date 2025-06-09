import IntroTitle from '@/components/intro/intro-title';
import IntroSection from '@/components/ui/section/intro-section';
import { PROSPECT } from '@/constants/intro/prospect';
import { useSmoothToTop } from '@/hooks/use-smooth-to-top';

export default function Prospect() {
  const { title, description, sections } = PROSPECT;

  useSmoothToTop();

  return (
    <div className='space-y-20 pt-15 min-h-screen-vh max-w-[1260px] mx-auto mt-15 xl:px-0 px-5'>
      <IntroTitle title='졸업 후 전망' />

      <IntroSection title={title} description={description} />

      <div className='grid gap-8 md:gap-10'>
        {sections.map((section, index) => (
          <div key={index} className='bg-white rounded-[5px] box-shadow-style'>
            <div></div>
            <div className='border-b border-bg-gray-d p-4 rounded-t-[5px]'>
              <div className='flex items-center'>
                <div className='w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center t-b-14 mr-3'>
                  {index + 1}
                </div>
                <h3 className='t-b-18'>{section.title}</h3>
              </div>
              <p className='text-gray-6 t-r-14 mt-2 ml-10'>
                {section.description}
              </p>
            </div>

            {/* <div className='p-6'>
                <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 list-disc list-inside'>
                  {section.subjects.map((subject, subIndex) => (
                    <li key={subIndex} className='px-3 py-2 t-r-14'>
                      {subject}
                    </li>
                  ))}
                </ul>
              </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
