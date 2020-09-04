import { v4 } from 'uuid';
import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Agent } from './agent';

export type Organization = {
	subOrganizationOf?: Organization | string;
	members?: Agent[] | string[];
} & Agent;

export type OrganizationParams = Omit<Partial<Organization>, '@context' | 'type'>;

export function createOrganization(
	delegate: OrganizationParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): Organization {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.organization
	} as Organization;
}
