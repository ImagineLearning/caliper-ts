/** This file was Autogenerated */

import Caliper from './../Caliper';
import { IAgent } from './../Entities/Agent';
import { IEntity } from './../Entities/Entity';
import { ILtiSession } from './../Entities/LtiSession';
import { IMembership } from './../Entities/Membership';
import { IOrganization } from './../Entities/Organization';
import { IPerson } from './../Entities/Person';
import { ISession } from './../Entities/Session';
import { ISoftwareApplication } from './../Entities/SoftwareApplication';
import { CaliperAction } from './CaliperAction';
import { CaliperProfile } from './CaliperProfile';
import { IEvent } from './Event';
import { EventType } from './EventType';

export interface IFeedbackEvent extends IEvent {
	actor: IPerson | ISoftwareApplication | IOrganization;
	object: IEntity;
	action: CaliperAction;
}

interface IFeedbackEventParams {
	actor: IPerson | ISoftwareApplication | IOrganization;
	object: IEntity;
	action?: CaliperAction;
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

export function FeedbackEvent(params: IFeedbackEventParams): IFeedbackEvent {
	return {
		type: EventType.FeedbackEvent,
		action: CaliperAction.None,
		['@context']: ['http://purl.imsglobal.org/ctx/caliper/v1p2'],
		id: Caliper.uuid(),
		eventTime: Caliper.timestamp(),
		edApp: Caliper.edApp(),
		...params
	};
}