import Caliper from './../Caliper';
import { IAgent } from './../Entities/Agent';
import { IEntity } from './../Entities/Entity';
import { ILtiSession } from './../Entities/LtiSession';
import { IMembership } from './../Entities/Membership';
import { IOrganization } from './../Entities/Organization';
import { ISession } from './../Entities/Session';
import { ISoftwareApplication } from './../Entities/SoftwareApplication';
import { IStudent } from './../Entities/Student';
import { CaliperAction } from './CaliperAction';
import { CaliperProfile } from './CaliperProfile';
import { EventType } from './EventType';
import { ILessonEvent, ILessonEventLesson } from './Internals/LessonEvent';

export interface ILessonCompletedEvent extends ILessonEvent {
	actor: IStudent;
	object: ILessonEventLesson;
}

interface ILessonCompletedEventParams {
	actor: IStudent;
	object: ILessonEventLesson;
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

export function LessonCompletedEvent(params: ILessonCompletedEventParams): ILessonCompletedEvent {
	return {
		['@context']: ['http://edgenuity.com/events/lesson-completed/0-0-2', 'http://purl.imsglobal.org/ctx/caliper/v1p2'],
		action: CaliperAction.Completed,
		type: EventType.LessonEvent,
		id: Caliper.guid(),
		eventTime: Caliper.timestamp(),
		edApp: Caliper.edApp(),
		...params
	};
}
