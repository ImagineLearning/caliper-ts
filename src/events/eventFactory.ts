import { CaliperEvent } from './caliperEvent';
import { DEFAULT_CONFIG } from '../config/config';

export function createEvent(delegate: CaliperEvent) {
	return { '@context': DEFAULT_CONFIG.jsonldExternalCaliperContext, eventTime: new Date().toISOString(), ...delegate } as CaliperEvent;
}
