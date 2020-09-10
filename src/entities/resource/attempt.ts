import { JsonLdContextVersion } from '../../config/config';
import { Person } from '../agent/person';
import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { DigitalResource } from './digitalResource';
import { createEntity } from '../entityFactory';

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

export function createAttempt(delegate: AttemptParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1) {
	return createEntity<Attempt>({ ...delegate, type: EntityType.Attempt }, contextVersion);
}
