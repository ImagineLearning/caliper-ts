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
import { IIlpEvent, IIlpEventIndividualizedLearningPath } from './Internals/IlpEvent';

export interface IIlpIdentifiedEvent extends IIlpEvent {
	actor: IAgent | ISoftwareApplication | IUser | IInstructor | IStudent;
	object: IIlpEventIndividualizedLearningPath;
}

interface IIlpIdentifiedEventParams {
	actor: IAgent | ISoftwareApplication | IUser | IInstructor | IStudent;
	object: IIlpEventIndividualizedLearningPath;
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

export function IlpIdentifiedEvent(params: IIlpIdentifiedEventParams): IIlpIdentifiedEvent {
	return {
		['@context']: ['http://edgenuity.com/events/ilp-identified/0-0-2', 'http://purl.imsglobal.org/ctx/caliper/v1p2'],
		action: CaliperAction.Identified,
		type: EventType.IlpEvent,
		id: Caliper.guid(),
		eventTime: Caliper.timestamp(),
		edApp: Caliper.edApp(),
		...params
	};
}
