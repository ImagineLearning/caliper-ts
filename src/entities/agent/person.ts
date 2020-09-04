import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { JsonLdContextVersion, DEFAULT_CONFIG } from '../../config/config';
import { v4 } from 'uuid';

export type Person = {} & Entity;

export function createPerson(delegate: Partial<Person>, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1): Person {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': DEFAULT_CONFIG.jsonldContext[contextVersion],
		type: EntityType.person
	} as Person;
}
