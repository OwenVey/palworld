'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-gray-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-12 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gray-3 hover:bg-gray-4 data-[state=on]:bg-primary-5 border border-gray-6 hover:border-gray-8 data-[state=on]:border-primary-9',
        secondary:
          'bg-transparent hover:bg-gray-3 hover:text-gray-11 data-[state=on]:bg-gray-5 data-[state=on]:text-gray-12',
        outline:
          'border border-gray-7 bg-transparent hover:bg-gray-3 hover:border-gray-8 data-[state=on]:border-gray-8 data-[state=on]:bg-gray-5',
      },
      size: {
        default: 'h-10 px-3',
        icon: 'size-10',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
