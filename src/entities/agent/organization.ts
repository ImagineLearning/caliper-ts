import { JsonLdContextVersion } from '../../config/config';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';
import { Agent } from './agent';

export type Organization = {
	subOrganizationOf?: Organization | string;
	members?: Agent[] | string[];
} & Agent;

export type OrganizationParams = Omit<Organization, '@context' | 'type'>;

export function createOrganization(delegate: OrganizationParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1) {
	return createEntity<Organization>({ ...delegate, type: EntityType.Organization }, contextVersion);
}
