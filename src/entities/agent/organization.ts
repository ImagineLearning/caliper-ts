import { Agent } from './agent';
import { EntityType } from '../entityType';

export type Organization = {
	subOrganizationOf?: Organization | string;
	members?: Agent[] | string[];
} & Agent;

export function createOrganization(delegate: Organization): Organization {
	return {
		...delegate,
		type: EntityType.organization
	} as Organization;
}
