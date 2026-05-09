import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

/**
 * Pill-shaped CTA button with a circular icon slot on the right.
 * Reuses the existing Flexprice palette — primary navy (#092E44) or neutral black —
 * only the layout and hover animation are new (icon rotates 45deg, button scales).
 */
interface CtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	icon?: ReactNode;
	variant?: 'primary' | 'dark' | 'outline';
	size?: 'sm' | 'md' | 'lg';
}

const SIZES = {
	sm: { pad: 'pl-4 pr-1 py-1', circle: 'h-7 w-7', text: 'text-xs' },
	md: { pad: 'pl-6 pr-1.5 py-1.5', circle: 'h-9 w-9', text: 'text-sm' },
	lg: { pad: 'pl-8 pr-2 py-2', circle: 'h-11 w-11', text: 'text-base' },
} as const;

const CtaButton: FC<CtaButtonProps> = ({ children, icon, variant = 'primary', size = 'md', className, disabled, ...props }) => {
	const dim = SIZES[size];

	return (
		<button
			{...props}
			disabled={disabled}
			className={cn(
				'group inline-flex items-center gap-3 rounded-full font-medium',
				'transition-all duration-300 ease-out',
				'hover:scale-[1.02] active:scale-[0.98]',
				'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#092E44]',
				'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
				dim.pad,
				dim.text,
				variant === 'primary' && 'bg-[#092E44] text-white shadow-md hover:shadow-lg',
				variant === 'dark' && 'bg-black text-white shadow-md hover:shadow-lg',
				variant === 'outline' && 'border border-[#092E44] text-[#092E44] hover:bg-[#092E44]/5',
				className,
			)}>
			<span>{children}</span>
			<span
				className={cn(
					'flex items-center justify-center rounded-full transition-transform duration-300 ease-out',
					'group-hover:rotate-45',
					dim.circle,
					variant === 'outline' ? 'bg-[#092E44] text-white' : 'bg-white text-[#092E44]',
				)}>
				{icon ?? <ArrowUpRight size={size === 'sm' ? 14 : size === 'lg' ? 20 : 18} strokeWidth={2.2} />}
			</span>
		</button>
	);
};

export default CtaButton;
