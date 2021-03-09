import { Caliper, CaliperSettings, IEvent } from '@imaginelearning/caliper-ts-models';
import { Client } from './clients/client';
import { DEFAULT_CONFIG, getJsonLdContext } from './config/config';
import { createEnvelope, Envelope, EnvelopeOptions } from './envelope';
import { validate } from './validate';

export class Sensor {
	constructor(
		private id: string,
		private settings = Caliper.settings,
		private clients: Record<string, Client> = {}
	) {
		if (!id) {
			throw new Error('Caliper Sensor identifier (id) has not been provided.');
		}
	}

	createEnvelope<T extends IEvent>(options: Partial<EnvelopeOptions<T>>) {
		if (options.data === null || options.data === undefined) {
			throw new Error('Caliper Sensor Envelope data has not been provided.');
		}

		const sensor = options.sensor ?? this.id;
		const sendTime = options.sendTime ?? Caliper.timestamp();
		const dataVersion =
			options.dataVersion ?? getJsonLdContext(DEFAULT_CONFIG, DEFAULT_CONFIG.dataVersion);
		return createEnvelope<T>({ sensor, sendTime, dataVersion, data: options.data });
	}

	createEvent<TEvent extends IEvent, TParams>(
		eventFactory: (params: TParams, settings?: CaliperSettings) => TEvent,
		params: TParams
	) {
		return eventFactory(params, this.settings);
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

	getSettings() {
		return this.settings;
	}

	registerClient(client: Client) {
		this.clients[client.getId()] = client;
	}

	sendToClient<TEnvelope extends IEvent, TResponse>(
		client: Client | string,
		envelope: Envelope<TEnvelope>
	) {
		const httpClient = this.clients[typeof client === 'string' ? client : client.getId()];
		if (!httpClient) {
			throw new Error('Chosen Client has not been registered.');
		}

		if (this.settings.isValidationEnabled) {
			envelope.data.forEach((event) => {
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

		if (this.settings.isValidationEnabled) {
			envelope.data.forEach((event) => {
				validate(event);
			});
		}

		return Promise.all(clients.map((client) => client.send<TEnvelope, TResponse>(envelope)));
	}

	unregisterClient(id: string) {
		delete this.clients[id];
	}
}
