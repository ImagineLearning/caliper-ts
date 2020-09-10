import { JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Response, createResponse } from './response';
import { createEntity } from '../entityFactory';

export type SelectTextResponse = {
	values?: string[];
} & Response;

export type SelectTextResponseParams = Omit<SelectTextResponse, '@context' | 'type'>;

export function createSelectTextResponse(
	delegate: SelectTextResponseParams,
	calculateDuration: boolean = true,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): SelectTextResponse {
	const entity = createResponse(delegate, calculateDuration, contextVersion);
	return createEntity<SelectTextResponse>({ ...delegate, ...entity, type: EntityType.SelectTextResponse }, contextVersion);
}
