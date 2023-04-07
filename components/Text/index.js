import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot'

export function Text({size = 'md', children, asChild, className}){
    const Comp = asChild ? Slot : 'span'

    return (
        <Comp className={clsx(
            'text-gray-500 font-sans',
            {
                'text-xs': size === 'sm',
                'text-sm': size === 'md',
                'text-md': size === 'lg',
            },
            className
        )}>{children}</Comp >
    )
}