import { DigitalResource } from './digitalResource';

export interface DigitalResourceCollection extends DigitalResource {
	items: DigitalResource[] | string[];
}
