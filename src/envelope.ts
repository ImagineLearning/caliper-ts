import { DEFAULT_CONFIG } from './config/config';
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
	const { dataVersion } = DEFAULT_CONFIG;
	const data = Array.isArray(opts.data) ? [...opts.data] : [opts.data];
	return { sendTime, dataVersion, ...opts, data } as Envelope<T>;
}
