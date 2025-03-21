import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllMetadata, getMetadataBySlug } from '@/app/posts/utils';

export default async function Page({
	params,
}: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug;
	const { default: Content } = await import(`@/app/posts/content/${slug}.mdx`);
	const metadata = getMetadataBySlug(slug);

	return (
		<article className="mb-32 prose dark:prose-invert w-full mx-auto">
			<h1>{metadata.title}</h1>
			<Content />
		</article>
	);
}

export async function generateMetadata({
	params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const metadata = getMetadataBySlug((await params).slug);

	if (!metadata) return notFound();

	return {
		title: metadata.title,
		description: metadata.description,
	};
}

export async function generateStaticParams() {
	const allMetadata = getAllMetadata();

	return allMetadata.map((data) => ({
		slug: data.slug,
	}));
}

export const dynamicParams = false;
