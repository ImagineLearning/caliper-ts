import { DigitalResource } from './digitalResource';

export type DigitalResourceCollection = {
	items: DigitalResource[] | string[];
} & DigitalResource;
