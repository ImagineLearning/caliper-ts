import { JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Response } from './response';
import { createEntity } from '../entity';

export type MultipleChoiceResponse = {
	value?: string;
} & Response;

export type MultipleChoiceResponseParams = Omit<MultipleChoiceResponse, '@context' | 'type'>;

export function createMultipleChoiceResponse(
	delegate: MultipleChoiceResponseParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): MultipleChoiceResponse {
	return createEntity<MultipleChoiceResponse>({ type: EntityType.MultipleChoiceResponse, ...delegate }, contextVersion);
}
