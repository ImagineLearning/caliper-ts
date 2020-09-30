import { JsonLdContextVersion } from '../../config/config';
import { getFormattedDuration } from '../../utils/dateUtils';
import { Entity } from '../entity';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';
import { Attempt } from '../resource/attempt';
export type Response = {
	attempt?: Attempt | string;
	startedAtTime?: string;
	endedAtTime?: string;
	duration?: string;
} & Entity;

export type ResponseParams = Omit<Response, '@context' | 'type'>;

export function createResponse(
	delegate: ResponseParams,
	calculateDuration: boolean = true,
	contextVersion?: JsonLdContextVersion
): Response {
	return createEntity<Response>(
		{
			...delegate,
			type: EntityType.Response,
			duration:
				calculateDuration && delegate.startedAtTime && delegate.endedAtTime
					? getFormattedDuration(delegate.startedAtTime, delegate.endedAtTime)
					: delegate.duration
		},
		contextVersion
	);
}
