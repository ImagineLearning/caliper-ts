import { v4 } from 'uuid';
import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { Person } from '../agent/person';
import { Entity } from '../entity';
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

export type AttemptParams = Omit<Partial<Attempt>, '@context' | 'type'>;

export function createAttempt(delegate: AttemptParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1): Attempt {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.attempt
	} as Attempt;
}
