import { DigitalResource } from './digitalResource';
import { EntityType } from '../entityType';

export type AssignableDigitalResource = {
	type: EntityType.assignableDigitalResource;
	dateToActivate?: string;
	dateToShow?: string;
	dateToStartOn?: string;
	dateToSubmit?: string;
	maxAttempts?: number;
	maxSubmits?: number;
	maxScore?: number;
} & DigitalResource;
