import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/app/posts/utils';

export default async function Page({
	params,
}: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug;
	const { default: Content } = await import(`@/app/posts/content/${slug}.mdx`);

	return (
		<main>
			<article className="mb-32">
				<div className={'prose dark:prose-invert mx-auto'}>
					<Content />
				</div>
			</article>
		</main>
	);
}

export async function generateMetadata({
	params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const post = getPostBySlug((await params).slug);

	if (!post) return notFound();

	const title = `${post.slug} | Next.js Blog`;

	return {
		title,
	};
}

export async function generateStaticParams() {
	const posts = getAllPosts();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export const dynamicParams = false;
