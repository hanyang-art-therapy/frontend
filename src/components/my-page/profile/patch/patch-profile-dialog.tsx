import EmailField from '@/components/my-page/profile/patch/fields/email-field';
import NameField from '@/components/my-page/profile/patch/fields/name-field';
import StudentNoField from '@/components/my-page/profile/patch/fields/student-no-field';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProfilePatch } from '@/hooks/use-profile-patch';
import type { MyProfileData } from '@/types/my-page';
import { LoaderCircle } from 'lucide-react';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { toast } from 'sonner';

type PatchProfileDialogProps = {
  selectedProperty: string;
  userName: string;
  email: string;
  studentNo: string;
  setMyProfileData: Dispatch<SetStateAction<MyProfileData>>;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function PatchProfileDialog({
  selectedProperty,
  userName,
  email,
  studentNo,
  setMyProfileData,
  isDialogOpen,
  setIsDialogOpen,
}: PatchProfileDialogProps) {
  const [localName, setLocalName] = useState(userName);
  const [localEmailId, setLocalEmailId] = useState<string | null>(null);
  const [localEmailDomain, setLocalEmailDomain] = useState<string | null>(null);
  const [localStudentNo, setLocalStudentNo] = useState(studentNo);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);

  const {
    isLoading,
    validateName,
    validateStudentNo,
    validateEmail,
    validateVerificationCode,
    sendVerificationCode,
    patchProfile,
  } = useProfilePatch();

  const handleEmailDomainChange = (value: string) => {
    setLocalEmailDomain(value);
  };

  const handleSendVerificationCode = async () => {
    const response = await sendVerificationCode(
      `${localEmailId}@${localEmailDomain}`
    );

    if (response) {
      setShowVerification(true);
    }

    return response;
  };

  // [삭제 - 학번] 버튼 클릭 핸들러
  const handleDeleteStudentNoClick = async () => {
    const response = await patchProfile(
      { studentNo: '' },
      '학번이 삭제되었습니다.'
    );

    if (response) {
      setMyProfileData((prev) => ({ ...prev, ...response }));
      setIsDialogOpen(false);
    }
  };

  // [수정] 버튼 클릭 핸들러
  const handlePatchProfileClick = async () => {
    let validationError: string | null = null;

    if (selectedProperty === 'userName') {
      validationError = validateName(localName);

      if (validationError) {
        return toast.error(validationError);
      }

      const response = await patchProfile(
        { userName: localName },
        '이름이 수정되었습니다.'
      );

      if (response) {
        setMyProfileData((prev) => ({ ...prev, ...response }));
        setIsDialogOpen(false);
      }
    }

    if (selectedProperty === 'email') {
      validationError = validateEmail(localEmailId, localEmailDomain);
      const verificationError = validateVerificationCode(verificationCode);

      if (validationError || verificationError) {
        return toast.error(validationError || verificationError);
      }

      const response = await patchProfile(
        {
          email: `${localEmailId}@${localEmailDomain}`,
          verificationCode: verificationCode as string,
        },
        '이메일이 수정되었습니다.'
      );

      if (response) {
        setMyProfileData((prev) => ({ ...prev, ...response }));
        setIsDialogOpen(false);
      }
    }

    if (selectedProperty === 'studentNo') {
      validationError = validateStudentNo(localStudentNo);
      if (validationError) {
        return toast.error(validationError);
      }

      const response = await patchProfile(
        { studentNo: localStudentNo },
        '학번이 수정되었습니다.'
      );

      if (response) {
        setMyProfileData((prev) => ({ ...prev, ...response }));
        setIsDialogOpen(false);
      }
    }
  };

  useEffect(() => {
    setShowVerification(false);
  }, [isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className='gap-4 w-full lg:w-fit'>
        <DialogHeader>
          <DialogTitle>개인정보 수정</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col gap-4 p-0 sm:p-4'>
          {selectedProperty === 'userName' && (
            <NameField value={localName} onChange={setLocalName} />
          )}

          {selectedProperty === 'email' && (
            <EmailField
              originalEmailId={email.split('@')[0]}
              originalEmailDomain={email.split('@')[1]}
              localEmailId={localEmailId}
              localEmailDomain={localEmailDomain}
              onEmailIdChange={setLocalEmailId}
              onEmailDomainChange={handleEmailDomainChange}
              onSendVerificationCode={handleSendVerificationCode}
              isVerificationSent={showVerification}
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
            />
          )}

          {selectedProperty === 'studentNo' && (
            <StudentNoField
              value={localStudentNo}
              onChange={setLocalStudentNo}
            />
          )}
        </div>

        <DialogFooter className='flex flex-row justify-end gap-2 mt-6 md:mt-4'>
          {selectedProperty === 'studentNo' && (
            <Button
              className='w-16 md:w-24 h-[40px] t-r-16'
              onClick={handleDeleteStudentNoClick}
              disabled={isLoading}
              variant='destructive'
            >
              삭제
            </Button>
          )}

          <Button
            className='w-16 md:w-24 h-[40px] t-r-16'
            onClick={handlePatchProfileClick}
            disabled={isLoading}
          >
            수정
            {isLoading && <LoaderCircle className='w-4 h-4 animate-spin' />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
