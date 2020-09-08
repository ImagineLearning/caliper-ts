import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { Entity } from '../entity';
import { EntityType } from '../entityType';

export type SoftwareApplication = {
	version?: string;
} & Entity;

export type SoftwareApplicationParams = Omit<SoftwareApplication, '@context' | 'type'>;

export function createSoftwareApplication(
	delegate: SoftwareApplicationParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): SoftwareApplication {
	return {
		...delegate,
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.softwareApplication
	} as SoftwareApplication;
}
