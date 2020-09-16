import { JsonLdContextVersion } from '../../config/config';
import { Person } from '../agent/person';
import { Entity } from '../entity';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';
import { DigitalResource } from './digitalResource';

export type Attempt = {
	assignee?: Person | string;
	assignable?: DigitalResource | string;
	isPartOf?: Attempt | string;
	count?: number;
	startedAtTime?: string;
	endedAtTime?: string;
	duration?: string;
} & Entity;

export type AttemptParams = Omit<Attempt, '@context' | 'type'>;

export function createAttempt(delegate: AttemptParams, contextVersion?: JsonLdContextVersion) {
	return createEntity<Attempt>({ ...delegate, type: EntityType.Attempt }, contextVersion);
}
