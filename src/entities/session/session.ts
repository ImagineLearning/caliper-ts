import { Entity } from '../entity';
import { Person } from '../agent/person';
import { EntityType } from '../entityType';
import { DEFAULT_CONFIG } from '../../config/config';

export type Session = {
	user?: Person | string;
	startedAtTime?: string;
	endedAtTime?: string;
	duration?: number;
} & Entity;

export function createSession(delegate: Session): Session {
	return {
		'@context': DEFAULT_CONFIG.jsonldContext.v1p1,
		type: EntityType.session,
		...delegate
	} as Session;
}
