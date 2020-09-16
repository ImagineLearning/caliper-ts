import { JsonLdContextVersion } from '../../config/config';
import { getFormattedDuration } from '../../utils/dateUtils';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';
import { Session } from './session';

export type LtiSession = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	messageParameters?: Record<string, any>;
} & Session;

export type LtiSessionParams = Omit<LtiSession, '@context' | 'type'>;

export function createLtiSession(delegate: LtiSessionParams, contextVersion?: JsonLdContextVersion) {
	return createEntity<LtiSession>(
		{
			...delegate,
			type: EntityType.LtiSession,
			duration:
				delegate.startedAtTime && delegate.endedAtTime
					? getFormattedDuration(delegate.startedAtTime, delegate.endedAtTime)
					: undefined
		},
		contextVersion
	);
}
