import { Action } from '../actions/actions';
import { Membership } from '../entities/agent/membership';
import { Organization } from '../entities/agent/organization';
import { SoftwareApplication } from '../entities/agent/softwareApplication';
import { Entity } from '../entities/entity';
import { Attempt } from '../entities/resource/attempt';
import { LtiSession } from '../entities/session/ltiSession';
import { Session } from '../entities/session/session';
import { EventProfile } from './eventProfiles';
import { EventType } from './eventType';

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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	extensions?: Record<string, any>;
	profile?: EventProfile;
}
