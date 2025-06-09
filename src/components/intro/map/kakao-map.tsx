/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleApiError } from '@/components/common/error-handler';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

type IntroMapProps = {
  lat: number;
  lng: number;
};

export default function KakaoMap({ lat, lng }: IntroMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);

  const loadKakaoMapScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window?.kakao && window?.kakao?.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP_API_KEY
      }&autoload=false`;
      script.onload = () => window.kakao.maps.load(() => resolve());
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const createCustomOverlayHTML = (lat: number, lng: number) => {
    const mapUrl = `https://map.kakao.com/link/map/${encodeURIComponent(
      '한양대학교 융합산업대학원'
    )},${lat},${lng}`;

    return `
      <div style="
        position: relative;
        display: inline-block;
        background-color: white;
        border: 1px solid #f18100;
        border-radius: 8px;
        font-weight: bold;
        overflow: hidden;
        font-size: 12px;
      ">
        <a href="${mapUrl}" target="_blank" style="display: flex; align-items: center; text-decoration: none;">
          <span style="padding: 8px 12px; color: #333; flex: 1;">카카오맵 바로가기</span>
          <span style="background-color: #f18100; color: #fff; padding: 8px; font-weight: bold;">&gt;</span>
        </a>
        <div style="
          content: '';
          position: absolute;
          bottom: -6px;
          left: 16px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid white;
        "></div>
      </div>
    `;
  };

  useEffect(() => {
    let isMounted = true;

    loadKakaoMapScript()
      .then(() => {
        if (!isMounted || !mapContainer.current) return;

        const kakao = window.kakao;
        const position = new kakao.maps.LatLng(lat, lng);

        const mapOption = {
          center: position,
          level: 3,
        };

        const mapInstance = new kakao.maps.Map(mapContainer.current, mapOption);
        mapRef.current = mapInstance;

        const marker = new kakao.maps.Marker({ position });
        marker.setMap(mapInstance);

        const customOverlay = new kakao.maps.CustomOverlay({
          map: mapInstance,
          position: position,
          content: createCustomOverlayHTML(lat, lng),
          yAnchor: 2,
        });
        customOverlay.setMap(mapInstance);

        const mapTypeControl = new kakao.maps.MapTypeControl();
        const zoomControl = new kakao.maps.ZoomControl();
        mapInstance.addControl(
          mapTypeControl,
          kakao.maps.ControlPosition.TOPRIGHT
        );
        mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      })
      .catch((error) => {
        const errorMessage = handleApiError(error);
        toast.error(errorMessage);
      });

    return () => {
      isMounted = false;
    };
  }, [lat, lng]);

  return (
    <div
      ref={mapContainer}
      className='rounded-[5px] box-shadow-style w-full h-[400px] mx-auto'
    />
  );
}
