import type { FieldErrors, UseFormWatch } from 'react-hook-form';
import type {
  MemberSignUpFormValues,
  SignUpFormValues,
} from '@/schemas/sign-up/sign-up-schema';
import type { UserType } from '@/types/auth/sign-up';

export const getValidationStates = ({
  watch,
  errors,
  isEmailValid,
  isStudentNoValid,
  userType,
}: {
  watch: UseFormWatch<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  isEmailValid: boolean;
  isStudentNoValid: boolean;
  userType: UserType;
}) => {
  const emailValid =
    !errors.emailId &&
    !errors.emailDomain &&
    Boolean(watch('emailId')) &&
    Boolean(watch('emailDomain')) &&
    isEmailValid;

  const passwordValid =
    emailValid && !errors.password && Boolean(watch('password'));

  const confirmPasswordValid =
    passwordValid &&
    !errors.confirmPassword &&
    Boolean(watch('confirmPassword'));

  const studentNoValid =
    (userType !== 'member' && confirmPasswordValid) ||
    (confirmPasswordValid &&
      !(errors as FieldErrors<MemberSignUpFormValues>).studentNo &&
      Boolean(watch('studentNo')) &&
      isStudentNoValid);

  return { emailValid, passwordValid, confirmPasswordValid, studentNoValid };
};
