import { SoftwareApplication } from '../entities/agent/softwareApplication';
import { Entity } from '../entities/entity';
import { Session } from '../entities/session/session';
import { Action } from '../actions/actions';
import { EventType } from './eventType';
import { Attempt } from '../entities/resource/attempt';
import { Organization } from '../entities/agent/organization';
import { Membership } from '../entities/agent/membership';
import { LtiSession } from '../entities/session/ltiSession';

export interface Event {
	'@context'?: string;
	id: string;
	type: EventType;
	actor: Entity;
	action: Action;
	object: Entity | string;
	eventTime?: string;
	generated?: Attempt | string;
	target?: Entity | string;
	referrer?: Entity | string;
	edApp?: SoftwareApplication | string;
	group?: Organization | string;
	membership?: Membership | string;
	session?: Session | string;
	federatedSession?: LtiSession | string;
	extensions?: Record<string, string>;
}
