import { CircleCheck, Lightbulb } from 'lucide-react';

export const MOU = {
  title: 'MOU',
  intro: {
    title: 'MOU 협력 현황',
    description: [
      '이론과 실무를 겸비한 전문 인력 양성을 위해 다양한 기관과 협력하고 있습니다. 국내 유수의 의료기관, 교육기관, 사회복지 및 예술치유 관련 기관과의 업무협약(MOU)을 통해 재학생들에게 풍부한 현장실습 기회와 연구 기반을 제공하고 있습니다.',
    ],
  },

  purpose: {
    title: '협력의 목적',
    description: [
      {
        title: '실무 중심 교육을 위한 임상 및 교육현장 연계',
      },
      {
        title: '미술치료 프로그램의 공동개발 및 운영',
      },
      {
        title: '학술·연구 교류와 자문',
      },
      { title: '지역사회 정신건강 증진 및 예술치유 확산' },
    ],
    icon: CircleCheck,
  },

  institutions: {
    title: '주요 MOU 체결 기관',
    description:
      '다음과 같은 기관들과의 업무협약을 통해 다양한 분야에서 협력 사업을 전개하고 있습니다.',
    headers: ['협력 기관', '분야', '요약'],
    data: [
      {
        institution: '자혜학교',
        field: '특수교육',
        summary: '발달장애 아동 청소년 대상 집단미술치료 현장실습',
      },
      {
        institution: '사회적기업 빛과 소금',
        field: '복지 및 예술',
        summary: '지역사회 청소년을 위한 미술치료 프로그램 공동 운영',
      },
      {
        institution: '고려대 안산병원',
        field: '의료',
        summary: '병원미술치료 및 전문가 수퍼비전 협력',
      },
      {
        institution: '한국예술치료학회',
        field: '학술',
        summary: '학술 교류, 공동연구, 연수 프로그램 협력',
      },
      {
        institution: '안산정신건강복지센터',
        field: '지역사회 정신건강',
        summary: '성인 대상 정신건강 미술치료 및 수퍼비젼 협력',
      },
      {
        institution: '용인시 가정어린이집연합회',
        field: '유아교육',
        summary: '영유아 대상 미술치료 프로그램 공동기획',
      },
      {
        institution: '예은유치원',
        field: '교육 기관',
        summary: '유아동을 위한 예방적 미술치료 및 부모교육 협력',
      },
    ],
  },

  expected: {
    title: '기대 효과',
    description: [
      {
        title: '학생들의 현장 실습 및 취업 기회 확대',
      },
      {
        title: '미술치료의 실제 적용과 사회적 확산',
      },
      {
        title: '지역사회와의 지속 가능한 연계와 기여',
      },
      { title: '치료 및 교육 현장의 수요를 반영한 맞춤형 교육 운영' },
    ],
    icon: Lightbulb,
  },
} as const;
