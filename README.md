# 🏫 한양대학교 미술치료학과 페이지 제작 프로젝트

### [한양대학교 미술치료학과 바로가기](https://hy-erica-arttherapy.com/)

<br />

<img src="https://github.com/user-attachments/assets/1fb7b4c6-724e-456c-afec-778ad0a3bf0c" width="" />

<br /><br />

## 📇 프로젝트 개요

> 한양대학교 미술치료학과 홈페이지의 부재 및<br />
> 기존 한양대학교 홈페이지는 **학과 정보 전달 및 졸업 작품 수록이 불가능**한 상태였습니다.<br />
> 저희는 **소중한 졸업생들의 작품**을 손쉽게 관람할 수 있으며 **재학생들에게는 필요한 정보 전달**을 목표로 삼고,<br />
> 다양한 아이디어를 학과 홈페이지에 적용시켜, **실제 전시회 기간** 직접 운영하며 실서비스를 운용했습니다.


<br />

## 📍 프로젝트 소개

> 프로젝트 주제 : 한양대학교 미술치료학과 홈페이지 기획 · 개발<br />
> 프로젝트 목적 : 졸업 전시회 작품 수록 및 학과 정보 전달<br />
> 프로젝트 기간 : 2025. 04. 28 ~ 2025. 06. 20 (2개월)<br />
> 개발팀 Repo : [FE](https://github.com/hanyang-art-therapy/frontend) | [BE](https://github.com/hanyang-art-therapy/backend)

<br />

## 👫 개발팀 소개

|                                               [김이지](https://github.com/ijikim)                                                |                                               [유희태](https://github.com/kledyu)                                               |                                               [임다은](https://github.com/daeundan)                                                |                                               [김경아](https://github.com/kyunga1126)                                                |                                               [김여원](https://github.com/yeooneeee)                                                |                                               [문민아](https://github.com/MoonMinah)                                                |
| :------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
| <a href="https://github.com/ijikim"><img src="https://avatars.githubusercontent.com/u/201050788?v=4" width=200px alt="김이지" /> | <a href="https://github.com/kledyu"><img src="https://avatars.githubusercontent.com/u/83483378?v=4" width=200px alt="유희태" /> | <a href="https://github.com/daeundan"><img src="https://avatars.githubusercontent.com/u/173011635?v=4" width=200px alt="임다은" /> | <a href="https://github.com/kyunga1126"><img src="https://avatars.githubusercontent.com/u/159090684?v=4" width=200px alt="김경아" /> | <a href="https://github.com/yeooneeee"><img src="https://avatars.githubusercontent.com/u/129919629?v=4" width=200px alt="김여원" /> | <a href="https://github.com/MoonMinah"><img src="https://avatars.githubusercontent.com/u/133863745?v=4" width=200px alt="문민아" /> |
|                                                            Front-end                                                             |                                                            Front-end                                                            |                                                             Front-end                                                              |                                                               Back-end                                                               |                                                              Back-end                                                               |                                                              Back-end                                                               |
|                                                       관리자 <br />메인 홈                                                       |                                                      인증/인가<br />갤러리                                                      |                                                     작품 상세 <br /> 공지사항                                                      |                                                        갤러리 <br /> 공지사항                                                        |                                                      관리자 <br /> 마이페이지                                                       |                                                       인증/인가 <br /> CI/CD                                                        |


## 🎨 프로젝트 역할 분담

**김이지**
- 메인페이지 전체<br />
- 공통 컴포넌트 (헤더, 풋터, 네비, 스켈레톤, 준비중 페이지)<br />
- 관리자 페이지 / 회원 조회 (검색, 무한스크롤, 조회, 상세조회)<br />
- 관리자 페이지 / 작가 관리 (검색, 무한스크롤, 조회, 상세조회, 수정, 삭제, 등록)<br />
- 관리자 페이지 / 전시회 관리 (조회, 상세조회, 수정, 삭제, 등록)<br />
- 관리자 페이지 / 교수진 관리 (조회, 상세조회, 첨부파일 업로드, 수정, 삭제, 등록)<br />
- 테스터 전용 관리자 페이지 별도 운영 (Supabase)<br />

**유희태**
- AWS, Vercel 자동 배포 CI/CD 구축<br />
- 학과소개, 임상활동, 입학안내, 마이페이지 기능 구현<br />
- JWT 기반 인증 / 인가 구현<br />
- 작품 조회 및 상세 조회 기능 구현<br />
- MSW 기반 API 모킹 <br />
- 프로젝트 총괄 <br />

**임다은**
- 클라이언트와 소통 및 프로젝트 기획<br />
- 작품 상세 페이지 UI 디자인 및 기능 개발<br />
- 작품 상세 페이지 (댓글 CRUD)<br />
- 공지사항 전체 UI 디자인 및 기능 개발<br />
- 공지사항 페이지 (게시물 CRUD)<br />

**문민아**
- AWS 배포<br />
- SPRING SECURITY 인증 / 인가 <br />
- 회원 (회원가입, 로그인, 로그아웃, ID/이메일/학번 중복 검사)<br />
- 마이페이지 (회원 논리적 탈퇴, 비밀번호 재설정 이메일 인증)<br />
- 이메일 인증 / 비밀번호 찾기 / 비밀번호 재설정<br />
- 관리자 페이지 (작가 CRUD)<br />
- 댓글 정지 API<br />

**김경아**
- 전시회 & 작품 전체조회, 상세조회<br />
- 댓글 (조회, 작성, 수정, 삭제)<br />
- 공지사항 게시판 (조회, 등록, 수정, 삭제)<br />
- 관리자 페이지 (회원 CRUD)<br />

**김여원**
- 첨부파일 업로드 및 삭제<br />
- 마이페이지 (내 정보, 내 글, 내 댓글 조회, 수정, 삭제)
- 관리자 페이지 (전시회 CRUD, 작품 CRUD, 교수진 CRUD)<br/>


<br /><br />

## 🛠️️ 사용기술 및 개발환경

**Development**

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=tailwindCss&logoColor=white" />
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white" />
<img src="https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=Zustand&logoColor=white" />
<br />
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" />
<img src="https://img.shields.io/badge/MSW-FF6A33?style=flat-square&logo=mockserviceworker&logoColor=white" />
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white" />
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white" />
<img src="https://img.shields.io/badge/Google Search Console-458CF5?style=flat-square&logo=googlesearchconsole&logoColor=white" />
<img src="https://img.shields.io/badge/playwright-45ba4b?style=flat-square&logo=playwright&logoColor=white" />
</p>

**Environment**

<p>
<img src="https://img.shields.io/badge/AWS-141f2e?style=flat-square&logoColor=white" />
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white" />
<img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white"/>
<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white" />
<img src="https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logoColor=white"/>
</p>

**Cowork Tools**

<p>
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=Slack&logoColor=white" />
<img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white" />
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white" />
<img src="https://img.shields.io/badge/Zoom-2D8CFF?style=flat-square&logo=Zoom&logoColor=white" />

</p>

<br /><br />

## 🖼️ 화면 구성

|유저-로그인|
|:---:|
|<img src="https://github.com/user-attachments/assets/625b3e55-a815-443e-bb3f-94b3b2fe8009" height="300"/> <img src="https://github.com/user-attachments/assets/98e3e26e-161d-4785-a92c-0282f63d2b0c"  height="300"/>|
|FE|
|JWT 기반 로그인 기능|


<br/>

|유저-회원가입/약관동의|
|:---:|
|<img src="https://github.com/user-attachments/assets/d4cc258b-557f-4f1b-ba3b-5914856cb8e7" height="300"/> <img src="https://github.com/user-attachments/assets/67aceba7-7201-474d-b19c-7418e618a247"  height="300"/>|
|FE|
|약관 동의/미동의에 따라 다음 단계 진행 여부 토글|


<br/>

|유저-회원가입/회원정보 입력|
|:---:|
|<img src="https://github.com/user-attachments/assets/c4d8a81e-bf66-4e0c-9a74-c1fb77aa8500" height="300"/> <img src="https://github.com/user-attachments/assets/5da270cb-ab1e-47d0-8ce7-e9bb883193a2"  height="300"/>|
|FE|
|회원 정보 입력 및 react-hook-form으로 유효성 검증|


<br/>

|유저-회원가입/완료|
|:---:|
|<img src="https://github.com/user-attachments/assets/de870771-1a84-413a-b876-9e45c5f7cbe4" height="300"/> <img src="https://github.com/user-attachments/assets/c739d450-681a-4349-8bbe-9d3ee25dc3ba"  height="300"/>|
|FE|
|lottie를 통한 회원가입 완료 디자인|


<br/>

|유저-나의 찾기/아이디|
|:---:|
|<img src="https://github.com/user-attachments/assets/9805f34d-2f1c-4712-a9d9-6bd95903ef04" height="300"/> <img src="https://github.com/user-attachments/assets/0d46ce88-bc18-4966-a409-b01f07e09e8d"  height="300"/>|
|FE|
|이메일과 이름 기반 아이디 찾기 기능|


<br/>

|유저-나의 찾기/비밀번호|
|:---:|
|<img src="https://github.com/user-attachments/assets/0b193404-b5a0-4487-9612-aef23c169893" height="300"/> <img src="https://github.com/user-attachments/assets/62be81e0-d4f0-43a4-8685-b2d266d1586f"  height="300"/>|
|FE|
|이메일과 아이디를 통한 비밀번호 찾기 및 임시 비밀번호 발급 기능|


<br/>

|유저-마이페이지/내가 쓴 리뷰|
|:---:|
|<img src="https://github.com/user-attachments/assets/994cdc08-3817-41d7-9f8b-898c2962cffb" height="300"/> <img src="https://github.com/user-attachments/assets/6893359f-4ae2-4381-a2fa-65bc4622defb"  height="300"/>|
|FE|
|내가 쓴 리뷰 조회 및 페이지네이션 기능|


<br/>

|유저-마이페이지/나의 작품|
|:---:|
|<img src="https://github.com/user-attachments/assets/b680a210-e26e-4ee1-a563-e803754550bb" height="300"/> <img src="https://github.com/user-attachments/assets/de1e59df-4de4-4ea7-a7b7-9df8fae5808b"  height="300"/>|
|FE|
|나의 작품 조회 기능|


<br/>

|유저-마이페이지/개인정보 관리|
|:---:|
|<img src="https://github.com/user-attachments/assets/d1cb8645-364a-4e95-9499-c47933d3130e" height="300"/> <img src="https://github.com/user-attachments/assets/d1309d71-b421-44c5-af22-cdd0c7d3cc42"  height="300"/>|
|FE|
|개인정보 조회 기능|


<br/>

|유저-마이페이지/개인정보 수정|
|:---:|
|<img src="https://github.com/user-attachments/assets/5e73146b-d3a0-4576-a158-93f1836829d0" height="300"/> <img src="https://github.com/user-attachments/assets/70d88112-a987-4187-a12e-95b869c9c828"  height="300"/>|
|FE|
|인증 기반의 개인정보 수정 기능|


<br/>

|유저-마이페이지/비밀번호 변경|
|:---:|
|<img src="https://github.com/user-attachments/assets/113c08c6-8a39-4e1e-847b-a96f3949a464" height="300"/> <img src="https://github.com/user-attachments/assets/591f7a5f-493a-487b-91b5-955f2b6b9817"  height="300"/>|
|FE|
|react-hook-form 기반의 비밀번호 변경 기능|


<br/>


|학과소개-메인|
|:---:|
|<img src="https://github.com/user-attachments/assets/942e77a8-0a92-4f16-bebe-7f95861a8755" height="300"/> <img src="https://github.com/user-attachments/assets/a4a180fa-e3ea-494e-94e7-40439dcde7b8"  height="300"/>|
|FE|
|학과소개 오버뷰 및 메인 기능|


<br/>


|학과소개-소개 상세|
|:---:|
|<img src="https://github.com/user-attachments/assets/aa44979c-15e7-4162-ace0-06c9b79ee07b" height="300"/> <img src="https://github.com/user-attachments/assets/a0bf297f-e162-42c9-a605-0cc30dda1a9a"  height="300"/>|
|FE|
|학과소개 상세 조회 기능|


<br/>


|임상활동-메인|
|:---:|
|<img src="https://github.com/user-attachments/assets/9b28ca08-2110-4c7b-9055-c9f045a8754a" height="300"/> <img src="https://github.com/user-attachments/assets/cb92887e-2a35-4a4d-ae05-a48ce4c9718d"  height="300"/>|
|FE|
|임상활동 오버뷰 및 메인 기능|


<br/>


|임상활동-활동 상세|
|:---:|
|<img src="https://github.com/user-attachments/assets/a026c14f-0855-477f-b8cc-976985df4287" height="300"/> <img src="https://github.com/user-attachments/assets/6e4a1016-6eb5-4222-9820-30d4755e1dc5"  height="300"/>|
|FE|
|임상활동 상세 조회 기능|


<br/>


|입학안내|
|:---:|
|<img src="https://github.com/user-attachments/assets/5987811b-48fe-4242-b6b6-895e42c907ee" height="300"/> <img src="https://github.com/user-attachments/assets/a81aa8db-a734-4b52-b944-7647e7134bca"  height="300"/>|
|FE|
|입학안내 페이지|


<br/>


|갤러리-전시소개|
|:---:|
|<img src="https://github.com/user-attachments/assets/56fd7acf-03c1-4e9b-8f9c-99232bc7ef71" height="300"/> <img src="https://github.com/user-attachments/assets/84655965-4e58-4240-8a93-e2d46e4e0d15"  height="300"/>|
|FE|
|갤러리 전시회 소개 조회 기능|


<br/>


|갤러리-미술관 미술치료|
|:---:|
|<img src="https://github.com/user-attachments/assets/628583e2-fe45-47dc-bf2f-49ce39b14cd2" height="300"/> <img src="https://github.com/user-attachments/assets/2fd416aa-9f86-43bd-9c14-c0e6ac0f8c34"  height="300"/>|
|FE|
|갤러리 미술관 미술치료 소개 기능|


<br/>


|갤러리-작품 조회|
|:---:|
|<img src="https://github.com/user-attachments/assets/9ad6cb27-86ea-4ac8-a149-138da7c59320" height="300"/> <img src="https://github.com/user-attachments/assets/92afdae9-ee85-4ecf-ac44-e21114173d7f"  height="300"/>|
|FE|
|기수 & 연도별 작품 조회 및 무한 스크롤 기능|


<br/>


|관리자-회원 조회/전체 조회|
|:---:|
|<img src="https://github.com/user-attachments/assets/c1b4edab-0eea-420a-8179-8a32fa685326" height="300"/> <img src="https://github.com/user-attachments/assets/f4e0c0de-bf8b-40d0-b63f-b628a66a4278"  height="300"/>|
|FE|
|이름 검색 기능 및 무한스크롤 기능|


<br/>

|관리자-회원 조회/상세 조회(수정)|
|:---:|
|<img src="https://github.com/user-attachments/assets/503655ca-8e02-4b74-9d29-7a5a302213e6" height="300"/> <img src="https://github.com/user-attachments/assets/3e2e0b08-f763-42a2-a162-13d83ced8a34"  height="300"/>|
|FE|
|고정 정보 외 수정 가능|


<br/>

|관리자-작가 관리/전체 조회|
|:---:|
|<img src="https://github.com/user-attachments/assets/890d31c9-2641-441b-a7fe-61878c914b8e" height="300"/> <img src="https://github.com/user-attachments/assets/a976cac5-185e-43ee-be8b-631d58e0e4a9"  height="300"/>|
|FE|
|작가명, 학번 검색 기능 및 무한스크롤 기능|


<br/>

|관리자-작가 관리/상세 조회(수정/삭제)|
|:---:|
|<img src="https://github.com/user-attachments/assets/3b3dd2f9-9314-4d5d-82a3-2b542c00027c" height="300"/> <img src="https://github.com/user-attachments/assets/64e475b2-9cdf-423f-bfb5-05104cfdeda8"  height="300"/>|
|FE|
|작가 정보 수정 및 삭제 가능|


<br/>

|관리자-작가 관리/등록|
|:---:|
|<img src="https://github.com/user-attachments/assets/415f31eb-822e-4c51-8af5-0e11219ee90c" height="300"/> <img src="https://github.com/user-attachments/assets/d097fc6a-8b85-45fd-87d8-814792ec2bbd"  height="300"/>|
|FE|
|필수입력 값 입력하여 작가 등록|


<br/>

|관리자-전시회 관리/전체 조회|
|:---:|
|<img src="https://github.com/user-attachments/assets/3ee1031c-96cb-4365-9b8e-339a9f3cb494" height="300"/> <img src="https://github.com/user-attachments/assets/1b1884dd-4552-46c3-ae7b-b760f4658c91"  height="300"/>|
|FE|
|전시회 조회 기능|


<br/>

|관리자-전시회 관리/상세 조회(수정/삭제)|
|:---:|
|<img src="https://github.com/user-attachments/assets/0dc1b7d2-b6ab-4c43-833d-b44fb610a9d1" height="300"/> <img src="https://github.com/user-attachments/assets/aaea2857-5577-474a-94d0-800ef9f5a6bf"  height="300"/>|
|FE|
|전시회 정보 수정 및 삭제 가능|


<br/>

|관리자-전시회 관리/등록|
|:---:|
|<img src="https://github.com/user-attachments/assets/1f743272-09b5-4c1b-adbb-6d214caa88fd" height="300"/> <img src="https://github.com/user-attachments/assets/4b6e5d9c-5add-487e-bf14-4187bb74c7f6"  height="300"/>|
|FE|
|필수 입력 값 입력하여 등록 가능|


<br/>

|관리자-작품 관리/전체 조회|
|:---:|
|<img src="https://github.com/user-attachments/assets/d93e0d5d-68b5-4801-a535-b8d8dc49a9bd" height="300"/> <img src="https://github.com/user-attachments/assets/c9f2284c-c65b-4b42-807c-ae2d1b6bb285"  height="300"/>|
|FE|
|작가명, 작품명 검색 기능 및 무한스크롤 기능|


<br/>

|관리자-작품 관리/상세 조회(수정/삭제)|
|:---:|
|<img src="https://github.com/user-attachments/assets/5989e401-06e5-4ea9-bbb2-4ba69f8ed35b" height="300"/> <img src="https://github.com/user-attachments/assets/f53e42a6-a3ae-4a7f-a38e-9c7e43e17656"  height="300"/>|
|FE|
|모바일 버튼 사이즈 고치기. 작품 정보 수정 및 삭제 가능|


<br/>

|관리자-작품 관리/등록|
|:---:|
|<img src="https://github.com/user-attachments/assets/774e488b-45cd-4b77-8e03-f948d1873674" height="300"/> <img src="https://github.com/user-attachments/assets/c705c7a6-5a7f-42cf-921b-7f20311c8612"  height="300"/>|
|FE|
|필수 입력 값 입력하여 등록 가능|


<br/>

|관리자-교수진 관리/전체 조회|
|:---:|
|<img src="https://github.com/user-attachments/assets/7b01ef3e-a0ba-4274-8bf5-b711f418c26b" height="300"/> <img src="https://github.com/user-attachments/assets/9ff6db0a-fdfa-44d9-8f6f-77b9839ee87a"  height="300"/>|
|FE|
|교수진 조회 기능|


<br/>

|관리자-교수진 관리/상세 조회(수정/삭제)|
|:---:|
|<img src="https://github.com/user-attachments/assets/69c0b212-da9e-4448-a627-e01883286408" height="300"/> <img src="https://github.com/user-attachments/assets/84e7d0e4-6d28-463e-a989-dea46b0b0d46"  height="300"/>|
|FE|
|이미지 업로드, 교수진 정보 수정 및 삭제 가능|


<br/>

|관리자-교수진 관리/등록|
|:---:|
|<img src="https://github.com/user-attachments/assets/2dc7977f-9411-4139-b776-5b07c9627192" height="300"/> <img src="https://github.com/user-attachments/assets/8ccc3fd8-d200-4c2f-b139-d156c14d5eca"  height="300"/>|
|FE|
|선택적 이미지 업로드, 필수 입력 값 입력하여 등록 가능|


<br/>

|메인 홈-헤더/일반 회원|
|:---:|
|<img src="https://github.com/user-attachments/assets/02c5fe75-2a60-47f3-91a6-a43d9e029a31" height="300"/> <img src="https://github.com/user-attachments/assets/6c5a6f60-237c-4bcb-8539-2af64f4e4b41"  height="300"/>|
|FE|
|일반 회원으로 접속 시 보이는 화면 구성|


<br/>

|메인 홈-헤더/관리자 회원|
|:---:|
|<img src="https://github.com/user-attachments/assets/4ae57d4c-e22d-43f2-9b51-11ba6f829605" height="300"/> <img src="https://github.com/user-attachments/assets/6690cbaf-dc95-44eb-a53e-a9163dc3b3a6"  height="300"/>|
|FE|
|관리자 회원으로 접속 시 관리자 페이지 접속 가능|


<br/>

|메인 홈-헤더/네비게이션|
|:---:|
|<img src="https://github.com/user-attachments/assets/8b8c6eee-c002-4a3f-9f80-a45f33c98988" height="300"/> <img src="https://github.com/user-attachments/assets/d7696bd2-aa80-4d55-a1d2-17f1dc8dd6f8"  height="300"/>|
|FE|
|모바일 max-h-[650px]로 수정하기. 데스크탑: Hover 시 서브메뉴 보임 <br /> 모바일: 드롭다운 형식으로 메인 메뉴 클릭시 아래로 서브메뉴 펼쳐짐|


<br/>

|메인 홈-컨텐츠|
|:---:|
|<img src="https://github.com/user-attachments/assets/50287e51-410f-4ca6-be08-05ee3a66d574" height="300"/> <img src="https://github.com/user-attachments/assets/4276e413-5704-465a-a28f-9c491315eb9f"  height="300"/>|
|FE|
|자주 찾는 경로 바로가기 버튼 및 공지사항|


<br/>

|메인 홈-푸터|
|:---:|
|<img src="https://github.com/user-attachments/assets/21fa3949-19a7-425b-8753-2ac95a62b6d8" height="300"/> <img src="https://github.com/user-attachments/assets/223285a2-4ad5-4a48-a32b-a1d1e023c1b0"  height="300"/>|
|FE|
|대표 이메일 및 연락처, 관리자 정보 및 주소, SNS 바로가기 버튼|


<br/>

|메인 홈-사이트맵|
|:---:|
|<img src="https://github.com/user-attachments/assets/ffa46d26-3d68-4155-a856-736c701c002d" height="300"/> <img src="https://github.com/user-attachments/assets/828fc9e9-bbf8-4cdc-b98d-d1146f3fade2"  height="300"/>|
|FE|
|모바일 버전 UI 디자인 수정 필요. 홈페이지 전체 경로 확인 가능한 사이트맵|


<br/>

|메인 홈-스켈레톤|
|:---:|
|<img src="https://github.com/user-attachments/assets/47a31613-ccf4-4a77-8e69-09064c4e0514" height="300"/> <img src="https://github.com/user-attachments/assets/7abfa9b7-37a0-44e7-b8ad-d17f4437ff61"  height="300"/>|
|FE|
|메인 홈 전용 스켈레톤 디자인|


<br/>

|공용 컴포넌트-스켈레톤|
|:---:|
|<img src="https://github.com/user-attachments/assets/c3eff520-5657-4400-860c-b26b17a69883" height="300"/> <img src="https://github.com/user-attachments/assets/87c15780-e059-408f-85c6-bb83c8f262e9"  height="300"/>|
|FE|
|공용으로 재사용 가능한 스켈레톤 디자인|


<br/>

|공용 컴포넌트-준비 중 페이지|
|:---:|
|<img src="https://github.com/user-attachments/assets/bbc28cdd-d135-477f-b7a8-d94cec309a04" height="300"/> <img src="https://github.com/user-attachments/assets/e5118de9-4bdd-42a7-b6ac-256c112a5351"  height="300"/>|
|FE|
|공용으로 재사용 가능한 commin-soon 페이지|


<br/>

<br/>

|작품 상세|
|:---:|
|<img src="https://github.com/user-attachments/assets/67d5c443-4664-4d92-9f1a-0f1f3a1e0c68" height="300"/> <img src="https://github.com/user-attachments/assets/31144512-6fc9-4ad7-ae99-bd63d4987d7c"  height="300"/>|
|FE|
|작품 상세 디자인|


<br/>

|작품 상세-리뷰 작성|
|:---:|
|<img src="https://github.com/user-attachments/assets/b66a158b-5879-4586-975a-122ba22106db" height="300"/> <img src="https://github.com/user-attachments/assets/f62c2232-4fd0-4cd8-8dc9-509523df9b43"  height="300"/>|
|FE|
|작품에 대한 리뷰 작성|


<br/>

|작품 상세-리뷰 목록|
|:---:|
|<img src="https://github.com/user-attachments/assets/156b5ba1-cbc9-47d5-a8eb-0ff6854bdd47" height="300"/> <img src="https://github.com/user-attachments/assets/cbca9ee7-97ef-45b0-8254-54d2e2fb11db"  height="300"/>|
|FE|
|리뷰 목록 조회|


<br/>

|작품 상세-리뷰 상세|
|:---:|
|<img src="https://github.com/user-attachments/assets/ec9476b2-5f65-4e0d-b048-9fdbcf641a81" height="300"/> <img src="https://github.com/user-attachments/assets/aebe1a51-9959-4397-9e58-283f8ed40161"  height="300"/>|
|FE|
|리뷰 목록 조회|


<br/>

|공지사항 - 전체 게시물 목록|
|:---:|
|<img src="https://github.com/user-attachments/assets/77ff6750-98bb-448c-81a3-1f22f3cafeb4" width="550" height="300"/> <img src="https://github.com/user-attachments/assets/85bc2145-e360-4ecb-bca1-05079be34520"  height="300"/>|
|FE|
|공지사항 게시물 목록 조회|


<br/>


|공지사항 - 상세 게시물 조회|
|:---:|
|<img src="https://github.com/user-attachments/assets/04eb9093-4861-4ef2-8713-af8e51b69ffa" width="550" height="300"/> <img src="https://github.com/user-attachments/assets/ac1f5ec7-1d6c-458d-814e-d73d5a194a9f"  height="300"/>|
|FE|
|공지사항 게시물 조회|


<br/>


|공지사항 - 상세 게시물 수정|
|:---:|
|<img src="https://github.com/user-attachments/assets/91fd1efe-78c4-45d7-84c1-ebc8f0117009" width="550" height="300"/> <img src="https://github.com/user-attachments/assets/f055781e-85b2-436d-87d0-9e46ac225984"  height="300"/>|
|FE|
|공지사항 게시물 수정|


<br/>


|공지사항 - 게시물 등록|
|:---:|
|<img src="https://github.com/user-attachments/assets/e1e5b680-acf4-4c82-9776-ebe20e97ff00" width="550" height="300"/> <img src="https://github.com/user-attachments/assets/23ac1a9e-e714-495a-a373-483f7ef47a5e"  height="300"/>|
|FE|
|공지사항 게시물 등록|


<br/>

