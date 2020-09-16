import { JsonLdContextVersion } from '../../config/config';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';
import { createResponse, Response } from './response';

export type FillinBlankResponse = {
	values?: string[];
} & Response;

export type FillinBlankResponseParams = Omit<FillinBlankResponse, '@context' | 'type'>;

export function createFillinBlankResponse(
	delegate: FillinBlankResponseParams,
	calculateDuration: boolean = true,
	contextVersion?: JsonLdContextVersion
): FillinBlankResponse {
	const entity = createResponse(delegate, calculateDuration, contextVersion);
	return createEntity<FillinBlankResponse>({ ...delegate, ...entity, type: EntityType.FillinBlankResponse }, contextVersion);
}
