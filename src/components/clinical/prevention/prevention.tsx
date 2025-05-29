import ClinicalNav from '@/components/clinical/clinical-nav';
import Section from '@/components/common/section';
import { useLocation } from 'react-router-dom';

export default function Prevention() {
  const location = useLocation();
  const pathName = location.pathname.split('/').pop() ?? 'prevention';

  return (
    <div className='md:max-w-[1260px] mx-auto mt-15  xl:px-0 px-5'>
      <Section category={pathName} path='clinical' />
      <ClinicalNav category={pathName} />
    </div>
  );
}
