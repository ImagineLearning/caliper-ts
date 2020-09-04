import { Entity } from '../entity';
import { DEFAULT_CONFIG, JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { v4 } from 'uuid';

export type SoftwareApplication = {
	version?: string;
} & Entity;

export function createSoftwareApplication(
	delegate: Partial<SoftwareApplication>,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): SoftwareApplication {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': DEFAULT_CONFIG.jsonldContext[contextVersion],
		type: EntityType.softwareApplication
	} as SoftwareApplication;
}
