import { JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Response, createResponse } from './response';
import { createEntity } from '../entityFactory';

export type MultipleResponseResponse = {
	values?: string[];
} & Response;

export type MultipleResponseResponseParams = Omit<MultipleResponseResponse, '@context' | 'type'>;

export function createMultipleResponseResponse(
	delegate: MultipleResponseResponseParams,
	calculateDuration: boolean = true,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): MultipleResponseResponse {
	const entity = createResponse(delegate, calculateDuration, contextVersion);
	return createEntity<MultipleResponseResponse>(
		{ ...delegate, ...entity, type: EntityType.MultipleResponseResponse, values: delegate.values?.sort() },
		contextVersion
	);
}
