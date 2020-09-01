import { CaliperEventType } from './caliperEventType';
import { Entity } from '../entities/entity';

export interface CaliperEvent {
	'@context'?: string;
	id: string;
	type: CaliperEventType;
	actor: Entity;
	action: string;
	object: {};
	eventTime?: string;
	generated?: {};
	target?: {};
	referrer?: {};
	edApp?: {};
	group?: {};
	membership?: {};
	session?: {};
	federatedSession?: {};
	extensions?: {};
}
