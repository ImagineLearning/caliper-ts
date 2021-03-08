import fetchMock from 'jest-fetch-mock';
import { createEnvelope, Envelope } from '../envelope';
import { parseRequestBody } from '../test/requestUtils';
import { ClientOptions, httpClient, HttpClient } from './httpClient';

describe('HttpClient', () => {
	let client: HttpClient;

	beforeEach(() => {
		jest.resetAllMocks();
		fetchMock.resetMocks();
		fetchMock.once(JSON.stringify({ success: true }), { status: 200 });
	});

	afterEach(() => {
		jest.restoreAllMocks();
		fetchMock.mockRestore();
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
				expect(() => new HttpClient('id', {} as ClientOptions)).toThrowError(
					new Error('No options have been provided.')
				);
			});
		});

		describe('bearer(..)', () => {
			it('returns new instance of HttpClient', () => {
				const client2 = client.bearer();
				expect(client2).not.toBe(client);
			});

			it('adds "Authorization" header to request', async () => {
				const envelope = createEnvelope({ data: [{ hello: 'world' }], sensor: 'id' });
				await client.bearer('my-token').send(envelope);
				const { headers } = fetchMock.mock.calls[0][0] as Request;
				expect(headers.get('authorization')).toBe('Bearer my-token');
			});

			it('does not add "Authorization" header if no token specified', async () => {
				const envelope = createEnvelope({ data: [{ hello: 'world' }], sensor: 'id' });
				await client.bearer().send(envelope);
				const { headers } = fetchMock.mock.calls[0][0] as Request;
				expect(headers.get('authorization')).toBeNull();
			});
		});

		describe('getId()', () => {
			it('returns client ID', () => {
				expect(client.getId()).toBe('id');
			});
		});

		describe('send<T>(..)', () => {
			it('throws error if envelope is empty', async () => {
				let error: Error | undefined;
				try {
					await client.send({} as Envelope<never>);
				} catch (err) {
					error = err;
				} finally {
					expect(error).toEqual(new Error('Chosen Requestor has not been registered.'));
				}
			});

			it('makes POST request to specified URL', async () => {
				const envelope = createEnvelope({ data: [{ hello: 'world' }], sensor: 'id' });
				await client.send(envelope);
				const { method, url } = fetchMock.mock.calls[0][0] as Request;
				expect(method).toBe('POST');
				expect(url).toBe('https://example.com/');
			});

			it('posts envelope as JSON payload', async () => {
				const envelope = createEnvelope({ data: [{ hello: 'world' }], sensor: 'id' });
				await client.send(envelope);
				const request = fetchMock.mock.calls[0][0] as Request;
				const payload = await parseRequestBody(request);
				expect(payload).toEqual(envelope);
			});

			it('throws error response', async () => {
				fetchMock.mockRestore();
				fetchMock.mockRejectOnce(new Error('Oops!'));
				const envelope = createEnvelope({ data: [{ hello: 'world' }], sensor: 'id' });
				let error: Error | undefined;
				try {
					await client.send(envelope);
				} catch (err) {
					error = err;
				}
				expect(error).toEqual(new Error('Oops!'));
			});
		});
	});

	describe('httpClient(..)', () => {
		it('returns instance of HttpClient', () => {
			const client = httpClient('id', 'https://example.com');
			expect(client).toBeInstanceOf(HttpClient);
		});

		it('initializes client with bearer token if specified', async () => {
			const client = httpClient('id', 'https://example.com', 'my-token');
			const envelope = createEnvelope({ data: [{ hello: 'world' }], sensor: 'id' });
			await client.send(envelope);
			const { headers } = fetchMock.mock.calls[0][0] as Request;
			expect(headers.get('authorization')).toBe('Bearer my-token');
		});
	});
});
