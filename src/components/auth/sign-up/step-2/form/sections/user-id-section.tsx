// import { checkId } from '@/apis/auth/sign-up';
// import { handleApiError } from '@/components/common/error-handler';
// import { Input } from '@/components/ui/input';
// import Required from '@/components/ui/required';
// import type { SignUpFormValues } from '@/schemas/sign-up/sign-up-schema';
// import type { Dispatch, FocusEvent, SetStateAction } from 'react';
// import type {
//   FieldErrors,
//   UseFormRegister,
//   UseFormSetError,
//   UseFormWatch,
// } from 'react-hook-form';

// type UserIdSectionProps = {
//   register: UseFormRegister<SignUpFormValues>;
//   watch: UseFormWatch<SignUpFormValues>;
//   errors: FieldErrors<SignUpFormValues>;
//   setError: UseFormSetError<SignUpFormValues>;
//   setIsUserIdValid: Dispatch<SetStateAction<boolean>>;
// };

// export default function UserIdSection({
//   register,
//   watch,
//   errors,
//   setError,
//   setIsUserIdValid,
// }: UserIdSectionProps) {
//   const { onBlur, ...rest } = register('userId');

//   const watchUserId = watch('userId');

//   const handleBlur = async (event: FocusEvent<HTMLInputElement>) => {
//     onBlur(event);

//     try {
//       await checkId({
//         userId: watchUserId,
//       });

//       setIsUserIdValid(true);
//     } catch (error) {
//       const errorMessage = handleApiError(error);

//       setError('userId', {
//         type: 'manual',
//         message: errorMessage,
//       });

//       setIsUserIdValid(false);
//     }
//   };

//   return (
//     <div className='py-[20px] space-y-2.5 border-b border-bg-gray-d'>
//       <label className='t-b-16 flex items-center'>
//         아이디 <Required nbsp />
//       </label>
//       <div className='flex gap-[30px] h-[45px]'>
//         <Input
//           onBlur={handleBlur}
//           className='w-[200px] h-auto'
//           autoComplete='username'
//           placeholder='아이디를 입력해주세요.'
//           {...rest}
//         />
//       </div>

//       {errors.userId && (
//         <p className='text-destructive t-r-14'>{errors.userId.message}</p>
//       )}
//     </div>
//   );
// }
