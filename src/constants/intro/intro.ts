import {
  BadgeCheck,
  Binoculars,
  BookOpenCheck,
  HeartHandshake,
  MapPinned,
  Sparkles,
  University,
} from 'lucide-react';

export const INTRO_ACTIVITIES = [
  {
    id: 'vision',
    title: '미래상',
    icon: Sparkles,
    description: '연대, 치유, 성장',
    color: 'bg-black',
  },
  {
    id: 'professors',
    title: '교수진',
    icon: University,
    description: '우리는 함께 성장하며, 함께 치유하는 미래를 만들어갑니다',
    color: 'bg-primary',
  },
  {
    id: 'curriculums',
    title: '교육과정',
    icon: BookOpenCheck,
    description: '기초 심리 및 이론 영역 등',
    color: 'bg-secondary',
  },
  {
    id: 'certificates',
    title: '자격증',
    icon: BadgeCheck,
    description:
      '미술치료는 예술적 표현을 통해 정서적·심리적 치유를 돕는 전문 분야입니다',
    color: 'bg-destructive',
  },
  {
    id: 'prospect',
    title: '졸업 후 전망',
    icon: Binoculars,
    description: '사회적 수요가 증가하는 분야로써 밝은 전망이 기대됩니다',
    color: 'bg-success',
  },
  {
    id: 'mou',
    title: 'MOU',
    icon: HeartHandshake,
    description:
      '업무협약을 통해 재학생들에게 풍부한 현장실습 기회와 연구 기반을 제공하고 있습니다',
    color: 'bg-gray-6',
  },
  {
    id: 'map',
    title: '오시는 길',
    icon: MapPinned,
    description: '한양대학교 ERICA 캠퍼스 컨벤션센터 4층',
    color: 'bg-primary/80',
  },
];
