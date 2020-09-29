import { Client } from './clients/client';
import { DEFAULT_CONFIG } from './config/config';
import { createEnvelope, Envelope, EnvelopeOptions } from './envelope';
import { getFormattedDateTime } from './utils/dateUtils';

export class Sensor {
	private clients: Record<string, Client>;

	constructor(private id: string, clients?: Record<string, Client>) {
		if (!id) {
			throw new Error('Caliper Sensor identifier (id) has not been provided.');
		}

		this.clients = clients || {};
	}

	createEnvelope<T>(opts: Partial<EnvelopeOptions<T>>) {
		if (opts.data === null || opts.data === undefined) {
			throw new Error('Caliper Sensor Envelope data has not been provided.');
		}
		const sensor = opts.sensor || this.id;
		const sendTime = opts.sendTime || getFormattedDateTime();
		const dataVersion = opts.dataVersion || DEFAULT_CONFIG.dataVersion;
		return createEnvelope<T>({ sensor, sendTime, dataVersion, data: opts.data });
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

	sendToClient<TEnvelope, TResponse>(client: Client | string, envelope: Envelope<TEnvelope>) {
		const httpClient = this.clients[typeof client === 'string' ? client : client.getId()];
		if (!httpClient) {
			throw new Error('Chosen Client has not been registered.');
		}
		return httpClient.send<TEnvelope, TResponse>(envelope);
	}

	sendToClients<TEnvelope, TResponse>(envelope: Envelope<TEnvelope>) {
		const clients = this.getClients();
		if (!clients.length) {
			throw new Error('No Clients have been registered.');
		}
		return Promise.all(clients.map(client => client.send<TEnvelope, TResponse>(envelope)));
	}

	unregisterClient(id: string) {
		delete this.clients[id];
	}
}
