import { JsonLdContextVersion } from '../../config/config';
import { getFormattedDuration } from '../../utils/dateUtils';
import { Person } from '../agent/person';
import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { createEntity } from '../entityFactory';

export type Session = {
	user?: Person | string;
	startedAtTime?: string;
	endedAtTime?: string;
	duration?: string;
} & Entity;

export type SessionParams = Omit<Session, '@context' | 'type'>;

export function createSession(delegate: SessionParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1): Session {
	return createEntity<Session>(
		{
			type: EntityType.Session,
			duration:
				delegate.startedAtTime && delegate.endedAtTime
					? getFormattedDuration(delegate.startedAtTime, delegate.endedAtTime)
					: undefined,
			...delegate
		},
		contextVersion
	);
}
