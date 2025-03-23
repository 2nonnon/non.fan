import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { highlighter, highlighterOptions } from '@/lib/shiki';

const processor = unified()
	.use(remarkParse)
	.use(remarkRehype)
	.use(rehypeShikiFromHighlighter, highlighter as any, highlighterOptions)
	.use(rehypeStringify);

export function renderMarkdown(markdown: string) {
	return processor.processSync(markdown);
}

export function fileToBase64(file: File) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
		reader.readAsDataURL(file);
	});
}
