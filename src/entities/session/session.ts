import { Entity } from '../entity';
import { Person } from '../agent/person';
import { EntityType } from '../entityType';
import { DEFAULT_CONFIG, JsonLdContextVersion } from '../../config/config';
import { v4 } from 'uuid';

export type Session = {
	user?: Person | string;
	startedAtTime?: string;
	endedAtTime?: string;
	duration?: number;
} & Entity;

export function createSession(delegate: Partial<Session>, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1): Session {
	return {
		id: delegate.id ?? v4(),
		'@context': DEFAULT_CONFIG.jsonldContext[contextVersion],
		type: EntityType.session,
		...delegate
	} as Session;
}
