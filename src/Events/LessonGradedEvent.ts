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
import { ILessonEvent, ILessonEventLesson, ILessonEventMasteryScore } from './Internals/LessonEvent';

export interface ILessonGradedEvent extends ILessonEvent {
	actor: ISoftwareApplication | IUser | IInstructor;
	object: ILessonEventLesson;
	generated: ILessonEventMasteryScore;
}

interface ILessonGradedEventParams {
	actor: ISoftwareApplication | IUser | IInstructor;
	object: ILessonEventLesson;
	generated: ILessonEventMasteryScore;
	profile?: CaliperProfile;
	target?: IEntity;
	group?: IOrganization;
	membership?: IMembership;
	federatedSession?: ILtiSession;
	session?: ISession;
	referrer?: IEntity;
	extensions?: Record<string, any>;
}

export function LessonGradedEvent(params: ILessonGradedEventParams): ILessonGradedEvent {
	return {
		['@context']: ['http://edgenuity.com/events/lesson-graded/0-0-2', 'http://purl.imsglobal.org/ctx/caliper/v1p2'],
		action: CaliperAction.Graded,
		type: EventType.LessonEvent,
		id: Caliper.guid(),
		eventTime: Caliper.timestamp(),
		edApp: Caliper.edApp(),
		...params
	};
}
