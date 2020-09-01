import { DEFAULT_CONFIG } from './config/config';

export interface Envelope<T> {
	sensor: string | null;
	sendTime: string;
	dataVersion: string;
	data: T[];
}

export interface EnvelopeOptions<T> {
	sensor?: string | null;
	sendTime?: string;
	dataVersion?: string;
	data?: T | T[];
}

export function createEnvelope<T>(opts: EnvelopeOptions<T>) {
	const sendTime = new Date().toUTCString();
	const { dataVersion } = DEFAULT_CONFIG;
	const data = Array.isArray(opts.data) ? [...opts.data] : [opts.data];
	return { sensor: null, sendTime, dataVersion, ...opts, data } as Envelope<T>;
}
