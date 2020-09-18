import { Action } from '../actions/actions';
import { JsonLdContextVersion } from '../config/config';
import { Event } from './event';
import { createEvent } from './eventFactory';
import { EventProfile } from './eventProfiles';
import { EventType } from './eventType';

export type AssessmentItemEvent = {
	action: Action.Started | Action.Skipped | Action.Completed;
} & Event;

export type AssessmentItemEventParams = Omit<AssessmentItemEvent, '@context' | 'type' | 'profile'>;

export function createAssessmentItemEvent(delegate: AssessmentItemEventParams, contextVersion?: JsonLdContextVersion) {
	return createEvent<AssessmentItemEvent>(
		{ ...delegate, profile: EventProfile.Assessment, type: EventType.AssessmentItem },
		contextVersion
	);
}
