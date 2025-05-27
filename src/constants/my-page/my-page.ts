import type { MyPostData } from '@/types/my-page';

export const MY_PAGE_STEP_ITEMS = [
  { label: '내가 쓴 댓글', value: 'reviews' },
  { label: '나의 게시물', value: 'posts' },
  { label: '개인정보 관리', value: 'account' },
];

export const TABLE_MAP = {
  아이디: 'userId',
  이름: 'userName',
  이메일: 'email',
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

export const REVIEW_MOCK_DATA = [
  {
    reviewNo: 1,
    artsNo: 1,
    artName:
      '작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A ',
    reviewText: '리뷰 텍스트 A',
    createdAt: '2025-04-01T12:00:00',
  },
  {
    reviewNo: 2,
    artsNo: 2,
    artName: '작품명 B',
    reviewText:
      '리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B',
    createdAt: '2025-04-01T12:00:00',
  },
  {
    reviewNo: 3,
    artsNo: 3,
    artName: '작품명 C',
    reviewText: '리뷰 텍스트 C',
    createdAt: '2025-04-01T12:00:00',
  },
  {
    reviewNo: 4,
    artsNo: 4,
    artName: '작품명 D',
    reviewText: '리뷰 텍스트 D',
    createdAt: '2025-04-01T12:00:00',
  },
  {
    reviewNo: 5,
    artsNo: 5,
    artName: '작품명 E',
    reviewText: '리뷰 텍스트 E',
    createdAt: '2025-04-01T12:00:00',
  },
  {
    reviewNo: 6,
    artsNo: 6,
    artName: '작품명 F',
    reviewText: '리뷰 텍스트 F',
    createdAt: '2025-05-01 11:00:36.172331+00',
  },
  {
    reviewNo: 7,
    artsNo: 7,
    artName: '작품명 G',
    reviewText: '리뷰 텍스트 G',
    createdAt: '2025-05-01 11:00:36.172331+00',
  },
  {
    reviewNo: 8,
    artsNo: 8,
    artName: '작품명 H',
    reviewText: '리뷰 텍스트 H',
    createdAt: '2025-05-01 11:00:36.172331+00',
  },
  {
    reviewNo: 9,
    artsNo: 9,
    artName: '작품명 I',
    reviewText: '리뷰 텍스트 I',
    createdAt: '2025-05-01 11:00:36.172331+00',
  },
  {
    reviewNo: 10,
    artsNo: 10,
    artName: '작품명 J',
    reviewText: '리뷰 텍스트 J',
    createdAt: '2025-05-01 11:00:36.172331+00',
  },
  {
    reviewNo: 11,
    artsNo: 11,
    artName: '작품명 K',
    reviewText: '리뷰 텍스트 K',
    createdAt: '2025-05-01 11:00:36.172331+00',
  },
  {
    reviewNo: 12,
    artsNo: 12,
    artName: '작품명 L',
    reviewText: '리뷰 텍스트 L',
    createdAt: '2025-05-01 11:00:36.172331+00',
  },
];

export const POST_MOCK_DATA: MyPostData[] = [
  {
    artsNo: 1,
    artName:
      '작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A ',
    artType: 'SINGLE',
    description: '작품 설명 A',
    createdAt: '2025-05-01T11:00:36',
  },
  {
    artsNo: 2,
    artName: '작품명 B',
    artType: 'GROUP',
    description: '작품 설명 B',
    createdAt: '2025-05-01T11:00:36',
  },
  {
    artsNo: 3,
    artName: '작품명 C',
    artType: 'GROUP',
    description: '작품 설명 C',
    createdAt: '2025-05-01T11:00:36',
  },
  {
    artsNo: 4,
    artName: '작품명 D',
    artType: 'SINGLE',
    description: '작품 설명 D',
    createdAt: '2025-05-01T11:00:36',
  },
  {
    artsNo: 5,
    artName: '작품명 E',
    artType: 'GROUP',
    description: '작품 설명 E',
    createdAt: '2025-05-01T11:00:36',
  },
  {
    artsNo: 6,
    artName: '작품명 F',
    artType: 'SINGLE',
    description: '작품 설명 F',
    createdAt: '2025-05-01T11:00:36',
  },
  {
    artsNo: 7,
    artName: '작품명 G',
    artType: 'GROUP',
    description: '작품 설명 G',
    createdAt: '2025-05-01T11:00:36',
  },
];
