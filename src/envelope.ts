import { DEFAULT_CONFIG } from './config/config';

export interface Envelope<T> {
	sensor?: string;
	sendTime?: string;
	dataVersion?: string;
	data?: T | T[];
}

export type EnvelopeOptions<T> = Envelope<T>;

export function createEnvelope<T>(opts: EnvelopeOptions<T>) {
	const sendTime = new Date().toUTCString();
	const { dataVersion } = DEFAULT_CONFIG;
	return { sensor: null, sendTime, dataVersion, ...opts } as Envelope<T>;
}
