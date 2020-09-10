import { JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Response } from './response';
import { createEntity } from '../entityFactory';

export type MultipleResponseResponse = {
	values?: string[];
} & Response;

export type MultipleResponseResponseParams = Omit<MultipleResponseResponse, '@context' | 'type'>;

export function createMultipleResponseResponse(
	delegate: MultipleResponseResponseParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): MultipleResponseResponse {
	return createEntity<MultipleResponseResponse>(
		{ ...delegate, type: EntityType.MultipleResponseResponse, values: delegate.values?.sort() },
		contextVersion
	);
}
