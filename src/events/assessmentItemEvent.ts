import { Action } from '../actions/actions';
import { Event } from './event';
import { createEvent } from './eventFactory';
import { EventType } from './eventType';
import { JsonLdContextVersion } from '../config/config';

export type AssessmentItemEvent = {
	action: Action.Started | Action.Skipped | Action.Completed;
} & Event;

export type AssessmentItemEventParams = Omit<AssessmentItemEvent, '@context' | 'type'>;

export function createAssessmentItemEvent(
	delegate: AssessmentItemEventParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
) {
	return createEvent<AssessmentItemEvent>({ ...delegate, type: EventType.AssessmentItem }, contextVersion);
}
