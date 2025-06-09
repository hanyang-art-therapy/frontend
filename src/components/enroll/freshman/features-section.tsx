import { SectionHeader } from '@/components/enroll/common';

type Feature = {
  readonly title: string;
  readonly description: string;
};

type FeaturesSectionProps = {
  features: readonly Feature[];
};

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section className='space-y-6'>
      <SectionHeader title='학과의 특징' />

      <ul className='list-disc list-inside t-r-16 mt-2 space-y-3'>
        {features.map((feature, index) => (
          <li key={index}>
            <span className='t-b-16'>{feature.title}</span>:{' '}
            <span className='t-r-16'>{feature.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
