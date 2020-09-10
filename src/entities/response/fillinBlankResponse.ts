import { JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Response, createResponse } from './response';
import { createEntity } from '../entityFactory';

export type FillinBlankResponse = {
	values?: string[];
} & Response;

export type FillinBlankResponseParams = Omit<FillinBlankResponse, '@context' | 'type'>;

export function createFillinBlankResponse(
	delegate: FillinBlankResponseParams,
	calculateDuration: boolean = true,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): FillinBlankResponse {
	const entity = createResponse(delegate, calculateDuration, contextVersion);
	return createEntity<FillinBlankResponse>({ ...delegate, ...entity, type: EntityType.FillinBlankResponse }, contextVersion);
}
