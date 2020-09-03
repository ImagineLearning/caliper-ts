import { Entity } from '../entity';
import { EntityType } from '../entityType';

export class Person extends Entity {
	constructor(person?: Partial<Person>) {
		super(person);
		this.type = EntityType.person;
	}
}
