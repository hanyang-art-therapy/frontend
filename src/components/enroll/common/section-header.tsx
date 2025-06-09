type SectionHeaderProps = {
  title: string;
};

// 섹션 헤더 컴포넌트
export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h3 className='t-b-24 mb-4 flex items-center gap-4'>
      <div className='w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full' />
      {title}
    </h3>
  );
}
