export type NavMenu = {
  title: string;
  path: string;
  submenu: { title: string; path: string }[];
};

export const NAV_MENU: NavMenu[] = [
  {
    title: '학과소개',
    path: '/intro',
    submenu: [
      { title: '- 미래상', path: '/intro/vision' },
      { title: '- 교수진', path: '/intro/professors' },
      { title: '- 교육과정', path: '/intro/curriculums' },
      { title: '- 자격증', path: '/intro/certificates' },
      { title: '- 졸업 후 전망', path: '/intro/prospect' },
      { title: '- MOU기관', path: '/intro/mou' },
      { title: '- 오시는 길', path: '/intro/map' },
    ],
  },
  {
    title: '임상활동',
    path: '/clinical',
    submenu: [
      { title: '- 발달장애', path: '/clinical/developmental' },
      { title: '- 유아', path: '/clinical/infant' },
      { title: '- 아동', path: '/clinical/children' },
      { title: '- 청소년', path: '/clinical/adolescent' },
      { title: '- 성인', path: '/clinical/adult' },
      { title: '- 예방', path: '/clinical/prevention' },
    ],
  },
  {
    title: 'ART+THERAPY展',
    path: '/gallery',
    submenu: [
      { title: '- 전시개요', path: '/gallery?step=intro' },
      { title: '- 미술관 미술치료', path: '/gallery?step=therapy' },
      { title: '- 갤러리', path: '/gallery' },
    ],
  },
  {
    title: '입학안내',
    path: '/enroll/freshman',
    submenu: [
      { title: '- 신입학생 모집', path: '/enroll/freshman' },
      { title: '- 장학금 혜택', path: '/enroll/scholarship' },
    ],
  },
  {
    title: '공지사항',
    path: '/notice',
    submenu: [],
  },
] as const;
