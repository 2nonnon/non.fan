'use client';

import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { NavItem } from './nav-item';
import { useEffect, useState } from 'react';

const map: Record<string, { label: string; icon: string }> = {
	light: {
		label: '日间',
		icon: 'i-lucide:sun',
	},
	dark: {
		label: '夜间',
		icon: 'i-lucide:moon',
	},
	system: {
		label: '系统',
		icon: 'i-lucide:monitor',
	},
};

type Theme = 'light' | 'dark' | 'system';

const ThemeItem = ({ theme }: { theme: Theme }) => {
	return (
		<div className="flex items-center gap-2 whitespace-nowrap">
			<span className={map[theme].icon} />
			<span>{map[theme].label}</span>
		</div>
	);
};

export const ThemeChanger = () => {
	const { theme, setTheme, themes } = useTheme();

	const [mounted, setMounted] = useState(false);

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted || !theme) {
		return null;
	}

	return (
		<div className="dropdown dropdown-end">
			<div tabIndex={0} role="button" className="btn btn-soft">
				<NavItem label={map[theme].label} icon={map[theme].icon} />
			</div>
			<ul
				tabIndex={0}
				className="dropdown-content menu bg-base-300 rounded-box z-1 p-2 shadow-2xl mt-1"
			>
				{themes.map((t) => (
					<li key={t}>
						<label className={clsx({ 'menu-active': t === theme })}>
							<input
								type="radio"
								name="theme-dropdown"
								className="hidden"
								onClick={() => setTheme(t)}
								aria-label={t}
								value={t}
								checked={t === theme}
							/>
							<ThemeItem theme={t as Theme} />
						</label>
					</li>
				))}
			</ul>
		</div>
	);
};
