import { DigitalResource } from './digitalResource';

export interface AssignableDigitalResource extends DigitalResource {
	dateToActivate?: string;
	dateToShow?: string;
	dateToStartOn?: string;
	dateToSubmit?: string;
	maxAttempts?: number;
	maxSubmits?: number;
	maxScore?: number;
}
