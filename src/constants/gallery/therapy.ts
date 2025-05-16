import { Heart, BookOpen, Users, Sparkles } from 'lucide-react';

export const GALLERY_THERAPY_INTRO = {
  title: {
    first: '미술관 미술치료로의',
    second: '초대',
  },
  content: [
    'ART+THERAPY 展과 연계하여 진행되는 <b>MUSEUM THERAPY</b>는 관람객들이 미술 감상을 단순한 "보는 행위"를 넘어 <b>자기 돌봄과 회복의 시간</b>으로 확장할 수 있도록 하는 치유적 예술 프로그램입니다. 작품 하나하나를 천천히 바라보고, 그 안에 머물며 떠오르는 감정과 생각을 스스로 들여다보는 경험은, 일상을 떠나 진정한 나를 찾는 치유의 시간을 제공합니다.',
    '전문 미술치료사의 안내 아래, 감상 후 표현 활동과 나눔을 통해 관람객은 <b>자신의 내면에 귀 기울이고, 미술과의 깊은 만남 속에서 나를 발견하는 방법을 배울 수 있게 됩니다.</b>',
  ],

  strong: '지금 이 순간, 미술관에서 나와 마주하는 치유의 여정을 시작해보세요.',
};

export const GALLERY_THERAPY_THEORY = {
  title: {
    first: '미술관 미술치료의',
    second: '이론적 근거',
  },
  description:
    '미술관 미술치료는 예술의 치유적 본질, 미술 감상의 심리적 효과, 공공 미술관의 사회적 기능, 미술치료의 창조적 표현 이론을 통합하여, <b>감상과 창작을 통한 자기탐색과 정서 회복</b>을 유도하는 현대적 예술치료 형태입니다.',
  cards: [
    {
      icon: Heart,
      title: '치유적 본질',
      description: '예술의 치유적 속성을 통해 감정을 해소하고 정화하는 기능',
    },
    {
      icon: BookOpen,
      title: '심리적 효과',
      description: '미술 감상을 통한 몰입 경험과 정서적 안정 증진',
    },
    {
      icon: Users,
      title: '사회적 기능',
      description: '공공 미술관의 정신건강 자원으로서의 확장된 역할',
    },
    {
      icon: Sparkles,
      title: '창조적 표현',
      description: '미술치료의 자기표현과 통합을 통한 내면 탐색',
    },
  ],
};

export const GALLERY_THERAPY_ACADEMIC = {
  title: {
    first: '미술관 미술치료의',
    second: '학술적 이해',
  },
  sections: [
    {
      number: 1,
      title: '예술의 치유적 속성에 대한 고전적 이해',
      content: [
        '<b>Aristotle</b>의 Catharsis 개념은 예술이 감정을 해소하고 정화하는 기능을 한다고 보았습니다.',
        '<b>Langer (1957)</b>는 예술을 인간의 감정 구조를 상징적으로 표현하는 도구로 보았으며, 이는 감정 인식과 표현의 매개로서 미술을 이해하는 데 기초를 제공합니다.',
      ],
    },
    {
      number: 2,
      title: '미술치료 이론',
      content: [
        '<b>Edith Kramer</b>는 예술적 창작 자체에 내재된 치료적 가치(art as therapy)를 강조했으며, 이는 미술관에서의 창작활동이 지닌 자기표현과 통합의 가능성을 설명합니다.',
        '<b>Margaret Naumburg</b>는 예술을 무의식의 표현 도구로 보며 자유연상을 통한 자각과 치유를 강조하였고, 이는 감상자 중심의 자발적 이미지 해석을 통해 내면을 탐색하는 미술관 미술치료의 접근과 연결됩니다.',
      ],
    },
    {
      number: 3,
      title: '미술 감상의 심리학',
      content: [
        '<b>Csikszentmihalyi & Robinson (1990)</b>는 미술 감상이 몰입(flow) 경험을 유도하며, 이 몰입이 정서적 안정 및 심리적 만족을 증진시킨다고 보았습니다.',
        '<b>Leder et al. (2004)</b>의 미적 감상 모델은 감상이 인지적 평가, 정서 반응, 의미 구성 등 복합적 심리 과정임을 보여주며, 감상 자체가 심리치료적 자극이 될 수 있음을 설명합니다.',
      ],
    },
    {
      number: 4,
      title: '공공문화 공간으로서의 미술관',
      content: [
        '<b>Dewey (1934)</b>는 예술을 삶 속의 경험으로 통합해야 한다고 주장했으며, 이는 미술관을 일상적 공간에서의 예술적 경험의 장으로 해석하는 데 이론적 근거를 제공합니다.',
        '현대 미술관은 단순한 전시 공간이 아니라, <b>정신건강의 공공 자원</b>으로 확장되고 있으며, 사회적 처방(social prescribing)의 맥락에서도 미술관 프로그램이 활용되고 있습니다.',
      ],
    },
    {
      number: 5,
      title: '미술관 기반 심리치료의 실천 사례',
      content: [
        '<b>The Art Museum as a Therapeutic Space (Hamil, 2016)</b>에서는 미술관이 감상과 참여를 통해 개인의 자아 성찰과 집단 내 소통을 이끌어내는 심리사회적 공간으로 기능함을 설명합니다.',
        '영국의 <b>"Museums on Prescription"</b> 프로젝트는 노인 및 정신적 어려움을 겪는 이들을 대상으로 미술관 참여를 통해 삶의 질 향상을 도모하는 실제적 모델입니다.',
      ],
    },
  ],
};
