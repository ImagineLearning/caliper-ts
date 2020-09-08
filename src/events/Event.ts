import { SoftwareApplication } from '../entities/agent/softwareApplication';
import { Entity } from '../entities/entity';
import { Session } from '../entities/session/session';
import { Action } from '../actions/actions';
import { EventType } from './eventType';

export interface Event {
	'@context'?: string;
	id: string;
	type: EventType;
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
