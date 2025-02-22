import Link from 'next/link';
import Image from 'next/image';
import { ThemeChanger } from '../theme-changer';
import { NavItem } from '../nav-item';

export default function Header() {
	return (
		<header className="sticky top-0 z-10 h-[calc(var(--length-main-cell)+1px)] bg-base-100/90 backdrop-blur bg-cell">
			<div className="flex items-center justify-between gap-4 h-full px-6 py-3 max-w-screen-xl mx-auto">
				<Link className='font-bold' href="/">
					LOGO.svg
				</Link>

				<nav className="flex items-center gap-2">
					<Link className="btn btn-soft" href="/posts">
						<NavItem label="文章" icon="i-lucide:book-text" />
					</Link>

					<ThemeChanger />

					<Link
						className="btn btn-soft"
						href="https://github.com/2nonnon/non.fan"
					>
						<NavItem label="Github" icon="i-lucide:github" />
					</Link>
				</nav>
			</div>
		</header>
	);
}
