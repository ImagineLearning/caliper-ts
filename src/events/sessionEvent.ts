import { Action } from '../actions/actions';
import { Event } from './event';
import { createEvent } from './eventFactory';
import { EventType } from './eventType';
import { JsonLdContextVersion } from '../config/config';

export type SessionEvent = {
	action: Action.LoggedIn | Action.LoggedOut | Action.TimedOut;
} & Event;

export type SessionEventParams = Omit<SessionEvent, '@context' | 'type'>;

export function createSessionEvent(delegate: SessionEventParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1) {
	return createEvent<SessionEvent>({ ...delegate, type: EventType.Session }, contextVersion);
}
