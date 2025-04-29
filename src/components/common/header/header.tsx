// 코드가 너무 길어지는 것 이외에도 책임 분리가 필요하면 top-header, bottom-header 2개의 컴포넌트로 분리

export default function Header() {
  return (
    <header className='sticky top-0 z-10'>
      {/* Header - TOP */}
      <div className='bg-white h-10'>
        <div className='flex justify-between items-center container h-full px-2'>
          <span>사이트맵</span>

          <div>
            <button>로그인</button>
            <button>회원가입</button>
          </div>
        </div>
      </div>

      {/* Header - BOT */}
      <div className='bg-gray-100/50 h-15 shadow-md'>
        <div className='flex justify-between items-center container h-full px-2'>
          <div>로고 자리</div>

          <ul className='flex gap-4'>
            <li>내</li>
            <li>비</li>
            <li>게</li>
            <li>이</li>
            <li>션</li>
          </ul>

          <div>우측</div>
        </div>
      </div>
    </header>
  );
}
