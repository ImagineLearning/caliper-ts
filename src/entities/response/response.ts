import { DigitalResource } from '../resource/digitalResource';
import { Attempt } from '../resource/attempt';
import { DEFAULT_CONFIG } from '../../config/config';
import { EntityType } from '../entityType';
export type Response = {
	attempt?: Attempt | string;
	startedAtTime?: string;
	endedAtTime?: string;
	duration?: string;
} & DigitalResource;

export function createResponse(delegate: Response): Response {
	return {
		...delegate,
		'@context': DEFAULT_CONFIG.jsonldContext.v1p1,
		type: EntityType.response
	} as Response;
}
