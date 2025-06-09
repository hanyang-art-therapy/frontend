type FinalMessageSectionProps = {
  primary?: string;
  secondary: string;
};

// 신입생 안내 마지막 메시지 섹션
export default function FinalMessageSection({
  primary,
  secondary,
}: FinalMessageSectionProps) {
  return (
    <section className='text-center space-y-4 pt-20 border-t border-bg-gray-d'>
      <p className='t-b-24 text-primary'>{primary}</p>
      <p className='t-r-18'>{secondary}</p>
    </section>
  );
}
