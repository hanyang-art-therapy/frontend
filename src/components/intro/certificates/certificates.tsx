import { CERTIFICATES } from '@/constants/intro/certificates';
import IntroTitle from '@/components/intro/intro-title';
import { CircleCheck } from 'lucide-react';

export default function Certificates() {
  return (
    <div className='max-w-[1080px] mx-auto mt-15 pt-[60px]'>
      <IntroTitle title='자격사항' />
      <p className='mb-4 p-4 text-gray'>
        미술치료는 예술적 표현을 통해 정서적·심리적 치유를 돕는 전문 분야로,
        자격증 취득은 전문가로서의 첫걸음입니다. 한양대학교 ERICA
        미술치료학과에서는 다양한 자격증 과정을 통해 여러분의 진로 확장을 적극
        지원하고 있습니다.
      </p>

      <ul className='list-none'>
        {CERTIFICATES.map((certificate) => (
          <li
            key={certificate.title}
            className='bg-white shadow-md rounded-xl p-4 mb-4'>
            <h3 className='title-b-18 mb-2 flex items-center gap-2'>
              <CircleCheck className='text-primary' /> {certificate.title}
            </h3>

            <p className='text-gray'>{certificate.description}</p>
            {certificate?.checklist && (
              <ul className='list-disc list-inside text-gray mt-2 space-y-1'>
                {certificate.checklist.map((checklistItem) => (
                  <li key={checklistItem}>{checklistItem}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <p className='p-4 mt-6 text-gray'>
        자격증 취득을 위해서는 학업과 실습을 체계적으로 계획하는 것이 중요하며,
        졸업 후에도 지속적인 전문성 개발을 위한 노력이 필요합니다.
      </p>
    </div>
  );
}
