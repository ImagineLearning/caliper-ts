import { v4 } from 'uuid';
import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { DigitalResource } from './digitalResource';

export type AssignableDigitalResource = {
	dateToActivate?: string;
	dateToShow?: string;
	dateToStartOn?: string;
	dateToSubmit?: string;
	maxAttempts?: number;
	maxSubmits?: number;
	maxScore?: number;
} & DigitalResource;

export type AssignableDigitalResourceParams = Omit<Partial<AssignableDigitalResource>, '@context' | 'type'>;

export function createAssignableDigitalResource(
	delegate: AssignableDigitalResourceParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): AssignableDigitalResource {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.assignableDigitalResource
	} as AssignableDigitalResource;
}
