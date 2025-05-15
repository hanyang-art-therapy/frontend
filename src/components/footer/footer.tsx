import Contact from '@/components/footer/sections/footer-contact';
import Address from '@/components/footer/sections/footer-address';

export default function Footer() {
  return (
    <footer className='w-full mt-[100px]'>
      {/* footer 상단 - 연락처 */}
      <Contact />
      {/* footer 하단 - 담당자 및 주소 */}
      <Address />
    </footer>
  );
}
