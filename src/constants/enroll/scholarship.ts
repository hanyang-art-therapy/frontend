import { FileText, Globe, Info, Phone } from 'lucide-react';

export const SCHOLARSHIP_CONSTANTS = {
  sections: {
    intro: {
      title: '장학금 혜택 안내',
      description: [
        '한양대학교 ERICA 융합산업대학원 미술치료학과는 학업의 부담을 덜고 전문성 향상을 위한 학업에 집중할 수 있도록',
        '**다양한 장학금 제도를 운영하고 있습니다.**',
      ],
    },
    basicConditions: {
      title: '장학금 지원 기본 조건',
      items: [
        {
          title: '본 대학원 재학생(휴학생,  수료생 제외)',
        },
        {
          title: '직전학기 평균 B학점(3.0) 이상 (※ 신입생은 성적 기준 없음)',
        },
        {
          title:
            '중복 수혜 불가: 여러 항목에 해당될 경우 가장 높은 감면율 1가지만 적용',
        },
      ],
      icon: Info,
    },
    scholarshipTypes: {
      title: '신입생 대상 주요 장학금 종류',
      data: [
        {
          discountRate: '50% 감면',
          condition:
            '공공기관 재직자 중 해당 기관의 요청에 따라 추천된 자 (예: 안산시청, 시흥시청 등)',
        },
        {
          discountRate: '40% 감면',
          condition:
            '한양대학교 서울 캠퍼스, ERICA 학부 졸업(예정)자, 한양사이버대학교 졸업',
        },
        {
          discountRate: '30% 감면',
          condition:
            '외국인 학생 (국제처 추천자) 또는 융합산업대학원장이 추천한 자',
        },
        {
          discountRate: '20% 감면',
          condition:
            '다음 중 하나에 해당되는 경우:\n– 공무원, 군인, 국공기업 임원\n– 전공 관련 자격증 소지자\n– 초·중·고 정규직 교사\n– 본교 교직원, AMP 수료자\n– 국가유공자 및 직계가족 등',
        },
      ],
    },
    applicationInfo: {
      title: '신청 방법 및 유의사항',
      items: [
        {
          title:
            '입학 지원 시 해당 장학 유형의 증빙서류(재직증명서, 자격증 사본 등)를 서류 마감일까지 제출해야 함',
        },
        {
          title:
            '장학금은 입학 시 1회 감면 기준이며, 이후 학기부터는 성적 및 활동에 따라 별도 신청 가능',
        },
        {
          title:
            '장학금 세부 기준은 매 학기 대학원 운영위원회 심의에 따라 조정될 수 있음',
        },
      ],
      icon: FileText,
    },
    contact: {
      title: '장학 문의',
      data: [
        {
          icon: Globe,
          title: '한양대학교 융합산학 대학원 홈페이지',
          link: 'http://gsic.hanyang.ac.kr',
          linkText: '바로가기',
          bgColor: 'bg-success',
        },
        {
          icon: Phone,
          title: '융합산업대학원 행정팀',
          link: 'tel:031-400-5102',
          linkText: '031-400-5102~3',
          bgColor: 'bg-primary',
        },
      ],
    },
    finalMessage: {
      primary: '치유의 여정을 시작하는 여러분을 응원합니다.',
      secondary:
        '한양대학교는 여러분의 성장을 위한 든든한 장학제도를 마련해두었습니다.',
    },
  },
} as const;
