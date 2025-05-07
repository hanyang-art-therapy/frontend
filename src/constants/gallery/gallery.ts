import {
  Info,
  Target,
  Users,
  HandHeart,
  Calendar,
  CircleHelp,
  Clock,
  MapPin,
} from 'lucide-react';

export const GALLERY_STEP_ITEMS = ['전시소개', '미술관 미술치료', '갤러리'];

export const GALLERY_INTRO = {
  title: '전시 소개',
  intro: {
    icon: Info,
    title: '전시 개요',
    description: [
      '한양대학교 융합산업대학원 미술치료학과는 ',
      'ART+THERAPY ',
      '전시를 통해 미술치료의 실제적 적용과 효과를 시각적으로 표현하고, 이를 통해 관람객들이 미술치료의 가치와 의미를 보다 깊이 이해할 수 있도록 합니다. 전시된 작품들은 학생들의 창의적이고 감성적인 치료 접근 방식을 바탕으로, 각자의 경험과 감정을 예술적 형태로 재구성한 결과물들입니다.',
    ],
  },

  purpose: {
    icon: Target,
    title: '전시 목적',
    description: [
      '미술치료의 전문성과 심리적 치유 효과를 대중에게 알리는 기회를 제공합니다.',
      '미술을 통해 자유와 감정 표현을 실천하는 과정에서의 학생들의 성장과 변화를 공유합니다.',
      '미술치료의 치료적 효과가 어떻게 작용으로 나타날 수 있는지에 대해 설명하고, 이를 통해 미술치료학의 발전 방향을 제시합니다.',
    ],
  },

  participants: {
    icon: Users,
    title: '전시 참여자',
    description: [
      {
        subTitle: '교수진',
        subDescription:
          '미술치료학과 교수진은 작품의 방향성과 의미를 조율하며,학생들에게 전문적인 피드백을 제공합니다.',
      },
      {
        subTitle: '학생들',
        subDescription:
          '학과의 학생들은 심층과 연구를 통해 창작한 작품들을 전시하여,미술치료의 실습이 어떻게 구체화되는지 보여줍니다. 각 작품은 개인적인 치유 과정과 관련된 주제를 다루고 있습니다.',
      },
    ],
  },

  artTherapy: {
    icon: HandHeart,
    title: 'ART+THERAPY',
    description: [
      '미술치료는 예술을 통해 감정을 표현하고 심리적, 정서적 문제를 해결하는 방법입니다. ',
      'ART+THERAPY ',
      '전시는 미술치료의 치료적 가치를 강조하는 한편, 예술이 치유의 중요한 도구가 될 수 있다는 메시지를 전합니다. 관람객들은 전시를 통해 미술이 사람의 감정을 어떻게 치유하고, 깊은 내면의 변화로 이어질 수 있는지 경험할 수 있습니다.',
    ],
  },

  schedule: {
    icon: Calendar,
    title: '전시 일정 및 위치',
    description: [
      {
        icon: Clock,
        subTitle: '일정',
        subDescription: '2025년 5월 17일 - 2025년 5월 25일',
      },
      {
        icon: MapPin,
        subTitle: '장소',
        subDescription: '한양대학교 융합산업대학원 미술치료학과 전시실',
      },
    ],
  },

  guide: {
    icon: CircleHelp,
    title: '관람 안내',
    description:
      '전시 관람은 무료로 제공되며, 미술치료에 대한 관심이 있는 모든 분들에게 열려 있습니다. 전시와 관련된 자세한 정보나 프로그램에 대해 궁금한 사항이 있으시면 학과 사무실로 문의 바랍니다.',
  },
};
