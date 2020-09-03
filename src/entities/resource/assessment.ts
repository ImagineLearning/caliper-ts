import { EntityType } from '../entityType';
import { DigitalResourceCollection } from './digitalResourceCollection';
import { DigitalResource } from './digitalResource';

export type Assessment = {
	type: EntityType.assessment;
} & DigitalResourceCollection &
	DigitalResource;
