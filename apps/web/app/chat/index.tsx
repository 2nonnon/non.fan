'use client';

export default function Page() {
	const chat = () => {
		fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({
				messages: [
					{ role: 'system', content: 'You are a helpful assistant.' },
					{ role: 'user', content: 'Hello.' },
				],
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
	};

	return (
		<div className="w-full max-w-screen-lg mx-auto">
			<button type="button" className="btn" onClick={chat}>
				Chat
			</button>
		</div>
	);
}
