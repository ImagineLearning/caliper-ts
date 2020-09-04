import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { Person } from '../agent/person';
import { DigitalResource } from './digitalResource';
import { JsonLdContextVersion, DEFAULT_CONFIG } from '../../config/config';
import { v4 } from 'uuid';

export type Attempt = {
	assignee?: Person | string;
	assignable?: DigitalResource | string;
	isPartOf?: Attempt | string;
	count?: number;
	startedAtTime?: string;
	endedAtTime?: string;
	duration?: string;
} & Entity;

export function createAttempt(delegate: Partial<Attempt>, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1): Attempt {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': DEFAULT_CONFIG.jsonldContext[contextVersion],
		type: EntityType.attempt
	} as Attempt;
}
