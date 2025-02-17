import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'app/posts/content');

export function getPostSlugs() {
	return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
	const realSlug = slug.replace(/\.mdx$/, '');
	const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data, content } = matter(fileContents);

	return { metadata: data, slug: realSlug, content };
}

export function getAllPosts() {
	const slugs = getPostSlugs();
	const posts = slugs.map((slug) => getPostBySlug(slug));

	return posts;
}
