import { DEFAULT_CONFIG, getJsonLdContext } from './config/config';
import { getFormattedDateTime } from './utils/dateUtils';

export type Envelope<T> = {
	sensor: string;
	sendTime: string;
	dataVersion: string;
	data: T[];
};

export type EnvelopeOptions<T> = Partial<Omit<Envelope<T>, 'data' | 'sensor'>> & {
	sensor: string;
	data?: T | T[];
};

export function createEnvelope<T>(opts: EnvelopeOptions<T>) {
	const sendTime = getFormattedDateTime();
	const dataVersion = getJsonLdContext(DEFAULT_CONFIG, DEFAULT_CONFIG.dataVersion);
	const data = Array.isArray(opts.data) ? [...opts.data] : [opts.data];
	return { sendTime, dataVersion, ...opts, data } as Envelope<T>;
}
