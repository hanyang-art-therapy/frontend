export const MY_PAGE_STEP_ITEMS = [
  { label: '내가 쓴 댓글', value: 'reviews' },
  { label: '나의 게시물', value: 'posts' },
  { label: '개인정보 관리', value: 'account' },
];

export const TABLE_MAP = {
  아이디: 'userId',
  이름: 'userName',
  이메일: 'email',
  기수: 'cohort',
  학번: 'studentNo',
  구분: 'role',
} as const;

export const RESET_PW_TABLE_MAP = [
  {
    label: '기존 비밀번호',
    value: 'current-password',
  },
  {
    label: '새 비밀번호',
    value: 'new-password',
  },
  {
    label: '새 비밀번호 확인',
    value: 'confirm-password',
  },
] as const;
