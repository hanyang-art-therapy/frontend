import { useEffect, useState } from 'react';
import heic2any from 'heic2any';
import { Skeleton } from '@/components/ui/skeleton';

type ReviewImageWithHeicSupportProps = {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
};

export default function ReviewImageHeicSupport({
  src,
  alt,
  className,
  fallback,
}: ReviewImageWithHeicSupportProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [displayUrl, setDisplayUrl] = useState<string>(src);

  useEffect(() => {
    setIsLoading(true);
    let revoked = false;
    const convertHeic = async () => {
      if (src && src.toLowerCase().endsWith('.heic')) {
        try {
          const res = await fetch(src);
          const heicBlob = await res.blob();
          const convertedBlob = (await heic2any({
            blob: heicBlob,
            toType: 'image/jpeg',
            quality: 0.9,
          })) as Blob;
          const url = URL.createObjectURL(convertedBlob);
          setDisplayUrl(url);
        } catch {
          setDisplayUrl(fallback || '');
        }
      } else {
        setDisplayUrl(src);
      }

      setIsLoading(false);
    };
    convertHeic();

    return () => {
      if (!revoked && displayUrl && displayUrl !== src) {
        URL.revokeObjectURL(displayUrl);
        revoked = true;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  if (!displayUrl) {
    return fallback ? (
      <img src={fallback} alt={alt} className={className} />
    ) : null;
  }

  if (isLoading) {
    return <Skeleton className='w-full h-full' />;
  }

  return <img src={displayUrl} alt={alt} className={className} />;
}
