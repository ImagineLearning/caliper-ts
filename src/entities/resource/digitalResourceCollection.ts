import { JsonLdContextVersion } from '../../config/config';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';
import { DigitalResource } from './digitalResource';

export type DigitalResourceCollection = {
	items?: DigitalResource[] | string[];
} & DigitalResource;

export type DigitalResourceCollectionParams = Omit<DigitalResourceCollection, '@context' | 'type'>;

export function createDigitalResourceCollection(
	delegate: DigitalResourceCollectionParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
) {
	return createEntity<DigitalResourceCollection>({ ...delegate, type: EntityType.DigitalResourceCollection }, contextVersion);
}
