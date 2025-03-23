'use client';

import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const map: Record<string, string> = {
	light: 'i-lucide:sun',
	dark: 'i-lucide:moon',
	system: 'i-lucide:monitor',
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
		<div className="w-fit flex gap-4 px-4 py-2 rounded-full text-2xl leading-0">
			{themes.map((t) => (
				<label
					key={t}
					className={clsx('rounded-full cursor-pointer', {
						'text-primary': t === theme,
					})}
				>
					<input
						type="radio"
						name="theme-radio"
						className="hidden"
						onChange={() => setTheme(t)}
						aria-label={t}
						value={t}
						checked={t === theme}
					/>
					<span className={map[t]}></span>
				</label>
			))}
		</div>
	);
};
