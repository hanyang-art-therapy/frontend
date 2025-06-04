import FormField from '@/components/admin/modal-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { getUsers } from '@/apis/admin/users';
import { PatchUserRequest, UserResponse } from '@/types/admin/users';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { handleApiError } from '@/components/common/error-handler';

interface Props {
  user: UserResponse;
  onClose: () => void;
  onEdit: (form: PatchUserRequest) => void;
}

export default function UserModal({ user, onClose, onEdit }: Props) {
  const [form, setForm] = useState({ ...user });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUsers();
      } catch (error) {
        const errorMessage = handleApiError(error);
        toast.error(errorMessage);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onEdit(form);
    onClose();
  };

  const fields = [
    { id: 'userId', label: '아이디' },
    { id: 'userName', label: '이름' },
    { id: 'studentNo', label: '학번' },
    { id: 'email', label: '이메일' },
    { id: 'role', label: '유형' },
    { id: 'userStatus', label: '상태' },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className='max-w-[700px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>USER INFO</DialogTitle>
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
                  <SelectTrigger className='w-full border-none bg-white/0 outline-none'>
                    <SelectValue placeholder='' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='USER' className='hover:bg-primary/10'>
                      USER
                    </SelectItem>
                    <SelectItem value='ARTIST' className='hover:bg-primary/10'>
                      ARTIST
                    </SelectItem>
                    <SelectItem value='ADMIN' className='hover:bg-primary/10'>
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
                    value={(form as any)[id] ?? ''}
                    onChange={handleChange}
                    autoComplete='off'
                    className='w-full px-[15px] outline-none'
                    readOnly={id === 'userId' || id === 'userStatus'}
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
