import ky from 'ky';
import { createEnvelope } from '../envelope';
import { ClientOptions, httpClient, HttpClient } from './httpClient';

jest.mock('ky', () => ({
	__esModule: true,
	default: { post: jest.fn() }
}));

describe('HttpClient', () => {
	let client: HttpClient;

	beforeEach(() => {
		jest.resetAllMocks();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('class', () => {
		beforeEach(() => {
			client = new HttpClient('id', { uri: 'https://example.com', headers: {} });
		});

		describe('constructor(..)', () => {
			it('creates a new instance of HttpClient', () => {
				expect(client).toBeInstanceOf(HttpClient);
			});

			it('throws error if id not specified', () => {
				expect(() => new HttpClient('', {} as ClientOptions)).toThrowError(
					new Error('Caliper Sensor Client identifier (id) has not been provided.')
				);
			});

			it('throws error if options not specified', () => {
				expect(() => new HttpClient('id', {} as ClientOptions)).toThrowError(new Error('No options have been provided.'));
			});
		});

		describe('bearer(..)', () => {
			it('returns new instance of HttpClient', () => {
				const client2 = client.bearer();
				expect(client2).not.toBe(client);
			});

			it('adds "Authorization" header to request', () => {
				(ky.post as jest.Mock).mockImplementation(() => Promise.resolve({ ok: true, json: jest.fn() }));
				const envelope = createEnvelope({ data: [{ hello: 'world' }] });
				client.bearer('my-token').send(envelope);
				const { headers } = (ky.post as jest.Mock).mock.calls[0][1];
				expect(headers['Authorization']).toBe('Bearer my-token');
			});

			it('does not add "Authorization" header if no token specified', () => {
				(ky.post as jest.Mock).mockImplementation(() => Promise.resolve({ ok: true, json: jest.fn() }));
				const envelope = createEnvelope({ data: [{ hello: 'world' }] });
				client.bearer().send(envelope);
				const { headers } = (ky.post as jest.Mock).mock.calls[0][1];
				expect(headers['Authorization']).toBeUndefined();
			});
		});

		describe('getId()', () => {
			it('returns client ID', () => {
				expect(client.getId()).toBe('id');
			});
		});

		describe('send<T>(..)', () => {
			let postMock: jest.Mock;

			beforeEach(() => {
				postMock = ky.post as jest.Mock;
				postMock.mockImplementation(() => Promise.resolve({ ok: true, json: jest.fn() }));
			});

			it('throws error if envelope is empty', async () => {
				let error: Error | undefined;
				try {
					await client.send({});
				} catch (err) {
					error = err;
				} finally {
					expect(error).toEqual(new Error('Chosen Requestor has not been registered.'));
				}
			});

			it('makes POST request to specified URL', async () => {
				const envelope = createEnvelope({ data: [{ hello: 'world' }] });
				await client.send(envelope);
				expect(postMock).toHaveBeenCalled();
				expect(postMock.mock.calls[0][0]).toBe('https://example.com');
			});

			it('posts envelope as JSON payload', async () => {
				const envelope = createEnvelope({ data: [{ hello: 'world' }] });
				await client.send(envelope);
				expect(postMock).toHaveBeenCalled();
				const { body } = postMock.mock.calls[0][1];
				expect(body).toEqual(JSON.stringify(envelope));
			});

			it('throws error response', async () => {
				const errorResponse = { ok: false } as Response;
				postMock.mockClear();
				postMock.mockImplementation(() => Promise.resolve(errorResponse));
				const envelope = createEnvelope({ data: [{ hello: 'world' }] });
				let error: Error | undefined;
				try {
					await client.send(envelope);
				} catch (err) {
					error = err;
				}
				expect(error).toBe(errorResponse);
			});

			it('parses JSON response', async () => {
				const jsonMock = jest.fn().mockImplementation(() => Promise.resolve({ hello: 'world' }));
				postMock.mockClear();
				postMock.mockImplementation(() => Promise.resolve({ ok: true, json: jsonMock }));
				const envelope = createEnvelope({ data: [{ hello: 'world' }] });
				const response = await client.send(envelope);
				expect(jsonMock).toHaveBeenCalled();
				expect(response).toEqual({ hello: 'world' });
			});
		});
	});

	describe('httpClient(..)', () => {
		let postMock: jest.Mock;

		beforeEach(() => {
			postMock = ky.post as jest.Mock;
			postMock.mockImplementation(() => Promise.resolve({ ok: true, json: jest.fn() }));
		});

		it('returns instance of HttpClient', () => {
			const client = httpClient('id', 'https://example.com');
			expect(client).toBeInstanceOf(HttpClient);
		});

		it('initializes client with bearer token if specified', async () => {
			const client = httpClient('id', 'https://example.com', 'my-token');
			const envelope = createEnvelope({ data: [{ hello: 'world' }] });
			await client.send(envelope);
			const { headers } = (ky.post as jest.Mock).mock.calls[0][1];
			expect(headers['Authorization']).toBe('Bearer my-token');
		});
	});
});
