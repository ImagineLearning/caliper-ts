import { SoftwareApplication } from '../entities/agent/softwareApplication';
import { Entity } from '../entities/entity';
import { Session } from '../entities/session/session';
import { Action } from '../actions/actions';
import { CaliperEventType } from './caliperEventType';

export interface CaliperEvent {
	'@context'?: string;
	id: string;
	type: CaliperEventType;
	actor: Entity;
	action: Action;
	object: Entity | string;
	eventTime?: string;
	generated?: {};
	target?: {};
	referrer?: {};
	edApp?: SoftwareApplication | string;
	group?: {};
	membership?: {};
	session?: Session | string;
	federatedSession?: {};
	extensions?: Record<string, string>;
}
