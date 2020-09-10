import { JsonLdContextVersion, getJsonLdContext, DEFAULT_CONFIG } from '../config/config';
import { Entity } from './entity';

export function createEntity<T extends Entity>(
	delegate: Omit<T, '@context'>,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): T {
	return {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		...delegate
	} as T;
}
