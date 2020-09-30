import { compareJsonLdContextVersions, DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../config/config';
import { Entity } from './entity';
import { EntityType } from './entityType';
import { DigitalResource } from './resource/digitalResource';

export function createEntity<T extends Entity>(delegate: Omit<T, '@context'>, contextVersion?: JsonLdContextVersion): T {
	const entity = {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		...delegate
	} as T;
	if (compareJsonLdContextVersions(contextVersion || DEFAULT_CONFIG.dataVersion, JsonLdContextVersion.v1p2) < 0) {
		delete entity.otherIdentifiers;
		if (
			entity.type === EntityType.Assessment ||
			entity.type === EntityType.AssessmentItem ||
			entity.type === EntityType.AssignableDigitalResource ||
			entity.type === EntityType.DigitalResource ||
			entity.type === EntityType.DigitalResourceCollection
		) {
			delete (entity as DigitalResource).storageName;
		}
	}
	return entity;
}
