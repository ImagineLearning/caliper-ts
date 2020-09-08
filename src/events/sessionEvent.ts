import { Action } from '../actions/actions';
import { CaliperEvent } from './caliperEvent';
import { createEvent } from './eventFactory';
import { CaliperEventType } from './caliperEventType';
import { JsonLdContextVersion } from '../config/config';

export type SessionEvent = {
	action: Action.LoggedIn | Action.LoggedOut | Action.TimedOut;
} & CaliperEvent;

export type SessionEventParams = Omit<SessionEvent, '@context' | 'type'>;

export function createSessionEvent(delegate: SessionEventParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1) {
	return createEvent<SessionEvent>({ ...delegate, type: CaliperEventType.Session }, contextVersion);
}
