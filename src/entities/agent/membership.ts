import { JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Entity, createEntity } from '../entity';
import { Person } from './person';
import { Role } from './role';
import { Status } from './status';
import { Organization } from './organization';

export type Membership = {
	organization?: Organization | string;
	member?: Person | string;
	roles?: Role[] | string;
	status?: Status;
} & Entity;

export type MembershipParams = Omit<Membership, '@context' | 'type'>;

export function createMembership(delegate: MembershipParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1) {
	return createEntity<Membership>({ ...delegate, type: EntityType.Membership }, contextVersion);
}
