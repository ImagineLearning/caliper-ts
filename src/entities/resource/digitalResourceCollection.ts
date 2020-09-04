import { v4 } from 'uuid';
import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { DigitalResource } from './digitalResource';

export type DigitalResourceCollection = {
	items?: DigitalResource[] | string[];
} & DigitalResource;

export type DigitalResourceCollectionParams = Omit<Partial<DigitalResourceCollection>, '@context' | 'type'>;

export function createDigitalResourceCollection(
	delegate: DigitalResourceCollectionParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): DigitalResourceCollection {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.digitalResourceCollection
	} as DigitalResourceCollection;
}
