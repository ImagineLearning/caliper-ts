import { Action } from '../actions/actions';
import { JsonLdContextVersion } from '../config/config';
import { Event } from './event';
import { createEvent } from './eventFactory';
import { EventProfile } from './eventProfiles';
import { EventType } from './eventType';

export type AssessmentEvent = {
	action: Action.Started | Action.Paused | Action.Resumed | Action.Restarted | Action.Reset | Action.Submitted;
} & Event;

export type AssessmentEventParams = Omit<AssessmentEvent, '@context' | 'type' | 'profile'>;

export function createAssessmentEvent(delegate: AssessmentEventParams, contextVersion?: JsonLdContextVersion) {
	return createEvent<AssessmentEvent>({ ...delegate, profile: EventProfile.Assessment, type: EventType.Assessment }, contextVersion);
}
