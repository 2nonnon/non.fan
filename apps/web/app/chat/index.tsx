'use client';

import type { ChatCompletionChunk } from 'openai/resources/index.mjs';

export default function Page() {
	const chat = async () => {
		const res = await fetch('https://dev.non.fan/api/chat', {
			method: 'POST',
			body: JSON.stringify({
				messages: [
					{ role: 'system', content: 'You are a helpful assistant.' },
					{ role: 'user', content: 'Hello.' },
				],
			}),
		});

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

					const value = JSON.parse(chunk) as ChatCompletionChunk;

					const content = value.choices[0].delta.content || '';

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

	return (
		<div className="w-full max-w-screen-lg mx-auto">
			<button type="button" className="btn" onClick={chat}>
				Chat
			</button>
		</div>
	);
}
