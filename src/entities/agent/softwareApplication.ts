import { Entity } from '../entity';
import { DEFAULT_CONFIG } from '../../config/config';
import { EntityType } from '../entityType';

export type SoftwareApplication = {
	version?: string;
} & Entity;

export function createSoftwareApplication(delegate: SoftwareApplication): SoftwareApplication {
	return {
		...delegate,
		'@context': DEFAULT_CONFIG.jsonldContext.v1p1,
		id: EntityType.softwareApplication
	} as SoftwareApplication;
}
