import { Action } from '../actions/actions';
import { JsonLdContextVersion } from '../config/config';
import { Event } from './event';
import { createEvent } from './eventFactory';
import { EventType } from './eventType';

export type SessionEvent = {
	action: Action.LoggedIn | Action.LoggedOut | Action.TimedOut;
} & Event;

export type SessionEventParams = Omit<SessionEvent, '@context' | 'type'>;

export function createSessionEvent(delegate: SessionEventParams, contextVersion?: JsonLdContextVersion) {
	return createEvent<SessionEvent>({ ...delegate, type: EventType.Session }, contextVersion);
}
