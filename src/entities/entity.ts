// import { v4 } from 'uuid';
import { EntityType } from './entityType';
import { JsonLdContextVersion, getJsonLdContext, DEFAULT_CONFIG } from '../config/config';

export interface Entity {
	'@context'?: string;
	type: EntityType;
	id: string;
	name?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	extensions?: Record<string, string>;
}

export function createEntity<T extends Entity>(
	delegate: Omit<T, '@context'>,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): T {
	return {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		...delegate
	} as T;
}
