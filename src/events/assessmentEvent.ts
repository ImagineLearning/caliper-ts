import { Action } from '../actions/actions';
import { Event } from './event';
import { createEvent } from './eventFactory';
import { EventType } from './eventType';
import { JsonLdContextVersion } from '../config/config';

export type AssessmentEvent = {
	action: Action.Started | Action.Paused | Action.Resumed | Action.Restarted | Action.Reset | Action.Submitted;
} & Event;

export type AssessmentEventParams = Omit<AssessmentEvent, '@context' | 'type'>;

export function createAssessmentEvent(delegate: AssessmentEventParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1) {
	return createEvent<AssessmentEvent>({ ...delegate, type: EventType.Assessment }, contextVersion);
}
