import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, LucideIcon } from 'lucide-react';
import { FC, useState } from 'react';

/**
 * Collapsible sidebar nav with icon + label items, active-route highlighting,
 * grouped sections, and a footer slot. Used as the left rail across the
 * Flexprice dashboard.
 */
export interface NavItem {
	id: string;
	label: string;
	icon: LucideIcon;
	badge?: string | number;
	disabled?: boolean;
}

export interface NavSection {
	title?: string;
	items: NavItem[];
}

interface SidebarNavProps {
	sections: NavSection[];
	activeId: string;
	onItemClick: (id: string) => void;
	logo?: string;
	collapsed?: boolean;
	onCollapseChange?: (collapsed: boolean) => void;
	footer?: React.ReactNode;
	className?: string;
}

const SidebarNav: FC<SidebarNavProps> = ({
	sections,
	activeId,
	onItemClick,
	logo = 'Flexprice',
	collapsed: controlledCollapsed,
	onCollapseChange,
	footer,
	className,
}) => {
	const [internalCollapsed, setInternalCollapsed] = useState(false);
	const collapsed = controlledCollapsed ?? internalCollapsed;
	const toggle = () => {
		const next = !collapsed;
		if (onCollapseChange) onCollapseChange(next);
		else setInternalCollapsed(next);
	};

	return (
		<motion.aside
			animate={{ width: collapsed ? 64 : 240 }}
			transition={{ duration: 0.25, ease: 'easeOut' }}
			className={cn(
				'h-screen bg-[#FAFAFA] border-r border-[#E4E4E7] flex flex-col',
				className,
			)}>
			{/* Logo + collapse */}
			<div className='flex items-center justify-between px-4 h-14 border-b border-[#E4E4E7]'>
				<AnimatePresence mode='wait'>
					{!collapsed && (
						<motion.span
							key='logo'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='font-semibold text-[#092E44] text-base whitespace-nowrap'>
							{logo}
						</motion.span>
					)}
				</AnimatePresence>
				<button
					type='button'
					onClick={toggle}
					aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
					className='inline-flex items-center justify-center h-7 w-7 rounded-md text-[#71717A] hover:bg-white hover:text-[#092E44]'>
					<motion.span animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
						<ChevronLeft size={16} />
					</motion.span>
				</button>
			</div>

			{/* Sections */}
			<nav className='flex-1 overflow-y-auto py-3'>
				{sections.map((section, si) => (
					<div key={si} className={cn('px-2', si > 0 && 'mt-4')}>
						{section.title && !collapsed && (
							<div className='px-2 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#A1A1AA]'>
								{section.title}
							</div>
						)}
						{section.items.map((item) => {
							const isActive = item.id === activeId;
							const Icon = item.icon;
							return (
								<button
									key={item.id}
									type='button'
									onClick={() => !item.disabled && onItemClick(item.id)}
									disabled={item.disabled}
									className={cn(
										'relative w-full flex items-center gap-3 px-2.5 py-2 rounded-md text-sm transition-colors',
										'disabled:opacity-50 disabled:cursor-not-allowed',
										isActive
											? 'bg-[#092E44] text-white shadow-sm'
											: 'text-[#3F3F46] hover:bg-white hover:text-[#092E44]',
									)}>
									<Icon size={16} className='shrink-0' />
									<AnimatePresence mode='wait'>
										{!collapsed && (
											<motion.span
												key='label'
												initial={{ opacity: 0, x: -4 }}
												animate={{ opacity: 1, x: 0 }}
												exit={{ opacity: 0, x: -4 }}
												className='flex-1 text-left whitespace-nowrap'>
												{item.label}
											</motion.span>
										)}
									</AnimatePresence>
									{item.badge !== undefined && !collapsed && (
										<span
											className={cn(
												'text-[10px] font-medium px-1.5 py-0.5 rounded',
												isActive ? 'bg-white/20 text-white' : 'bg-[#092E44]/10 text-[#092E44]',
											)}>
											{item.badge}
										</span>
									)}
								</button>
							);
						})}
					</div>
				))}
			</nav>

			{footer && (
				<div className='border-t border-[#E4E4E7] p-3'>
					{collapsed ? null : footer}
				</div>
			)}
		</motion.aside>
	);
};

export default SidebarNav;
