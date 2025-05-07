// DB 테이블 타입 정의

// 회원 테이블
export type User = {
  userNo: number; // 회원 번호
  userId: string; // 아이디
  password: string; // 비밀번호
  email: string; // 이메일
  userName: string; // 이름
  phone: string; // 전화번호
  studentNo: string; // 학번
  role: string; // 회원 권한
  userStatus: string; // 회원 상태
};

// 회원 이력
export type UserHistory = {
  userHistoryNo: number; // 회원 이력 번호
  userNo: number; // 회원 번호
  userStatus: string; // 회원 상태
  userEventTimestamp: string; // TIMESTAMP
  userHistoryTimestamp: string; // TIMESTAMP
};

// 작품 댓글
export type Review = {
  reviewNo: number; // 댓글 번호
  artsNo: number; // 작품 번호
  filesNo: number; // 파일 번호
  userNo: number; // 회원 번호
  reviewText: string; // 댓글 내용
  createdAt: string; // !! 확정 아님 주의 !! 작성 일자
};

// 전시회
export type Gallery = {
  galleriesNo: number; // 전시 번호
  title: string; // 제목
  description: string; // 설명
  year: string; // 개최 일자
};

// 작품
export type Arts = {
  artsNo: number; // 작품 번호
  galleriesNo: number; // 전시 번호
  filesNo: number; // 파일 ID
  artName: string; // 작품명
  caption: string; // 캡션
  artType: 'SINGLE' | 'GROUP'; // 작품 타입
  uploaded_at: string; // 업로드 일자
};

// 파일
export type Files = {
  filesNo: number; // 파일 ID
  name: string; // 파일명
  url: string; // 파일 경로
  filesSize: number; // 파일 크기
  useYn: boolean; // 사용 여부
  deleteYn: boolean; // 삭제 여부
  extension: string; // 파일 확장자
  filesType: 'ART' | 'REVIEW';
};

// 작가
export type Artist = {
  artistNo: number; // 작가 ID
  artistName: string; // 작가명
  studentNo: number; // 학번
  cohort: number; // 기수
};

// 작품과 작가 관계
export type ArtArtistRel = {
  artArtistRelNo: number; // 작품과 작가 관계 ID
  artNo: number; // 작품 ID
  description: string; // 작품 설명
  artistNo: number; // 작가 ID
};
