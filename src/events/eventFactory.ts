import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../config/config';
import { getFormattedDateTime } from '../utils/dateUtils';
import { CaliperEvent } from './caliperEvent';

export function createEvent<T extends CaliperEvent>(
	delegate: Omit<T, '@context'>,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): T {
	return {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		eventTime: getFormattedDateTime(),
		...delegate
	} as T;
}
