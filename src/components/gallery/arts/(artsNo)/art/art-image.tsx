type ArtImageProps = {
  url: string;
  name: string;
};

export default function ArtImage({ url, name }: ArtImageProps) {
  return (
    <img
      src={url}
      alt={name}
      className='w-auto object-contain mx-auto xl:mx-0 drop-shadow-lg md:max-w-[720px]'
    />
  );
}
