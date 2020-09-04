import { Agent } from './agent';
import { EntityType } from '../entityType';
import { JsonLdContextVersion, DEFAULT_CONFIG } from '../../config/config';
import { v4 } from 'uuid';

export type Organization = {
	subOrganizationOf?: Organization | string;
	members?: Agent[] | string[];
} & Agent;

export function createOrganization(
	delegate: Partial<Organization>,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): Organization {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': DEFAULT_CONFIG.jsonldContext[contextVersion],
		type: EntityType.organization
	} as Organization;
}
