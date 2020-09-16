import { Action } from '../actions/actions';
import { JsonLdContextVersion } from '../config/config';
import { Event } from './event';
import { createEvent } from './eventFactory';
import { EventType } from './eventType';

export type AssessmentItemEvent = {
	action: Action.Started | Action.Skipped | Action.Completed;
} & Event;

export type AssessmentItemEventParams = Omit<AssessmentItemEvent, '@context' | 'type'>;

export function createAssessmentItemEvent(delegate: AssessmentItemEventParams, contextVersion?: JsonLdContextVersion) {
	return createEvent<AssessmentItemEvent>({ ...delegate, type: EventType.AssessmentItem }, contextVersion);
}
