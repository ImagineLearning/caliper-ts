import ky from 'ky';
import { Envelope } from '../envelope';
import { Client } from './client';

export interface ClientOptions {
	uri: string;
	headers: Record<string, string>;
}

export class HttpClient implements Client {
	constructor(private id: string, private options: ClientOptions) {
		if (!id) {
			throw new Error('Caliper Sensor Client identifier (id) has not been provided.');
		}
		if (!Object.getOwnPropertyNames(options).length) {
			throw new Error('No options have been provided.');
		}
	}

	bearer(token?: string) {
		const options = { ...this.options };
		if (token) {
			options.headers = {
				...options.headers,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				Authorization: `Bearer ${token}`,
			};
		}
		return new HttpClient(this.id, options);
	}

	getId() {
		return this.id;
	}

	send<TEnvelope, TResponse>(envelope: Envelope<TEnvelope>) {
		if (Object.keys(envelope).length === 0) {
			throw new Error('Chosen Requestor has not been registered.');
		}

		return ky
			.post(this.options.uri, {
				json: envelope,
				headers: this.options.headers,
			})
			.json<TResponse>();
	}
}

export function httpClient(id: string, uri: string, token?: string) {
	const options = { uri, headers: {} } as ClientOptions;
	return new HttpClient(id, options).bearer(token);
}
