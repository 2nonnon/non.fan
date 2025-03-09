import Link from 'next/link';

export default function Footer() {
	return (
		<footer>
			<div className="flex items-center justify-center px-6 py-4 max-w-screen-xl mx-auto">
				<nav className="flex items-center gap-4">
					<Link
						className="underline underline-offset-2"
						href="/posts"
					>
						Posts
						<span className="i-lucide:move-up-right"></span>
					</Link>

					<Link
						className="underline underline-offset-2"
						href="https://github.com/2nonnon/non.fan"
						target="_blank"
					>
						Github
						<span className="i-lucide:external-link"></span>
					</Link>
				</nav>
			</div>
		</footer>
	);
}
