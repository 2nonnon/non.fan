import Link from 'next/link';
import { getAllPosts } from '@/app/posts/utils';

export default async function Page() {
	const allPostsData = getAllPosts();

	return (
		<div className="max-w-screen-md mx-auto w-full px-6">
			<h1 className="text-3xl font-extrabold h-(--length-main-cell) flex items-center">
				Posts
			</h1>
			<ol>
				{allPostsData.map(({ slug }, index) => (
					<li key={slug}>
						<Link
							className="flex items-center text-base-content h-(--length-main-cell) text-2xl font-bold"
							href={`/posts/${slug}`}
						>
							<div>
								<span>{index + 1}.</span>
								<span>{slug}</span>
							</div>
						</Link>
					</li>
				))}
			</ol>
		</div>
	);
}
