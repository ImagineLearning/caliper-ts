import { JsonLdContextVersion } from '../../config/config';
import { createEntity } from '../entityFactory';
import { Session } from './session';
import { EntityType } from '../entityType';
import { getFormattedDuration } from '../../utils/dateUtils';

export type LtiSession = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	messageParameters?: Record<string, any>;
} & Session;

export type LtiSessionParams = Omit<LtiSession, '@context' | 'type'>;

export function createLtiSession(delegate: LtiSessionParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1) {
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
