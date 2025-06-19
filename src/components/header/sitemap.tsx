import { NAV_MENU } from '@/constants/nav';
import { Link } from 'react-router-dom';

export default function Sitemap() {
  let tabIndex = 1;
  return (
    <div className='mt-[60px]'>
      <div className='flex flex-col justify-center items-center gap-[50px]'>
        <div className='w-full h-[400px] bg-bg-gray-fa flex justify-center items-center'>
          <h2 className='t-b-80'>SITE MAP</h2>
        </div>
        <ul className='flex flex-row flex-wrap justify-center gap-[30px] px-[20px] py-10 mx-auto'>
          <li className='bg-primary/10 p-[15px] rounded-md'>
            <ul className='flex flex-col gap-[10px]'>
              <li className='t-b-18 text-nowrap'>
                <Link to={'/'} tabIndex={tabIndex++}>
                  메인화면으로 이동
                </Link>
              </li>
              <li className='t-b-18 text-nowrap'>
                <Link to='/sign-in' tabIndex={tabIndex++}>
                  로그인
                </Link>
              </li>
              <li className='t-b-18 text-nowrap'>
                <Link to='/sign-up' tabIndex={tabIndex++}>
                  회원가입
                </Link>
              </li>
              <li className='t-b-18 text-nowrap'>
                <Link to='/my-page/reviews' tabIndex={tabIndex++}>
                  마이페이지
                </Link>
              </li>
            </ul>
          </li>
          {NAV_MENU.map((menu) => (
            <li className='flex flex-col gap-[10px] bg-primary/10 p-[15px] rounded-md'>
              <h3 className='t-b-18 text-nowrap'>
                <Link to={menu.path} tabIndex={tabIndex++}>
                  {menu.title}
                </Link>
              </h3>
              <ul className='flex flex-col gap-[5px]'>
                {menu.submenu.map((submenu) => (
                  <li className='t-m-16 text-nowrap'>
                    <Link to={submenu.path} tabIndex={tabIndex++}>
                      {submenu.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
