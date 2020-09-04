import { DigitalResource } from './digitalResource';
import { DEFAULT_CONFIG } from '../../config/config';
import { EntityType } from '../entityType';

export type AssignableDigitalResource = {
	dateToActivate?: string;
	dateToShow?: string;
	dateToStartOn?: string;
	dateToSubmit?: string;
	maxAttempts?: number;
	maxSubmits?: number;
	maxScore?: number;
} & DigitalResource;

export function createAssignableDigitalResource(delegate: AssignableDigitalResource): AssignableDigitalResource {
	return {
		...delegate,
		'@context': DEFAULT_CONFIG.jsonldContext.v1p1,
		type: EntityType.assignableDigitalResource
	} as AssignableDigitalResource;
}
