import Required from '@/components/ui/required';
import { SIGN_UP_STEP_2 } from '@/constants/auth/sign-up';

export default function SignUpFormIntro() {
  const { section1 } = SIGN_UP_STEP_2;

  return (
    <div>
      <h2 className='title-b-24'>{section1.title}</h2>
      <p className='text-r-18'>{section1.description}</p>
      <p className='text-right text-r-16'>
        (<Required />) {section1.required}
      </p>
    </div>
  );
}
