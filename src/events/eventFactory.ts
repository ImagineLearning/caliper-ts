import { compareJsonLdContextVersions, DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../config/config';
import { getFormattedDateTime } from '../utils/dateUtils';
import { Event } from './event';

export function createEvent<T extends Event>(delegate: Omit<T, '@context'>, contextVersion?: JsonLdContextVersion): T {
	const event = {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		eventTime: getFormattedDateTime(),
		...delegate
	} as T;
	if (compareJsonLdContextVersions(contextVersion || DEFAULT_CONFIG.dataVersion, JsonLdContextVersion.v1p2)) {
		delete event.profile;
	}
	return event;
}
