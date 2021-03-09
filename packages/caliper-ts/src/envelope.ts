import { Caliper } from '@imaginelearning/caliper-ts-objects';
import { DEFAULT_CONFIG, getJsonLdContext } from './config/config';

export interface Envelope<T> {
	sensor: string;
	sendTime: string;
	dataVersion: string;
	data: T[];
}

export type EnvelopeOptions<T> = Partial<Omit<Envelope<T>, 'data' | 'sensor'>> & {
	sensor: string;
	data?: T[];
};

export function createEnvelope<T>(options: EnvelopeOptions<T>) {
	const sendTime = Caliper.timestamp();
	const dataVersion = getJsonLdContext(DEFAULT_CONFIG, DEFAULT_CONFIG.dataVersion);
	const data = Array.isArray(options.data) ? [...options.data] : [options.data];
	return { sendTime, dataVersion, ...options, data } as Envelope<T>;
}
