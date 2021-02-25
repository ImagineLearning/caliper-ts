import Caliper from './../Caliper';
import { IAgent } from './../Entities/Agent';
import { CredentialType } from './../Entities/CredentialType';
import { IDigitalResource } from './../Entities/DigitalResource';
import { IEntity } from './../Entities/Entity';
import { EntityType } from './../Entities/EntityType';
import { IInstructor } from './../Entities/Instructor';
import { LoginType } from './../Entities/LoginType';
import { ILtiSession } from './../Entities/LtiSession';
import { IMembership } from './../Entities/Membership';
import { IOrganization } from './../Entities/Organization';
import { IPerson } from './../Entities/Person';
import { ISession } from './../Entities/Session';
import { ISoftwareApplication } from './../Entities/SoftwareApplication';
import { IStudent } from './../Entities/Student';
import { IUser } from './../Entities/User';
import { ISystemIdentifier } from './../SystemIdentifier';
import { CaliperAction } from './CaliperAction';
import { CaliperProfile } from './CaliperProfile';
import { EventType } from './EventType';
import { ILoginEvent, ILoginEventUserSession } from './Internals/LoginEvent';

export interface ILoginFailedEvent extends ILoginEvent {
	actor: IUser | IInstructor | IStudent;
	object: ISoftwareApplication;
	session: ILoginFailedEventUserSession;
	target?: IDigitalResource;
	referrer?: IDigitalResource | ISoftwareApplication;
}

interface ILoginFailedEventParams {
	actor: IUser | IInstructor | IStudent;
	object: ISoftwareApplication;
	session: ILoginFailedEventUserSession;
	target?: IDigitalResource;
	referrer?: IDigitalResource | ISoftwareApplication;
	profile?: CaliperProfile;
	generated?: IEntity;
	group?: IOrganization;
	membership?: IMembership;
	federatedSession?: ILtiSession;
	extensions?: Record<string, any>;
}

export function LoginFailedEvent(params: ILoginFailedEventParams): ILoginFailedEvent {
	return {
		['@context']: ['http://edgenuity.com/events/login-failed/0-0-2', 'http://purl.imsglobal.org/ctx/caliper/v1p2'],
		action: CaliperAction.Declined,
		type: EventType.SessionEvent,
		id: Caliper.guid(),
		eventTime: Caliper.timestamp(),
		edApp: Caliper.edApp(),
		...params
	};
}

export interface ILoginFailedEventUserSession extends ILoginEventUserSession {
	id: string;
	loginType: LoginType;
	credentials: CredentialType[];
	scopes: string[];
	userAgent: string;
	ipAddress: string;
	localTimestamp: string;
	description: string;
	user?: IPerson | IUser | IInstructor | IStudent;
}

interface ILoginFailedEventUserSessionParams {
	id: string;
	loginType: LoginType;
	credentials: CredentialType[];
	scopes: string[];
	userAgent: string;
	ipAddress: string;
	localTimestamp: string;
	description: string;
	user?: IPerson | IUser | IInstructor | IStudent;
	startedAtTime?: string;
	endedAtTime?: string;
	duration?: string;
	name?: string;
	dateCreated?: string;
	dateModified?: string;
	otherIdentifiers?: ISystemIdentifier[];
	extensions?: Record<string, any>;
}

export function LoginFailedEvent_UserSession(params: ILoginFailedEventUserSessionParams): ILoginFailedEventUserSession {
	return {
		type: EntityType.UserSession,
		...params
	};
}
