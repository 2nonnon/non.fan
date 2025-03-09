import Link from 'next/link';
import { ThemeChanger } from '../theme-changer';

export default function Header() {
	return (
		<header className="sticky top-0 z-10">
			<div className="flex items-center justify-between gap-4 h-24 px-6 py-3 max-w-screen-xl mx-auto">
				<Link className="font-bold" href="/">
					LOGO.svg
				</Link>

				<ThemeChanger />
			</div>
		</header>
	);
}
