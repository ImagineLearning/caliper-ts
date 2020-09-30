import { JsonLdContextVersion } from '../../config/config';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';
import { createResponse, Response } from './response';

export type MultipleChoiceResponse = {
	value?: string;
} & Response;

export type MultipleChoiceResponseParams = Omit<MultipleChoiceResponse, '@context' | 'type'>;

export function createMultipleChoiceResponse(
	delegate: MultipleChoiceResponseParams,
	calculateDuration: boolean = true,
	contextVersion?: JsonLdContextVersion
): MultipleChoiceResponse {
	const entity = createResponse(delegate, calculateDuration, contextVersion);
	return createEntity<MultipleChoiceResponse>({ ...delegate, ...entity, type: EntityType.MultipleChoiceResponse }, contextVersion);
}
