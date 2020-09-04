import { DigitalResource } from './digitalResource';
import { EntityType } from '../entityType';
import { JsonLdContextVersion, DEFAULT_CONFIG } from '../../config/config';
import { v4 } from 'uuid';

export type DigitalResourceCollection = {
	items?: DigitalResource[] | string[];
} & DigitalResource;

export function createDigitalResourceCollection(
	delegate: Partial<DigitalResourceCollection>,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): DigitalResourceCollection {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': DEFAULT_CONFIG.jsonldContext[contextVersion],
		type: EntityType.digitalResourceCollection
	} as DigitalResourceCollection;
}
