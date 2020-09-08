import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { DigitalResource } from './digitalResource';

export type DigitalResourceCollection = {
	items?: DigitalResource[] | string[];
} & DigitalResource;

export type DigitalResourceCollectionParams = Omit<DigitalResourceCollection, '@context' | 'type'>;

export function createDigitalResourceCollection(
	delegate: DigitalResourceCollectionParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): DigitalResourceCollection {
	return {
		...delegate,
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.digitalResourceCollection
	} as DigitalResourceCollection;
}
