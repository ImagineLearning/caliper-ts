import { HttpClient } from './clients/httpClient';
import { DEFAULT_CONFIG } from './config/config';
import { createEnvelope, Envelope, EnvelopeOptions } from './envelope';

export interface SensorOptions {
	id: string;
	clients?: Record<string, HttpClient>;
}

export class Sensor {
	private clients: Record<string, HttpClient>;

	constructor(private id: string, clients?: Record<string, HttpClient>) {
		if (!id) {
			throw new Error('Caliper Sensor identifier (id) has not been provided.');
		}

		this.clients = clients || {};
	}

	createEnvelope<T>(opts: EnvelopeOptions<T>) {
		if (opts.data === null || opts.data === undefined) {
			throw new Error('Caliper Sensor Envelope data has not been provided.');
		}
		const sensor = opts.sensor || this.id;
		const sendTime = opts.sendTime || new Date(Date.now()).toISOString();
		const dataVersion = opts.dataVersion || DEFAULT_CONFIG.dataVersion;
		const data = Array.isArray(opts.data) ? [...opts.data] : [opts.data];
		return createEnvelope<T>({ sensor, sendTime, dataVersion, data });
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

	registerClient(client: HttpClient) {
		this.clients[client.getId()] = client;
	}

	sendToClient<T>(client: HttpClient | string, envelope: Envelope<T>) {
		const httpClient = this.clients[typeof client === 'string' ? client : client.getId()];
		if (!httpClient) {
			throw new Error('Chosen Client has not been registered.');
		}
		return httpClient.send<T>(envelope);
	}

	sendToClients<T>(envelope: Envelope<T>) {
		const clients = this.getClients();
		if (!clients.length) {
			throw new Error('No Clients have been registered.');
		}
		return Promise.all(clients.map(client => client.send<T>(envelope)));
	}

	unregisterClient(id: string) {
		delete this.clients[id];
	}
}
