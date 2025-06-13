import IntroTitle from '@/components/intro/intro-title';
import IntroSection from '@/components/ui/section/intro-section';
import KakaoMap from '@/components/intro/map/kakao-map';
import { MAP } from '@/constants/intro/map';
import ListStyleSection from '@/components/ui/section/list-style-section';
import { useSmoothToTop } from '@/hooks/use-smooth-to-top';

export default function IntroMap() {
  const HY_LAT = 37.298283894;
  const HY_LNG = 126.838831145;

  const { intro, publicTransport, car, info, walkThrough } = MAP;

  useSmoothToTop();

  return (
    <div className='space-y-20 pt-15 min-h-screen-vh max-w-[1260px] mx-auto mt-15 xl:px-0 px-5'>
      <IntroTitle title='오시는 길' />
      <IntroSection title={intro.title} description={intro.description} />
      <KakaoMap lat={HY_LAT} lng={HY_LNG} />

      <div className='space-y-10'>
        <ListStyleSection
          title={publicTransport.subway.title}
          subTitle={publicTransport.subway.subTitle}
          contents={publicTransport.subway.contents}
          icon={publicTransport.subway.icon}
        />
        <ListStyleSection
          subTitle={publicTransport.bus.subTitle}
          contents={publicTransport.bus.contents}
          icon={publicTransport.bus.icon}
        />
        <ListStyleSection title={car.title} contents={car.contents} />
      </div>

      <ListStyleSection title={info.title} contents={info.contents} />
      <ListStyleSection
        title={walkThrough.title}
        contents={walkThrough.contents}
      />
    </div>
  );
}
