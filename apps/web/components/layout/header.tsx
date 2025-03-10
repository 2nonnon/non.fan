import Link from 'next/link';
import { ThemeChanger } from '../theme-changer';

export default function Header() {
	return (
		<header className="sticky top-0 z-10 backdrop-blur">
			<div className="flex items-center justify-between gap-4 h-24 px-6 py-3 max-w-screen-xl mx-auto">
				<Link className="font-bold" href="/">
					施工中...
				</Link>

				<ThemeChanger />
			</div>
		</header>
	);
}
