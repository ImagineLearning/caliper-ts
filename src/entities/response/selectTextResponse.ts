import { JsonLdContextVersion } from '../../config/config';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';
import { createResponse, Response } from './response';

export type SelectTextResponse = {
	values?: string[];
} & Response;

export type SelectTextResponseParams = Omit<SelectTextResponse, '@context' | 'type'>;

export function createSelectTextResponse(
	delegate: SelectTextResponseParams,
	calculateDuration: boolean = true,
	contextVersion?: JsonLdContextVersion
): SelectTextResponse {
	const entity = createResponse(delegate, calculateDuration, contextVersion);
	return createEntity<SelectTextResponse>({ ...delegate, ...entity, type: EntityType.SelectTextResponse }, contextVersion);
}
