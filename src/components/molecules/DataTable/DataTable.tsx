import { cn } from '@/lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, useMemo, useRef, useState } from 'react';

/**
 * Generic sortable DataTable used across the Flexprice dashboard
 * (invoices, customers, subscriptions). Supports loading skeletons,
 * empty states, pagination, row click and optional virtualization
 * via @tanstack/react-virtual for 10k+ row datasets.
 */
export interface Column<T> {
	/** Unique column key */
	key: string;
	/** Header label shown in <th> */
	header: string;
	/** Optional fixed width (px or CSS string) */
	width?: number | string;
	/** Allow sorting on this column */
	sortable?: boolean;
	/** Cell text alignment */
	align?: 'left' | 'center' | 'right';
	/** Custom cell renderer; receives the full row */
	render?: (row: T) => ReactNode;
	/** Returns the sortable value for this column. Required when sortable=true. */
	accessor?: (row: T) => string | number;
}

interface DataTableProps<T> {
	columns: Column<T>[];
	data: T[];
	/** Stable row key — either a property name or a function */
	rowKey: keyof T | ((row: T) => string | number);
	loading?: boolean;
	/** Number of skeleton rows shown when loading */
	skeletonRows?: number;
	/** Custom empty-state element */
	emptyState?: ReactNode;
	onRowClick?: (row: T) => void;
	/** Enable virtual scrolling (needed for 1k+ rows) */
	virtualized?: boolean;
	/** Estimated row height in px when virtualized */
	estimatedRowHeight?: number;
	/** Container max height when virtualized */
	maxHeight?: number;
	/** Pagination — current page (1-indexed) */
	page?: number;
	pageSize?: number;
	totalRows?: number;
	onPageChange?: (page: number) => void;
	className?: string;
}

type SortState = { key: string; dir: 'asc' | 'desc' } | null;

const alignClass = (a?: 'left' | 'center' | 'right') =>
	a === 'right' ? 'text-right' : a === 'center' ? 'text-center' : 'text-left';

function DataTable<T>({
	columns,
	data,
	rowKey,
	loading = false,
	skeletonRows = 6,
	emptyState,
	onRowClick,
	virtualized = false,
	estimatedRowHeight = 48,
	maxHeight = 480,
	page,
	pageSize,
	totalRows,
	onPageChange,
	className,
}: DataTableProps<T>) {
	const [sort, setSort] = useState<SortState>(null);

	const resolveKey = (row: T): string | number =>
		typeof rowKey === 'function' ? rowKey(row) : (row[rowKey] as unknown as string | number);

	// Apply client-side sort if enabled
	const sortedData = useMemo(() => {
		if (!sort) return data;
		const col = columns.find((c) => c.key === sort.key);
		if (!col?.accessor) return data;
		const acc = col.accessor;
		return [...data].sort((a, b) => {
			const av = acc(a);
			const bv = acc(b);
			if (av < bv) return sort.dir === 'asc' ? -1 : 1;
			if (av > bv) return sort.dir === 'asc' ? 1 : -1;
			return 0;
		});
	}, [data, sort, columns]);

	const handleSortClick = (col: Column<T>) => {
		if (!col.sortable) return;
		setSort((prev) => {
			if (!prev || prev.key !== col.key) return { key: col.key, dir: 'asc' };
			if (prev.dir === 'asc') return { key: col.key, dir: 'desc' };
			return null; // third click clears sort
		});
	};

	const Header = (
		<thead className='bg-[#FAFAFA] border-b border-[#E4E4E7]'>
			<tr>
				{columns.map((col) => {
					const isActive = sort?.key === col.key;
					const Icon = !isActive ? ChevronsUpDown : sort.dir === 'asc' ? ChevronUp : ChevronDown;
					return (
						<th
							key={col.key}
							onClick={() => handleSortClick(col)}
							style={{ width: col.width }}
							className={cn(
								'px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#71717A]',
								alignClass(col.align),
								col.sortable && 'cursor-pointer hover:text-[#092E44] select-none',
							)}>
							<span className='inline-flex items-center gap-1.5'>
								{col.header}
								{col.sortable && <Icon size={12} className={cn('shrink-0', isActive ? 'text-[#092E44]' : 'text-[#A1A1AA]')} />}
							</span>
						</th>
					);
				})}
			</tr>
		</thead>
	);

	const renderCell = (row: T, col: Column<T>) => (
		<td key={col.key} className={cn('px-4 py-3 text-sm text-[#18181B]', alignClass(col.align))}>
			{col.render ? col.render(row) : col.accessor ? String(col.accessor(row)) : ''}
		</td>
	);

	// ---------- Loading state ----------
	if (loading) {
		return (
			<div className={cn('w-full overflow-hidden rounded-lg border border-[#E4E4E7] bg-white', className)}>
				<table className='w-full border-collapse'>
					{Header}
					<tbody>
						{Array.from({ length: skeletonRows }).map((_, i) => (
							<tr key={i} className='border-b border-[#F4F4F5] last:border-b-0'>
								{columns.map((col) => (
									<td key={col.key} className='px-4 py-3'>
										<div className='h-3 rounded bg-zinc-200 animate-pulse' style={{ width: `${40 + ((i * 7 + col.key.length) % 50)}%` }} />
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}

	// ---------- Empty state ----------
	if (sortedData.length === 0) {
		return (
			<div className={cn('w-full overflow-hidden rounded-lg border border-[#E4E4E7] bg-white', className)}>
				<table className='w-full border-collapse'>{Header}</table>
				<div className='flex flex-col items-center justify-center py-16 px-6 text-center'>
					{emptyState ?? (
						<>
							<div className='text-sm font-medium text-[#18181B]'>No data to display</div>
							<div className='text-xs text-[#71717A] mt-1'>Try adjusting your filters or check back later.</div>
						</>
					)}
				</div>
			</div>
		);
	}

	// ---------- Pagination footer ----------
	const showPagination = page !== undefined && pageSize !== undefined && totalRows !== undefined && onPageChange;
	const totalPages = showPagination ? Math.max(1, Math.ceil(totalRows! / pageSize!)) : 1;
	const Footer = showPagination ? (
		<div className='flex items-center justify-between px-4 py-3 border-t border-[#E4E4E7] bg-[#FAFAFA]'>
			<div className='text-xs text-[#71717A]'>
				Showing {(page! - 1) * pageSize! + 1}–{Math.min(page! * pageSize!, totalRows!)} of {totalRows!.toLocaleString()}
			</div>
			<div className='flex items-center gap-1'>
				<button
					onClick={() => onPageChange!(Math.max(1, page! - 1))}
					disabled={page === 1}
					className='inline-flex items-center justify-center h-7 w-7 rounded-md border border-[#E4E4E7] disabled:opacity-50 hover:bg-white'>
					<ChevronLeft size={14} />
				</button>
				<span className='text-xs text-[#18181B] px-2'>
					Page <span className='font-semibold'>{page}</span> of {totalPages}
				</span>
				<button
					onClick={() => onPageChange!(Math.min(totalPages, page! + 1))}
					disabled={page === totalPages}
					className='inline-flex items-center justify-center h-7 w-7 rounded-md border border-[#E4E4E7] disabled:opacity-50 hover:bg-white'>
					<ChevronRight size={14} />
				</button>
			</div>
		</div>
	) : null;

	// ---------- Virtualized body ----------
	if (virtualized) {
		return (
			<div className={cn('w-full overflow-hidden rounded-lg border border-[#E4E4E7] bg-white', className)}>
				<table className='w-full border-collapse'>{Header}</table>
				<VirtualBody
					data={sortedData}
					columns={columns}
					estimatedRowHeight={estimatedRowHeight}
					maxHeight={maxHeight}
					rowKey={resolveKey}
					onRowClick={onRowClick}
					renderCell={renderCell}
				/>
				{Footer}
			</div>
		);
	}

	// ---------- Standard body ----------
	return (
		<div className={cn('w-full overflow-hidden rounded-lg border border-[#E4E4E7] bg-white', className)}>
			<table className='w-full border-collapse'>
				{Header}
				<tbody>
					{sortedData.map((row, i) => (
						<motion.tr
							key={String(resolveKey(row))}
							initial={{ opacity: 0, y: 4 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: Math.min(i * 0.02, 0.3), duration: 0.2 }}
							onClick={() => onRowClick?.(row)}
							className={cn(
								'border-b border-[#F4F4F5] last:border-b-0',
								onRowClick && 'cursor-pointer hover:bg-[#FAFAFA]',
							)}>
							{columns.map((col) => renderCell(row, col))}
						</motion.tr>
					))}
				</tbody>
			</table>
			{Footer}
		</div>
	);
}

// ---------- Internal virtual body ----------
interface VirtualBodyProps<T> {
	data: T[];
	columns: Column<T>[];
	estimatedRowHeight: number;
	maxHeight: number;
	rowKey: (row: T) => string | number;
	onRowClick?: (row: T) => void;
	renderCell: (row: T, col: Column<T>) => ReactNode;
}

function VirtualBody<T>({
	data,
	columns,
	estimatedRowHeight,
	maxHeight,
	rowKey,
	onRowClick,
	renderCell,
}: VirtualBodyProps<T>) {
	const parentRef = useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: data.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => estimatedRowHeight,
		overscan: 8,
	});

	return (
		<div
			ref={parentRef}
			style={{ maxHeight, height: maxHeight, overflowY: 'auto', position: 'relative' }}
			className='[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded'>
			<div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
				{rowVirtualizer.getVirtualItems().map((virtualRow) => {
					const row = data[virtualRow.index];
					return (
						<div
							key={String(rowKey(row))}
							onClick={() => onRowClick?.(row)}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: virtualRow.size,
								transform: `translateY(${virtualRow.start}px)`,
							}}
							className={cn(
								'flex border-b border-[#F4F4F5]',
								onRowClick && 'cursor-pointer hover:bg-[#FAFAFA]',
							)}>
							<table className='w-full border-collapse'>
								<tbody>
									<tr>{columns.map((col) => renderCell(row, col))}</tr>
								</tbody>
							</table>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default DataTable;
