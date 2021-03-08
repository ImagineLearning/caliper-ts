import { TextDecoder } from 'text-encoding';

export async function parseRequestBody(request: Request | null) {
	const { body } = request ?? {};
	let text: string | undefined;

	const decoder = new TextDecoder();
	if (body instanceof Uint8Array) {
		text = decoder.decode(body);
	} else if (body) {
		text = await readStream(body.getReader());
	}

	return text ? JSON.parse(text) : text;
}

function readStream(reader?: ReadableStreamDefaultReader<Uint8Array>): Promise<string> {
	if (!reader) {
		return Promise.resolve('');
	}

	const decoder = new TextDecoder();

	const processText = async (
		streamReader: ReadableStreamDefaultReader<Uint8Array>,
		text = ''
	): Promise<string> => {
		const { done, value } = await streamReader.read();
		const updatedText = text + decoder.decode(value);
		return done ? updatedText : processText(streamReader, updatedText);
	};

	return processText(reader);
}
