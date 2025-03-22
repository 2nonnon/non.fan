import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const processor = unified()
	.use(remarkParse)
	.use(remarkRehype)
	.use(rehypeShiki, {
		themes: {
			light: 'vitesse-light',
			dark: 'vitesse-dark',
		},
	})
	.use(rehypeStringify);

export function renderMarkdown(markdown: string) {
	return processor.process(markdown);
}

export function fileToBase64(file: File) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
		reader.readAsDataURL(file);
	});
}
