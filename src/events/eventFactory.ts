import { DEFAULT_CONFIG } from '../config/config';
import { getFormattedDateTime } from '../utils/dateUtils';
import { CaliperEvent } from './caliperEvent';

export function createEvent(delegate: CaliperEvent) {
	return { '@context': DEFAULT_CONFIG.jsonldExternalCaliperContext, eventTime: getFormattedDateTime(), ...delegate } as CaliperEvent;
}
