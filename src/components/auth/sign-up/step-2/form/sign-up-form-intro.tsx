import Required from '@/components/ui/required';
import { SIGN_UP_STEP_2 } from '@/constants/auth/sign-up';

export default function SignUpFormIntro() {
  const { section1 } = SIGN_UP_STEP_2;

  return (
    <div>
      <h2 className='t-b-24'>{section1.title}</h2>
      <p className='t-r-18'>{section1.description}</p>
      <p className='text-right t-r-16'>
        (<Required />) {section1.required}
      </p>
    </div>
  );
}
