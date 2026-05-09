import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { ChangeEvent, FC, useEffect, useState } from 'react';

/**
 * Debounced search bar with clear button.
 * Fires `onSearch` only after the user stops typing for `debounceMs` (default 300).
 * Local state is controlled internally so the input feels instant; the parent
 * only sees a settled value.
 */
interface SearchBarProps {
	/** Called with the debounced query value */
	onSearch: (query: string) => void;
	placeholder?: string;
	debounceMs?: number;
	defaultValue?: string;
	className?: string;
	/** Optional shortcut hint shown on the right (e.g. "⌘K") */
	shortcut?: string;
	disabled?: boolean;
	autoFocus?: boolean;
}

const SearchBar: FC<SearchBarProps> = ({
	onSearch,
	placeholder = 'Search…',
	debounceMs = 300,
	defaultValue = '',
	className,
	shortcut,
	disabled,
	autoFocus,
}) => {
	const [value, setValue] = useState(defaultValue);

	// Debounce the value before bubbling it up
	useEffect(() => {
		const handle = setTimeout(() => {
			onSearch(value);
		}, debounceMs);
		return () => clearTimeout(handle);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, debounceMs]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
	const clear = () => setValue('');

	return (
		<div
			className={cn(
				'relative flex items-center w-full rounded-lg border bg-white transition-colors',
				'border-[#E4E4E7] focus-within:border-[#092E44] focus-within:ring-2 focus-within:ring-[#092E44]/10',
				disabled && 'opacity-50 cursor-not-allowed',
				className,
			)}>
			<Search size={16} className='absolute left-3 text-[#A1A1AA] pointer-events-none' />
			<input
				type='search'
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				disabled={disabled}
				autoFocus={autoFocus}
				className='w-full bg-transparent pl-9 pr-9 py-2 text-sm text-[#18181B] placeholder:text-[#A1A1AA] outline-none [&::-webkit-search-cancel-button]:hidden'
			/>
			{value && !disabled && (
				<button
					type='button'
					onClick={clear}
					aria-label='Clear search'
					className='absolute right-2 inline-flex items-center justify-center h-6 w-6 rounded text-[#71717A] hover:bg-[#FAFAFA] hover:text-[#18181B]'>
					<X size={14} />
				</button>
			)}
			{!value && shortcut && (
				<kbd className='absolute right-3 text-[10px] font-medium text-[#A1A1AA] border border-[#E4E4E7] rounded px-1.5 py-0.5 pointer-events-none'>
					{shortcut}
				</kbd>
			)}
		</div>
	);
};

export default SearchBar;
