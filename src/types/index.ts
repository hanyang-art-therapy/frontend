// DB 테이블 타입 정의

// 회원 테이블
export type User = {
  userNo: number; // 회원 번호
  userId: string; // 아이디
  password: string; // 비밀번호
  email: string; // 이메일
  userName: string; // 이름
  studentNo: string; // 학번
  role: string; // 회원 권한
  userStatus: string; // 회원 상태
};

// 회원 이력
export type UserHistory = {
  userHistoryNo: number; // 회원 이력 번호
  userNo: number; // 회원 번호
  userStatus: string; // 회원 상태
  signinTimestamp: string; // 로그인 시각 - TIMESTAMP
  signoutTimestamp: string; // TIMESTAMP
  bannedTimestamp: string; // TIMESTAMP
  bannedReason: string; // 차단 사유
};

// 작품 댓글
export type Review = {
  reviewsNo: number; // 댓글 번호
  artsNo: number; // 작품 번호
  filesNo: number; // 파일 번호
  userNo: number; // 회원 번호
  reviewText: string; // 댓글 내용
  createdAt: string; // 작성 일자
};

// 전시회
export type Gallery = {
  galleriesNo: number; // 전시 번호
  title: string; // 제목
  startDate: string; // 시작 일자 - TIMESTAMP
  endDate: string; // 종료 일자 - TIMESTAMP
};

// 작품
export type Arts = {
  artsNo: number; // 작품 번호
  galleriesNo: number; // 전시 번호
  filesNo: number; // 파일 ID
  artName: string; // 작품명
  caption: string; // 캡션
  artType: 'SINGLE' | 'GROUP'; // 작품 타입
  coDescription: string | null; // 공동 작품 설명
  createdAt: string; // 업로드 일자 - TIMESTAMP
};

// 파일
export type Files = {
  filesNo: number; // 파일 ID
  name: string; // 파일명
  url: string; // 파일 경로
  filesSize: number; // 파일 크기
  useYn: boolean; // 사용 여부
  delYn: boolean; // 삭제 여부
  extension: string; // 파일 확장자
  filesType: 'ART' | 'REVIEW'; // 파일 타입
  createdAt: string; // 업로드 일자 - TIMESTAMP
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
  artistNo: number; // 작가 ID
  artsNo: number; // 작품 ID
  description: string; // 작품 설명
};

// 공지사항
export type Notice = {
  noticeNo: number; // 공지사항 번호
  userNo: number; // 회원 번호
  filesNo: number; // 파일 번호
  title: string; // 제목
  content: string; // 내용
  createdAt: string; // 작성 일자
  category: string; // 카테고리
  viewCount: number; // 조회수
};

export type Professor = {
  professorNo: number; // 교수 번호
  professorName: string; // 교수명
  position: string | null; // 교수 직위
  major: string | null; // 교수 전공
  email: string | null; // 교수 이메일
  tel: string | null; // 교수 전화번호
  filesNo: number | null; // 파일 번호
};

export type MessageResponse = {
  message: string;
};

export type PaginationResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type ArtsPagination<T> = {
  content: T[];
  lastId: number;
  totalElements: number;
  hasNext: boolean;
};

export type Content = {
  title: string;
  sections: {
    title: string;
    content?: string[];
    points?: string[];
  }[];
};
