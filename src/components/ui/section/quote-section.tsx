import { Quote } from 'lucide-react';

type QuoteSectionProps = {
  content: readonly string[];
};

// 모집 인용구 섹션
export default function QuoteSection({ content }: QuoteSectionProps) {
  return (
    <div className='w-fit space-y-2 mx-auto'>
      <div className='rotate-180 flex justify-end sm:-ml-8'>
        <Quote strokeWidth={1.5} fill='#333' className='sm:-mt-5 -mt-2' />
      </div>

      <div className='text-center'>
        {content.map((text) => (
          <p key={text} className='t-m-24'>
            {text}
          </p>
        ))}
      </div>

      <div className='flex justify-end sm:-mr-8'>
        <Quote strokeWidth={1.5} fill='#333' className='sm:-mt-5 -mt-2' />
      </div>
    </div>
  );
}
