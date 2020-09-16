import { JsonLdContextVersion } from '../../config/config';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';
import { createResponse, Response } from './response';

export type MultipleResponseResponse = {
	values?: string[];
} & Response;

export type MultipleResponseResponseParams = Omit<MultipleResponseResponse, '@context' | 'type'>;

export function createMultipleResponseResponse(
	delegate: MultipleResponseResponseParams,
	calculateDuration: boolean = true,
	contextVersion?: JsonLdContextVersion
): MultipleResponseResponse {
	const entity = createResponse(delegate, calculateDuration, contextVersion);
	return createEntity<MultipleResponseResponse>(
		{ ...delegate, ...entity, type: EntityType.MultipleResponseResponse, values: delegate.values?.sort() },
		contextVersion
	);
}
