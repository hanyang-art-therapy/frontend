type ArtImageProps = {
  url: string;
  name: string;
};

export default function ArtImage({ url, name }: ArtImageProps) {
  return (
    <img
      src={url}
      alt={name}
      className='w-auto mx-auto xl:mx-0 box-shadow-style'
    />
  );
}
