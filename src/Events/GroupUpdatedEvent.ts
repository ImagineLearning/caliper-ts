import Caliper from './../Caliper';
import { IAgent } from './../Entities/Agent';
import { IEntity } from './../Entities/Entity';
import { IInstructor } from './../Entities/Instructor';
import { ILtiSession } from './../Entities/LtiSession';
import { IMembership } from './../Entities/Membership';
import { IOrganization } from './../Entities/Organization';
import { ISession } from './../Entities/Session';
import { ISoftwareApplication } from './../Entities/SoftwareApplication';
import { IStudent } from './../Entities/Student';
import { IUser } from './../Entities/User';
import { CaliperAction } from './CaliperAction';
import { CaliperProfile } from './CaliperProfile';
import { EventType } from './EventType';
import { IGroupEvent, IGroupEventGroup, IGroupEventClass } from './Internals/GroupEvent';

export interface IGroupUpdatedEvent extends IGroupEvent {
	actor: ISoftwareApplication | IUser | IInstructor | IStudent;
	object: IGroupEventGroup | IGroupEventClass;
}

interface IGroupUpdatedEventParams {
	actor: ISoftwareApplication | IUser | IInstructor | IStudent;
	object: IGroupEventGroup | IGroupEventClass;
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

export function GroupUpdatedEvent(params: IGroupUpdatedEventParams): IGroupUpdatedEvent {
	return {
		['@context']: ['http://edgenuity.com/events/group-updated/0-0-2', 'http://purl.imsglobal.org/ctx/caliper/v1p2'],
		action: CaliperAction.Modified,
		type: EventType.GroupEvent,
		id: Caliper.guid(),
		eventTime: Caliper.timestamp(),
		edApp: Caliper.edApp(),
		...params
	};
}
