import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../config/config';
import { getFormattedDateTime } from '../utils/dateUtils';
import { CaliperEvent } from './caliperEvent';

export function createEvent(delegate: CaliperEvent) {
	return {
		'@context': getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		eventTime: getFormattedDateTime(),
		...delegate
	} as CaliperEvent;
}
