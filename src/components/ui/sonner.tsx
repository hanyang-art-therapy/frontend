import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';
import { CircleAlert, Check, AlertTriangle, Info } from 'lucide-react';
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',

          '--error-bg': 'var(--destructive-background)',
          '--error-text': 'var(--destructive)',
          '--error-border': 'var(--destructive-border)',

          '--success-bg': 'var(--success-background)',
          '--success-text': 'var(--success)',
          '--success-border': 'var(--success-border)',
        } as React.CSSProperties
      }
      icons={{
        error: <CircleAlert size={16} />,
        success: <Check size={16} />,
        warning: <AlertTriangle size={16} />,
        info: <Info size={16} />,
      }}
      {...props}
    />
  );
};

export { Toaster };
