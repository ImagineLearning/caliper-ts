import { JsonLdContextVersion } from '../../config/config';
import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { createEntity } from '../entityFactory';

export type SoftwareApplication = {
	version?: string;
} & Entity;

export type SoftwareApplicationParams = Omit<SoftwareApplication, '@context' | 'type'>;

export function createSoftwareApplication(
	delegate: SoftwareApplicationParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.none
): SoftwareApplication {
	return createEntity<SoftwareApplication>({ ...delegate, type: EntityType.SoftwareApplication }, contextVersion);
}
