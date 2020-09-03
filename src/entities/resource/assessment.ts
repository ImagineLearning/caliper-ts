import { EntityType } from '../entityType';
import { DigitalResourceCollection } from './digitalResourceCollection';

export class Assessment extends DigitalResourceCollection {
	constructor(delegate?: Partial<Assessment>) {
		super(delegate);
		this.type = EntityType.assessment;
	}
}
