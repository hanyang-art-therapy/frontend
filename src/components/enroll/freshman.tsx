import { ContactInfo, FinalMessageSection } from '@/components/enroll/common';
import {
  ClassInfoSection,
  EnrollTable,
  FeaturesSection,
} from '@/components/enroll/freshman/index';
import IntroTitle from '@/components/intro/intro-title';
import BoxListSection from '@/components/ui/section/box-list-section';
import QuoteSection from '@/components/ui/section/quote-section';
import { FRESHMAN_CONSTANTS } from '@/constants/enroll/freshman';

export default function Freshman() {
  const {
    quote,
    target,
    features,
    schedule,
    qualifications,
    tuition,
    classInfo,
    contact,
    finalMessage,
  } = FRESHMAN_CONSTANTS;

  return (
    <div className='md:max-w-[1260px] mx-auto mt-15 pt-[60px] xl:px-0 px-5'>
      <IntroTitle title='신입학생 모집' />

      <div className='space-y-20'>
        {/* 첫 번째 섹션 */}
        <QuoteSection content={quote.content} />

        {/* 두 번째 섹션: 미술치료학과 모집 대상 */}
        <BoxListSection
          title={target.title}
          contents={target.items}
          icon={target.icon}
        />

        {/* 세 번째 섹션: 학과의 특징 */}
        <FeaturesSection features={features} />

        {/* 네 번째 섹션: 모집 일정 */}
        <EnrollTable
          title={schedule.title}
          headers={schedule.headers}
          data={schedule.data}
        />

        {/* 다섯 번째 섹션: 지원 자격 */}
        <BoxListSection
          title={qualifications.title}
          contents={qualifications.items}
          icon={qualifications.icon}
        />

        {/* 섹션 6: 등록금 및 장학 혜택 */}
        <EnrollTable
          title={tuition.title}
          headers={tuition.headers}
          data={tuition.data}
        />

        {/* 섹션 7: 수업 안내 */}
        <ClassInfoSection title={classInfo.title} data={classInfo.data} />

        {/* 섹션 8: 문의 */}

        <ContactInfo title={contact.title} data={contact.data} />

        <FinalMessageSection
          primary={finalMessage.primary}
          secondary={finalMessage.secondary}
        />
      </div>
    </div>
  );
}
