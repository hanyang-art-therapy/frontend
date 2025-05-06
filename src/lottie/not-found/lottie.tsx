import Lottie from 'react-lottie';
import notFound from '@/lottie/not-found/not-found.json';
import { useEffect, useState } from 'react';

export default function NotFoundLottie({ size = 300 }: { size?: number }) {
  const [animationSize, setAnimationSize] = useState(size);

  useEffect(() => {
    const handleResize = () => {
      setAnimationSize(window.innerWidth < 768 ? 150 : size);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className='md:w-[300px] w-[150px]'>
      <Lottie
        options={defaultOptions}
        height={animationSize}
        width={animationSize}
      />
    </div>
  );
}
