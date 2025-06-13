import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-normal transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-bg-primary text-white shadow-xs hover:bg-bg-primary/80',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 ',
        outline: 'border border-gray-3  shadow-xs hover:bg-bg-gray-fa/80',
        gray: 'border border-gray-300 bg-gray-3 text-gray-800 shadow-xs hover:bg-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-600',
        secondary:
          'bg-bg-secondary/80 text-white shadow-xs hover:bg-secondary/60',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-[45px] w-[200px] py-[14px] t-b-18',
        sm: 'h-[36px] py-[14px] px-3 has-[>svg]:px-4 text-r-14 text-white',
        lg: 'h-10 px-6 has-[>svg]:px-4 t-m-18',
        icon: 'size-9 px-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ className, variant, size }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
