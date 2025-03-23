'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Footer() {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<footer>
			<div className="flex items-center px-6 py-4 max-w-screen-xl mx-auto">
				<nav className="w-full flex justify-between items-center gap-4">
					<div className="leading-0">
						{pathname !== '/' && (
							<button type="button" onClick={() => router.back()}>
								<i className="i-lucide:arrow-left text-2xl"></i>
							</button>
						)}
					</div>

					<div className="flex items-center gap-4">
						<Link className="underline underline-offset-2" href="/posts">
							Posts
						</Link>

						<Link
							className="underline underline-offset-2"
							href="https://github.com/2nonnon/non.fan"
							target="_blank"
						>
							Github
						</Link>
					</div>
				</nav>
			</div>
		</footer>
	);
}
