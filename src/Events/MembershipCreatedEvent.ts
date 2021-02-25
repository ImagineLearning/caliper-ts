import Caliper from './../Caliper';
import { IAgent } from './../Entities/Agent';
import { IEntity } from './../Entities/Entity';
import { IInstructor } from './../Entities/Instructor';
import { ILtiSession } from './../Entities/LtiSession';
import { IMembership } from './../Entities/Membership';
import { IOrganization } from './../Entities/Organization';
import { ISession } from './../Entities/Session';
import { ISoftwareApplication } from './../Entities/SoftwareApplication';
import { IUser } from './../Entities/User';
import { CaliperAction } from './CaliperAction';
import { CaliperProfile } from './CaliperProfile';
import { EventType } from './EventType';
import { IMembershipEvent, IMembershipEventMembership } from './Internals/MembershipEvent';

export interface IMembershipCreatedEvent extends IMembershipEvent {
	actor: ISoftwareApplication | IUser | IInstructor;
	object: IMembershipEventMembership;
}

interface IMembershipCreatedEventParams {
	actor: ISoftwareApplication | IUser | IInstructor;
	object: IMembershipEventMembership;
	profile?: CaliperProfile;
	target?: IEntity;
	generated?: IEntity;
	group?: IOrganization;
	membership?: IMembership;
	federatedSession?: ILtiSession;
	session?: ISession;
	referrer?: IEntity;
	extensions?: Record<string, any>;
}

export function MembershipCreatedEvent(params: IMembershipCreatedEventParams): IMembershipCreatedEvent {
	return {
		['@context']: ['http://edgenuity.com/events/membership-created/0-0-2', 'http://purl.imsglobal.org/ctx/caliper/v1p2'],
		action: CaliperAction.Created,
		type: EventType.MembershipEvent,
		id: Caliper.guid(),
		eventTime: Caliper.timestamp(),
		edApp: Caliper.edApp(),
		...params
	};
}
