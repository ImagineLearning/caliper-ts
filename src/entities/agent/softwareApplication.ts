import { v4 } from 'uuid';
import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { Entity } from '../entity';
import { EntityType } from '../entityType';

export type SoftwareApplication = {
	version?: string;
} & Entity;

export type SoftwareApplicationParams = Omit<Partial<SoftwareApplication>, '@context' | 'type'>;

export function createSoftwareApplication(
	delegate: SoftwareApplicationParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): SoftwareApplication {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.softwareApplication
	} as SoftwareApplication;
}
