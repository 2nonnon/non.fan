'use client';

import type { ChatCompletionChunk } from 'openai/resources/index.mjs';
import type { ChatCompletionMessageParam } from 'openai/src/resources/index.js';
import { useEffect, useState } from 'react';
import * as Fsa from '@/utils/fsa';
import { fileToBase64, renderMarkdown } from './utils';
import { MessageContent } from './message-content';

export default function Page() {
	const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
	const [text, setText] = useState<string>('');
	const [imgList, setImgList] = useState<string[]>([]);

	useEffect(() => {
		renderMarkdown('');
	}, []);

	const chat = async () => {
		if (!text) {
			return;
		}

		const userMessage = {
			role: 'user',
			content: [
				{
					type: 'text',
					text: text,
				},
				...imgList.map((url) => ({
					type: 'image_url',
					image_url: {
						url,
					},
				})),
			],
		} as ChatCompletionMessageParam;

		setText('');
		setImgList([]);
		setMessages([...messages, userMessage]);

		const res = await fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({
				messages: [
					{ role: 'system', content: 'You are a helpful assistant.' },
					...messages,
					userMessage,
				],
			}),
		});

		const aiMessage = {
			role: 'assistant',
			content: '',
		} as ChatCompletionMessageParam;

		const writeableStream = new WritableStream(
			{
				start() {
					console.log('[start]');
				},
				async write(chunk) {
					console.log('[write]', chunk);
					const { promise, resolve } = Promise.withResolvers<void>();

					requestAnimationFrame(() => {
						console.log('[requestAnimationFrame]', chunk);
						aiMessage.content += chunk;

						setMessages([...messages, userMessage, aiMessage]);

						resolve();
					});

					return promise;
				},
				close() {
					console.log('[close]');
				},
				abort(reason) {
					console.log('[abort]', reason);
				},
			},
			new CountQueuingStrategy({
				highWaterMark: 60,
			}),
		);

		const transformStream = new TransformStream(
			{
				transform(chunk, controller) {
					console.log('[transform]', chunk);

					const objs = (chunk as string).slice(1, -2).split('}\n{');

					console.log('[objs]', objs);

					const content = objs
						.map((item, i) => {
							console.log(item, i);
							const obj = JSON.parse(`{${item}}`) as ChatCompletionChunk;
							return obj.choices[0].delta.content;
						})
						.join('');

					// const value = JSON.parse(chunk) as ChatCompletionChunk;

					// const content = value.choices[0].delta.content || '';

					console.log('[content]', content);

					// controller.enqueue(content)

					let i = 0;
					const length = content.length;
					const charsToShow = length > 100 ? 3 : length > 30 ? 2 : 5;

					while (i < length) {
						// 这个desiredSize来自transformStream的readableStrategy
						console.log('[desiredSize]', controller.desiredSize);

						const hasBackpressure =
							typeof controller.desiredSize !== 'number' ||
							controller.desiredSize < 0;

						const endIndex = hasBackpressure ? length : i + charsToShow;

						const str = content.slice(i, endIndex);

						controller.enqueue(str);

						i = endIndex;
					}
				},
				flush(controller) {
					console.log('[flush]');
					// 终止转换，转换结束
					controller.terminate();
				},
			},
			new CountQueuingStrategy({
				highWaterMark: 60,
			}),
			new CountQueuingStrategy({
				highWaterMark: 60,
			}),
		);

		res.body
			?.pipeThrough(new TextDecoderStream('utf-8'))
			.pipeThrough(transformStream)
			.pipeTo(writeableStream);
	};

	const upload = async () => {
		const fileHandle = await Fsa.file();
		const file = await fileHandle.getFile();
		const base64 = await fileToBase64(file);
		setImgList([...imgList, base64]);
	};

	return (
		<div className="w-[calc(100%+3rem)] -mx-6 h-full relative">
			<div className="absolute inset-0 flex flex-col gap-6 max-w-3xl mx-auto overflow-hidden">
				<div className="flex-1 overflow-y-auto overflow-x-hidden px-6">
					{messages.length > 0 ? (
						<div className="flex flex-col gap-4">
							{messages.map((message, i) => {
								if (message.role === 'user') {
									return (
										<MessageContent
											key={`${i}-${message.role}`}
											role={message.role}
											content={message.content}
										/>
									);
								}

								if (message.role === 'assistant') {
									return (
										<div key={`${i}-${message.role}`}>
											<MessageContent
												role={message.role}
												content={message.content}
											/>
										</div>
									);
								}

								return null;
							})}
						</div>
					) : (
						<div className="h-full flex justify-center items-center opacity-60">
							提示：不会保存历史会话
						</div>
					)}
				</div>

				<div className="px-6">
					<div className="rounded-xl overflow-hidden p-3 flex flex-col gap-2 bg-base-100">
						{imgList.length > 0 && (
							<div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
								{imgList.map((img) => (
									<div key={img} className="aspect-square relative">
										<button
											className="absolute -top-2 -right-2 z-10 bg-base-200 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer"
											type="button"
											onClick={() =>
												setImgList(imgList.filter((i) => i !== img))
											}
										>
											<i className="i-lucide:x"></i>
										</button>
										<img
											className="w-full h-full object-cover rounded-md"
											src={img}
											alt=""
										/>
									</div>
								))}
							</div>
						)}

						<label className="flex flex-col gap-2">
							<textarea
								className="textarea textarea-ghost !bg-transparent !outline-none w-full p-0 resize-none"
								placeholder="请输入内容..."
								value={text}
								onChange={(e) => setText(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' && !e.shiftKey) {
										e.preventDefault();
										chat();
									}
								}}
							/>

							<div className="flex justify-between items-center">
								<div></div>

								<div className="flex items-center gap-3 ml-auto">
									<button
										className="btn btn-ghost btn-square btn-sm !text-xl"
										type="button"
										onClick={upload}
										title="上传图片"
									>
										<i className="i-lucide:image"></i>
									</button>

									<button
										className="btn btn-circle btn-sm !text-xl"
										type="button"
										onClick={chat}
										title="发送"
									>
										<i className="i-lucide:arrow-up"></i>
									</button>
								</div>
							</div>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
