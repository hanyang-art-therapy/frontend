import FormField from '@/components/admin/form-field';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { UserResponse, PatchUserRequest } from '@/types/admin/users';
import { User, MessageResponse } from '@/types';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { handleApiError } from '@/components/common/error-handler';

type Props = {
  user: UserResponse;
  onEdit: (form: PatchUserRequest) => Promise<MessageResponse>;
  onClose: () => void;
};

export default function UserModal({ user, onEdit, onClose }: Props) {
  type UserFormState = Omit<User, 'password'>;

  const [form, setForm] = useState<UserFormState>({
    userNo: 0,
    userId: '',
    email: '',
    userName: '',
    studentNo: 0,
    role: 'USER',
    userStatus: '',
  });

  useEffect(() => {
    setForm({
      userNo: user.userNo,
      userId: user.userId,
      email: user.email,
      userName: user.userName,
      studentNo: user.studentNo,
      role: user.role as 'USER' | 'ARTIST' | 'ADMIN',
      userStatus: user.userStatus,
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value.replace(/\s+/g, ''), // 공백 제거
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (form.userName.length < 2 || form.userName.length > 50) {
      toast.error('이름은 2자 이상 50자 이하로 입력해주세요.');
      return;
    }
    if (form.role === 'ARTIST') {
      if (!form.userName || !form.studentNo) {
        toast.error('이름, 학번 모두 입력해주세요.');
        return;
      }
      if (!form.studentNo || isNaN(form.studentNo)) {
        toast.error('학번은 숫자만 입력이 가능합니다.');
        return;
      }
      if (String(form.studentNo).length !== 10) {
        toast.error('학번은 10자리 숫자만 입력이 가능합니다.');
        return;
      }
      if (/^0+$/.test(String(form.studentNo))) {
        toast.error('학번은 0으로만 구성될 수 없습니다.');
        return;
      }
    }

    try {
      const submitForm: PatchUserRequest = {
        userNo: form.userNo,
        userId: form.userId,
        email: form.email,
        userName: form.userName,
        studentNo: form.studentNo ?? '',
        role: form.role as 'USER' | 'ARTIST' | 'ADMIN',
        userStatus: form.userStatus,
      };
      const res = await onEdit(submitForm);
      toast.success(res.message);

      onClose();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const fields = [
    { id: 'userId', label: '아이디' },
    { id: 'role', label: '유형' },
    { id: 'userName', label: '이름' },
    { id: 'studentNo', label: '학번' },
    { id: 'email', label: '이메일' },
    { id: 'userStatus', label: '상태' },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className='max-w-[700px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>USER INFO</DialogTitle>
          <DialogDescription className='text-center'>
            회원 상세 정보
          </DialogDescription>
        </DialogHeader>

        <div className='w-full border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
          {fields.map(({ id, label }) => (
            <FormField key={id} id={id} label={label}>
              {id === 'role' ? (
                <Select
                  value={form.role}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      role: value as 'USER' | 'ARTIST' | 'ADMIN',
                    }))
                  }
                >
                  <SelectTrigger className='w-full border-none bg-white/0 outline-none cursor-pointer'>
                    <SelectValue placeholder='' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value='USER'
                      className='cursor-pointer hover:bg-primary/10'
                    >
                      USER
                    </SelectItem>
                    <SelectItem
                      value='ARTIST'
                      className='cursor-pointer hover:bg-primary/10'
                    >
                      ARTIST
                    </SelectItem>
                    <SelectItem
                      value='ADMIN'
                      className='cursor-pointer hover:bg-primary/10'
                    >
                      ADMIN
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className='relative w-full'>
                  <input
                    id={id}
                    name={id}
                    type={id}
                    value={form[id as keyof UserFormState] ?? ''}
                    onChange={handleChange}
                    autoComplete='off'
                    className={`w-full px-[15px] outline-none cursor-pointer ${
                      id === 'userId' ||
                      id === 'userStatus' ||
                      id === 'email' ||
                      (id === 'studentNo' &&
                        (form.role === 'USER' || form.role === 'ADMIN'))
                        ? 'bg-bg-gray-fa h-[44px] !cursor-default'
                        : ''
                    }`}
                    readOnly={
                      id === 'userId' ||
                      id === 'userStatus' ||
                      id === 'email' ||
                      (id === 'studentNo' &&
                        (form.role === 'USER' || form.role === 'ADMIN'))
                    }
                  />
                </div>
              )}
            </FormField>
          ))}
        </div>

        <DialogFooter className='mx-auto mt-[10px]'>
          <Button onClick={handleSubmit}>수정</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
