import { JsonLdContextVersion } from '../../config/config';
import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { Attempt } from '../resource/attempt';
import { createEntity } from '../entityFactory';
export type Response = {
	attempt?: Attempt | string;
	startedAtTime?: string;
	endedAtTime?: string;
	duration?: string;
} & Entity;

export type ResponseParams = Omit<Response, '@context' | 'type'>;

export function createResponse(delegate: ResponseParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1): Response {
	return createEntity<Response>({ ...delegate, type: EntityType.Response }, contextVersion);
}
