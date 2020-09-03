import { EntityType } from '../entityType';
import { DigitalResource } from './digitalResource';

export type DigitalResourceCollection = {
	type: EntityType.digitalResourceCollection;
	items: DigitalResource[];
} & DigitalResource;
