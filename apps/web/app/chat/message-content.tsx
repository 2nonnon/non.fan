'use client';

import { cn } from '@/lib/utils';
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { renderMarkdown } from './utils';

const MarkdownContent = ({
	content,
	className,
}: { content: string; className?: string }) => {
	const html = renderMarkdown(content);

	return (
		<div className={cn('w-full max-w-full overflow-hidden', className)}>
			<div
				className="prose dark:prose-invert max-w-full"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
};

export const MessageContent = ({
	className,
	role = 'assistant',
	content,
}: {
	className?: string;
	role?: 'assistant' | 'user';
	content: ChatCompletionMessageParam['content'];
}) => {
	if (!content) {
		return null;
	}

	if (!Array.isArray(content)) {
		return (
			<MarkdownContent
				className={cn({
					'!w-fit bg-base-100 px-4 py-2 rounded-lg': role === 'user',
				})}
				content={content}
			/>
		);
	}

	const textContent = content.find((item) => item.type === 'text');
	const imageUrlContent = content.filter((item) => item.type === 'image_url');

	return (
		<div
			className={cn('flex flex-col gap-2', className, {
				'items-end': role === 'user',
			})}
		>
			{imageUrlContent.map((item, i) => {
				return (
					<div
						key={`${i}-${item.image_url.url}`}
						className="w-1/2 rounded-md overflow-hidden"
					>
						<img className="w-full" src={item.image_url.url} alt="" />
					</div>
				);
			})}

			{textContent && (
				<MarkdownContent
					className={cn({
						'!w-fit bg-base-100 px-4 py-2 rounded-lg': role === 'user',
					})}
					content={textContent.text}
				/>
			)}
		</div>
	);
};
