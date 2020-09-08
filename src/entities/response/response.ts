import { Attempt } from '../resource/attempt';
import { DEFAULT_CONFIG, JsonLdContextVersion, getJsonLdContext } from '../../config/config';
import { EntityType } from '../entityType';
import { Entity } from '../entity';
export type Response = {
	attempt?: Attempt | string;
	startedAtTime?: string;
	endedAtTime?: string;
	duration?: string;
} & Entity;

export type ResponseParams = Omit<Response, '@context' | 'type'>;

export function createResponse(delegate: ResponseParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1): Response {
	return {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.Response,
		...delegate
	} as Response;
}
