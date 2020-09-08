import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { Entity } from '../entity';
import { EntityType } from '../entityType';

export type Person = {} & Entity;

export type PersonParams = Omit<Person, '@context' | 'type'>;

export function createPerson(delegate: PersonParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1): Person {
	return {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.person,
		...delegate
	} as Person;
}
