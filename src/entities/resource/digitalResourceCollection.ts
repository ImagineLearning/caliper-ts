import { DigitalResource } from './digitalResource';
import { EntityType } from '../entityType';

export type DigitalResourceCollection = {
	items?: DigitalResource[] | string[];
} & DigitalResource;

export function createDigitalResourceCollection(delegate: DigitalResourceCollection): DigitalResourceCollection {
	return {
		...delegate,
		type: EntityType.digitalResourceCollection
	} as DigitalResourceCollection;
}
