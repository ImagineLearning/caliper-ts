import { Action } from '../actions/actions';
import { Event } from './event';
import { createEvent } from './eventFactory';
import { EventType } from './eventType';
import { JsonLdContextVersion } from '../config/config';

export type AssessmentEvent = {
	action: Action.Started | Action.Paused | Action.Resumed | Action.Restarted | Action.Reset | Action.Submitted;
} & Event;

export type SessionEventParams = Omit<AssessmentEvent, '@context' | 'type'>;

export function createSessionEvent(delegate: SessionEventParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1) {
	return createEvent<AssessmentEvent>({ ...delegate, type: EventType.Session }, contextVersion);
}
