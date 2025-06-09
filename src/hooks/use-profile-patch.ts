import { patchMyProfile, postEmailVerification } from '@/apis/my-page/profile';
import { handleApiError } from '@/components/common/error-handler';
import type { MyProfileData } from '@/types/my-page';
import { useState } from 'react';
import { toast } from 'sonner';

type PatchProfileParams = {
  userName?: string;
  email?: string;
  studentNo?: string;
  verificationCode?: string;
};

export const useProfilePatch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validateName = (name: string): string | null => {
    if (name.trim().length > 50) {
      return '이름은 50자 이하로 입력해주세요.';
    }
    if (name.trim().length < 2) {
      return '이름은 2자 이상으로 입력해주세요.';
    }
    return null;
  };

  const validateStudentNo = (studentNo: string): string | null => {
    if (studentNo.length !== 10) {
      return '학번은 10자로 입력해주세요.';
    }
    return null;
  };

  const validateEmail = (
    emailId: string | null,
    emailDomain: string | null
  ): string | null => {
    if (emailId && emailId.length > 30) {
      return '이메일은 30자 이하로 입력해주세요.';
    }
    if (emailDomain && emailDomain.length > 30) {
      return '이메일 도메인은 30자 이하로 입력해주세요.';
    }

    return null;
  };

  const validateVerificationCode = (
    verificationCode: string | null
  ): string | null => {
    if (!verificationCode) {
      return '인증 코드를 입력해주세요.';
    }

    // if (verificationCode.length !== 10) {
    //   return '인증 코드는 10자로 입력해주세요.';
    // }

    return null;
  };

  const patchProfile = async (
    params: PatchProfileParams,
    successMessage: string
  ): Promise<MyProfileData | null> => {
    setIsLoading(true);
    try {
      const response = await patchMyProfile(params);

      toast.success(successMessage);

      return response;
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationCode = async (email: string) => {
    try {
      const response = await postEmailVerification({ email });

      toast.success(response.message);

      return response;
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);

      return null;
    }
  };

  return {
    isLoading,
    validateName,
    validateStudentNo,
    validateEmail,
    validateVerificationCode,
    patchProfile,
    sendVerificationCode,
  };
};
