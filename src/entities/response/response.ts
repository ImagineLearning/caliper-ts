import { JsonLdContextVersion } from '../../config/config';
import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { Attempt } from '../resource/attempt';
import { createEntity } from '../entityFactory';
import { getFormattedDuration } from '../../utils/dateUtils';
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
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): Response {
	return createEntity<Response>(
		{
			...delegate,
			type: EntityType.Response,
			duration:
				calculateDuration && delegate.startedAtTime && delegate.endedAtTime
					? getFormattedDuration(delegate.startedAtTime, delegate.endedAtTime)
					: undefined
		},
		contextVersion
	);
}
