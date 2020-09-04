import { DigitalResource } from './digitalResource';
import { DEFAULT_CONFIG, JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { v4 } from 'uuid';

export type AssignableDigitalResource = {
	dateToActivate?: string;
	dateToShow?: string;
	dateToStartOn?: string;
	dateToSubmit?: string;
	maxAttempts?: number;
	maxSubmits?: number;
	maxScore?: number;
} & DigitalResource;

export function createAssignableDigitalResource(
	delegate: Partial<AssignableDigitalResource>,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): AssignableDigitalResource {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': DEFAULT_CONFIG.jsonldContext[contextVersion],
		type: EntityType.assignableDigitalResource
	} as AssignableDigitalResource;
}
