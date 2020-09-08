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

export type AssignableDigitalResourceParams = Omit<AssignableDigitalResource, '@context' | 'type'>;

export function createAssignableDigitalResource(
	delegate: AssignableDigitalResourceParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): AssignableDigitalResource {
	return {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.assignableDigitalResource,
		...delegate
	} as AssignableDigitalResource;
}
