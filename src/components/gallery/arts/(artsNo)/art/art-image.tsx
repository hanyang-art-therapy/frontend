type ArtImageProps = {
  url: string;
  name: string;
};

export default function ArtImage({ url, name }: ArtImageProps) {
  return (
    <img src={url} alt={name} className='w-full md:w-[720px] mx-auto xl:mx-0' />
  );
}
