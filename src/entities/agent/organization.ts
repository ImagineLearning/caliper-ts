import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Agent } from './agent';

export type Organization = {
	subOrganizationOf?: Organization | string;
	members?: Agent[] | string[];
} & Agent;

export type OrganizationParams = Omit<Organization, '@context' | 'type'>;

export function createOrganization(
	delegate: OrganizationParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): Organization {
	return {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.Organization,
		...delegate
	} as Organization;
}
