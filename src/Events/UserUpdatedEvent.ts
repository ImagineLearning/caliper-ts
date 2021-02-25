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
import { IUserEvent, IUserEventUser, IUserEventInstructor, IUserEventStudent } from './Internals/UserEvent';

export interface IUserUpdatedEvent extends IUserEvent {
	actor: ISoftwareApplication | IUser | IInstructor;
	object: IUserEventUser | IUserEventInstructor | IUserEventStudent;
}

interface IUserUpdatedEventParams {
	actor: ISoftwareApplication | IUser | IInstructor;
	object: IUserEventUser | IUserEventInstructor | IUserEventStudent;
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

export function UserUpdatedEvent(params: IUserUpdatedEventParams): IUserUpdatedEvent {
	return {
		['@context']: ['http://edgenuity.com/events/user-updated/0-0-2', 'http://purl.imsglobal.org/ctx/caliper/v1p2'],
		action: CaliperAction.Modified,
		type: EventType.UserEvent,
		id: Caliper.guid(),
		eventTime: Caliper.timestamp(),
		edApp: Caliper.edApp(),
		...params
	};
}
