import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../config/config';
import { getFormattedDateTime } from '../utils/dateUtils';
import { Event } from './Event';

export function createEvent<T extends Event>(
	delegate: Omit<T, '@context'>,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): T {
	return {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		eventTime: getFormattedDateTime(),
		...delegate
	} as T;
}
