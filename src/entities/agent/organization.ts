import { Agent } from './agent';
import { DEFAULT_CONFIG } from '../../config/config';
import { EntityType } from '../entityType';

export type Organization = {
	subOrganizationOf?: Organization | string;
	members?: Agent[] | string[];
} & Agent;

export function createOrganization(delegate: Organization): Organization {
	return {
		...delegate,
		'@context': DEFAULT_CONFIG.jsonldContext.v1p1,
		type: EntityType.organization
	} as Organization;
}
