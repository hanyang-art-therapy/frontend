export default function Required({ nbsp }: { nbsp?: boolean }) {
  return (
    <span className='text-secondary whitespace-pre'>{nbsp ? ' *' : '*'}</span>
  );
}
