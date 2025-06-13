import { ContactInfo, FinalMessageSection } from '@/components/enroll/common';
import { ScholarshipTable } from '@/components/enroll/scholarship/index';
import IntroTitle from '@/components/intro/intro-title';
import BoxListSection from '@/components/ui/section/box-list-section';
import IntroSection from '@/components/ui/section/intro-section';
import { SCHOLARSHIP_CONSTANTS } from '@/constants/enroll/scholarship';

export default function Scholarship() {
  const { sections } = SCHOLARSHIP_CONSTANTS;
  const {
    intro,
    basicConditions,
    scholarshipTypes,
    applicationInfo,
    contact,
    finalMessage,
  } = sections;

  return (
    <div className='md:max-w-[1260px] mx-auto mt-15 pt-[60px] xl:px-0 px-5'>
      <IntroTitle title='장학금 혜택' />

      <div className='space-y-20'>
        {/* 소개 섹션 */}
        <IntroSection title={intro.title} description={intro.description} />

        {/* 기본 조건 섹션 */}
        <BoxListSection
          title={basicConditions.title}
          contents={basicConditions.items}
          icon={basicConditions.icon}
        />

        {/* 장학금 종류 섹션 */}
        <ScholarshipTable
          title={scholarshipTypes.title}
          data={scholarshipTypes.data}
        />

        {/* 신청 방법 및 유의사항 섹션 */}
        <BoxListSection
          title={applicationInfo.title}
          contents={applicationInfo.items}
          icon={applicationInfo.icon}
        />

        {/* 문의 섹션 */}
        <ContactInfo title={contact.title} data={contact.data} />

        <FinalMessageSection
          primary={finalMessage.primary}
          secondary={finalMessage.secondary}
        />
      </div>
    </div>
  );
}
