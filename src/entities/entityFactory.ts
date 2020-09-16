import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../config/config';
import { Entity } from './entity';

export function createEntity<T extends Entity>(delegate: Omit<T, '@context'>, contextVersion?: JsonLdContextVersion): T {
	return {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		...delegate
	} as T;
}
