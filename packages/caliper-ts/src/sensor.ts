import { Client } from './clients/client';
import { DEFAULT_CONFIG, getJsonLdContext } from './config/config';
import { createEnvelope, Envelope, EnvelopeOptions } from './envelope';

import Caliper from './Caliper';
import { validate } from './validate';
import { IEvent } from './';

export class Sensor {
	private clients: Record<string, Client>;

	constructor(private id: string, clients?: Record<string, Client>) {
		if (!id) {
			throw new Error('Caliper Sensor identifier (id) has not been provided.');
		}

		this.clients = clients || {};
	}

	createEnvelope<T extends IEvent>(options: Partial<EnvelopeOptions<T>>) {
		if (options.data === null || options.data === undefined) {
			throw new Error('Caliper Sensor Envelope data has not been provided.');
		}

		const sensor = options.sensor || this.id;
		const sendTime = options.sendTime || Caliper.timestamp();
		const dataVersion = options.dataVersion || getJsonLdContext(DEFAULT_CONFIG, DEFAULT_CONFIG.dataVersion);
		return createEnvelope<T>({ sensor, sendTime, dataVersion, data: options.data });
	}

	getClient(id: string) {
		return this.clients[id];
	}

	getClients() {
		return Object.values(this.clients);
	}

	getId() {
		return this.id;
	}

	registerClient(client: Client) {
		this.clients[client.getId()] = client;
	}

	sendToClient<TEnvelope extends IEvent, TResponse>(client: Client | string, envelope: Envelope<TEnvelope>) {
		const httpClient = this.clients[typeof client === 'string' ? client : client.getId()];
		if (!httpClient) {
			throw new Error('Chosen Client has not been registered.');
		}

		if (Caliper.settings.isValidationEnabled) {
			envelope.data.forEach(event => {
				validate(event);
			});
		}

		return httpClient.send<TEnvelope, TResponse>(envelope);
	}

	sendToClients<TEnvelope extends IEvent, TResponse>(envelope: Envelope<TEnvelope>) {
		const clients = this.getClients();
		if (!clients.length) {
			throw new Error('No Clients have been registered.');
		}

		if (Caliper.settings.isValidationEnabled) {
			envelope.data.forEach(event => {
				validate(event);
			});
		}

		return Promise.all(clients.map(client => client.send<TEnvelope, TResponse>(envelope)));
	}

	unregisterClient(id: string) {
		delete this.clients[id];
	}
}
