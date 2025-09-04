import { cva, type VariantProps } from 'cva'

export const headingVariants = cva(
  // Base styles applied to all headings
  'font-bold text-pretty mb-6',
  {
    variants: {
      variant: {
        default: 'text-black',
        primary: 'text-white',
        secondary: 'text-gray-700',
        gradient: 'bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent',
      },
      size: {
        h1: 'text-3xl/snug tablet:text-5xl/snug',
        h2: 'text-2xl/snug tablet:text-4xl/snug',
        h3: 'text-xl/snug tablet:text-3xl/snug',
        h4: 'text-lg/snug tablet:text-2xl/snug',
        h5: 'text-base/snug tablet:text-xl/snug',
        h6: 'text-sm/snug tablet:text-lg/snug',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        bold: 'font-bold',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        leftCenter: 'text-center tablet:text-left',
      },
      lineHeight: {
        none: '!leading-none',
        tight: '!leading-tight',
        snug: '!leading-snug',
        normal: '!leading-normal',
        relaxed: '!leading-relaxed',
        loose: '!leading-loose',
      },
      bottomSpacing: {
        none: 'mb-0',
        tight: 'mb-2',
        normal: 'mb-4',
        relaxed: 'mb-6',
        loose: 'mb-8',
        custom: 'mb-10 mt-4',
      }
    },
    defaultVariants: {
      variant: 'default',
      weight: 'bold',
      align: 'left',
    }
  }
);

export type HeadingVariants = VariantProps<typeof headingVariants>; 