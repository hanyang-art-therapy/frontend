import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

type ShowPasswordProps = {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  className?: string;
};

export default function ShowPassword({
  showPassword,
  setShowPassword,
  className,
}: ShowPasswordProps) {
  return (
    <Button
      type='button'
      size='icon'
      variant='ghost'
      onClick={() => setShowPassword((prev) => !prev)}
      className={cn('absolute right-2 top-1/2 -translate-y-1/2', className)}
      tabIndex={-1}
    >
      {showPassword ? <EyeOff color='#333' /> : <Eye color='#333' />}
    </Button>
  );
}
