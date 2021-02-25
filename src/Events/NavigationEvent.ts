import Caliper from './../Caliper';
import { IAgent } from './../Entities/Agent';
import { IEntity } from './../Entities/Entity';
import { IInstructor } from './../Entities/Instructor';
import { ILtiSession } from './../Entities/LtiSession';
import { IMembership } from './../Entities/Membership';
import { IOrganization } from './../Entities/Organization';
import { IPerson } from './../Entities/Person';
import { ISession } from './../Entities/Session';
import { ISoftwareApplication } from './../Entities/SoftwareApplication';
import { IStudent } from './../Entities/Student';
import { IUser } from './../Entities/User';
import { IWebPage } from './../Entities/WebPage';
import { CaliperAction } from './CaliperAction';
import { CaliperProfile } from './CaliperProfile';
import { IEvent } from './Event';
import { EventType } from './EventType';

export interface INavigationEvent extends IEvent {
	actor: IPerson | IUser | IStudent | IInstructor | ISoftwareApplication | IOrganization;
	object: IWebPage;
	session: ISession;
	referrer: ISoftwareApplication | IWebPage;
}

interface INavigationEventParams {
	actor: IPerson | IUser | IStudent | IInstructor | ISoftwareApplication | IOrganization;
	object: IWebPage;
	session: ISession;
	referrer: ISoftwareApplication | IWebPage;
	profile?: CaliperProfile;
	target?: IEntity;
	generated?: IEntity;
	group?: IOrganization;
	membership?: IMembership;
	federatedSession?: ILtiSession;
	extensions?: Record<string, any>;
}

export function NavigationEvent(params: INavigationEventParams): INavigationEvent {
	return {
		['@context']: ['http://edgenuity.com/events/navigated/0-0-2', 'http://purl.imsglobal.org/ctx/caliper/v1p2'],
		type: EventType.NavigationEvent,
		action: CaliperAction.NavigatedTo,
		id: Caliper.guid(),
		eventTime: Caliper.timestamp(),
		edApp: Caliper.edApp(),
		...params
	};
}
