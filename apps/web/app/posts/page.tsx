import Link from 'next/link';
import { getAllPosts } from '@/app/posts/utils';

export default async function Page() {
	const allPostsData = getAllPosts();

	return (
		<div className="max-w-screen-md mx-auto w-full px-4">
			<h1 className="text-3xl font-extrabold my-8">Posts</h1>
			<div className="flex flex-col gap-4">
				{allPostsData.map(({ slug }) => (
					<button
						key={slug}
						type="button"
						className="text-lg font-medium text-start p-0 justify-start"
					>
						<Link href={`/posts/${slug}`}>{slug}</Link>
					</button>
				))}
			</div>
		</div>
	);
}
