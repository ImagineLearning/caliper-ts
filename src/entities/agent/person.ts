import { Entity } from '../entity';
import { EntityType } from '../entityType';

export type Person = {} & Entity;

export function createPerson(delegate: Person): Person {
	return { ...delegate, type: EntityType.person } as Person;
}
