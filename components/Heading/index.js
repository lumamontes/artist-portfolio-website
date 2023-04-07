import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot'


export function Heading({size = 'xlg', children, asChild, className}){
    const Comp = asChild ? Slot : 'h2'

    return (
        <Comp className={clsx(
            'text-gray-700 font-bold font-sans',
            {
                'text-lg': size == 'sm',
                'text-xl': size == 'md',
                'text-2xl': size == 'lg',
                'text-4xl': size == 'xlg',
            },
            className 
        )}>{children}</Comp >
    )
}