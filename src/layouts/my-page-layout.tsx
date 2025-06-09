import ScrollToTopButton from '@/components/common/scroll-to-top';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import Nav from '@/components/nav/nav';
import Step from '@/components/ui/step';
import { MY_PAGE_STEP_ITEMS } from '@/constants/my-page/my-page';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function MyPageLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const defaultStep = MY_PAGE_STEP_ITEMS[0].value;
  const currentStep = pathname.split('/')[2] || defaultStep;

  const [step, setStep] = useState(currentStep);

  const handleStepChange = (step: string) => {
    setStep(step);
    navigate(`/my-page/${step}`);
  };

  useEffect(() => {
    setStep(currentStep);
  }, [currentStep]);

  return (
    <div className='relative'>
      <Header />
      <Nav />
      <Step
        items={MY_PAGE_STEP_ITEMS}
        step={step}
        onChange={handleStepChange}
        className='mt-15'
      />
      <main className='min-h-screen-vh max-w-[1260px] mx-auto  xl:px-0 px-5'>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
