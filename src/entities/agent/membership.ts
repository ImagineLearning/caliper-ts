import { JsonLdContextVersion } from '../../config/config';
import { Entity } from '../entity';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';
import { Organization } from './organization';
import { Person } from './person';
import { Role } from './role';
import { Status } from './status';

export type Membership = {
	organization?: Organization | string;
	member?: Person | string;
	roles?: Role[] | string;
	status?: Status;
} & Entity;

export type MembershipParams = Omit<Membership, '@context' | 'type'>;

export function createMembership(delegate: MembershipParams, contextVersion?: JsonLdContextVersion) {
	return createEntity<Membership>({ ...delegate, type: EntityType.Membership }, contextVersion);
}
