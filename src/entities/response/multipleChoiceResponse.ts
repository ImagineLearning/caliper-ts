import { JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Response, createResponse } from './response';
import { createEntity } from '../entityFactory';

export type MultipleChoiceResponse = {
	value?: string;
} & Response;

export type MultipleChoiceResponseParams = Omit<MultipleChoiceResponse, '@context' | 'type'>;

export function createMultipleChoiceResponse(
	delegate: MultipleChoiceResponseParams,
	calculateDuration: boolean = true,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): MultipleChoiceResponse {
	const entity = createResponse(delegate, calculateDuration, contextVersion);
	return createEntity<MultipleChoiceResponse>({ ...delegate, ...entity, type: EntityType.MultipleChoiceResponse }, contextVersion);
}
