import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';

export function cn(...inputValues: ClassValue[]) {
    return twMerge(clsx(inputValues));
}
