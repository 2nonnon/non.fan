import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.GEMINI_KEY,
	baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

export async function POST(req: Request) {
	const { messages } = await req.json();

	const completion = await openai.chat.completions.create({
		model: 'gemini-2.0-flash',
		messages,
		stream: true,
	});

	return new Response(completion.toReadableStream());
}
