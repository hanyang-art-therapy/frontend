import { CheckCircle, Globe, MapPin, Phone, User } from 'lucide-react';

export const FRESHMAN_CONSTANTS = {
  quote: {
    content: [
      '그림을 잘 그리는 사람보다, ',
      '그림으로 마음을 만나고 싶은 사람을 기다립니다.',
    ],
  },
  target: {
    title: '미술치료학과 모집 대상',
    items: [
      {
        title: '예술을 통해 사람의 마음을 이해하고 싶은 분',
      },
      {
        title: '심리, 상담, 인간의 내면에 관심 있는 분',
      },
      {
        title: '그림으로 감정과 경험을 표현해보고 싶은 분',
      },
      {
        title: '공감하고 경청하며 타인을 도울 수 있는 분',
      },
      {
        title: '치료사, 상담사, 예술교육가 등 전문 진로를 준비하는 분',
      },
      {
        title: `기존 직업(교사, 사회복지사, 예술가 등)에 '치유'라는 가치를 더하고 싶은 분`,
      },
    ],
    icon: User,
  },
  features: [
    {
      title: '이론+실습 중심 커리큘럼',
      description: '미술치료 이론, 상담이론, 임상실습까지 체계적으로 교육',
    },
    {
      title: '현장 기반 실습(IC-PBL)',
      description: '병원·유치원·정신건강센터·미술관 등과 산학협력 운영',
    },
    {
      title: '폭넓은 진로',
      description:
        '임상치료사, 예술치료사, 상담사, 문화예술교육자, 박사과정 진학 등',
    },
    {
      title: '심리치료 전문가로 성장하는 길',
      description: '한국예술치료학회 기준 임상시간 인정',
    },
  ],
  schedule: {
    title: '모집 일정',
    headers: ['구분', '일정'],
    data: [
      {
        category: '원서 접수',
        content: '매년 2회 (4월, 11월)',
      },
      {
        category: '서류 제출',
        content: '한양대 에리카 융합산업대학원',
      },
      {
        category: '면접 전형',
        content: 'ERICA 컨벤션센터 4층',
      },
      {
        category: '모집요강',
        content: '바로가기',
        link: 'https://gsic.hanyang.ac.kr/front/admission/recruit',
      },
    ],
  },
  qualifications: {
    title: '지원 자격',
    items: [
      {
        title: '4년제 학사학위 이상 소지자 (전공 무관)',
      },
      {
        title: '미술, 심리, 교육, 사회복지 등 관련 분야 관심자',
      },
      {
        title: '졸업예정자도 지원 가능',
      },
    ],
    icon: CheckCircle,
  },
  tuition: {
    title: '등록금 및 장학 혜택',
    headers: ['구분', '금액'],
    data: [
      {
        category: '입학금',
        content: '매년 변동',
      },
      {
        category: '수업료 (사회계열)',
        content: '매년 변동',
      },
      {
        category: '장학금 혜택',
        content: 'MOU 기관 추천자, 공공기관 종사자, 자격증 소지자 등',
        highlight: '최대 50% 감면 가능',
      },
    ],
    icon: CheckCircle,
  },
  classInfo: {
    title: '수업 안내',
    data: [
      {
        icon: 'Calendar1',
        title: '수업 요일',
        primary: '주 2회 야간 수업 (화·목)',
        secondary: '토요일 낮 (공동과목 및 융합과목)',
      },
      {
        icon: 'AlarmClock',
        title: '수업 시간',
        primary: '18:30 ~ 21:15',
      },
      {
        icon: 'LibraryBig',
        title: '수업 연한',
        primary: '4학기 (총 30학점 이수)',
      },
      {
        icon: 'GraduationCap',
        title: '트랙 선택',
        primary: '학위논문 또는 과목이수 트랙 가능',
      },
    ],
  },
  contact: {
    title: '문의',
    data: [
      {
        icon: Globe,
        title: '홈페이지',
        link: 'https://gsic.hanyang.ac.kr',
        linkText: '바로가기',
        bgColor: 'bg-success',
      },
      {
        icon: Phone,
        title: '행정팀',
        link: 'tel:031-400-5102',
        linkText: '031-400-5102~3',
        bgColor: 'bg-primary',
      },
      {
        icon: MapPin,
        title: '주소',
        link: '/intro/map',
        linkText:
          '경기도 안산시 상록구 한양대학로 55, ERICA컨벤션센터 4층 402호',
        bgColor: 'bg-gray-6',
      },
    ],
  },
  finalMessage: {
    primary: '당신의 그림이, 누군가의 회복이 됩니다.',
    secondary: '한양대학교 ERICA 미술치료학과에서 함께 시작해 보세요.',
  },
} as const;
