import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../config/config';
import { Entity } from './entity';

export function createEntity<T extends Entity>(delegate: Omit<T, '@context'>, contextVersion?: JsonLdContextVersion): T {
	const entity = {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		...delegate
	} as T;
	if (
		contextVersion === JsonLdContextVersion.none ||
		contextVersion === JsonLdContextVersion.v1p0 ||
		contextVersion === JsonLdContextVersion.v1p1
	) {
		delete entity.otherIdentifiers;
	}
	return entity;
}
