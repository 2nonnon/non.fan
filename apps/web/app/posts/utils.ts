import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'app/posts/content');

type Metadata = {
	slug: string;
	title: string;
	description: string;
};

export function getAllFiles() {
	return fs.readdirSync(postsDirectory);
}

export function getMetadataBySlug(slug: string) {
	const fullPath = path.join(postsDirectory, `${slug}.yaml`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data } = matter(fileContents);

	return { ...data, slug } as Metadata;
}

export function getAllMetadata() {
	const filenames = getAllFiles();
	const metaFiles = filenames.filter((filename) => filename.endsWith('.yaml'));
	const metadata = metaFiles.map((filename) =>
		getMetadataBySlug(filename.replace(/\.yaml$/, '')),
	);

	return metadata;
}
