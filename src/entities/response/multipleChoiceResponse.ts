import { DEFAULT_CONFIG, JsonLdContextVersion, getJsonLdContext } from '../../config/config';
import { EntityType } from '../entityType';
import { Response } from './response';

export type MultipleChoiceResponse = {
	value?: string;
} & Response;

export type MultipleChoiceResponseParams = Omit<MultipleChoiceResponse, '@context' | 'type'>;

export function createMultipleChoiceResponse(
	delegate: MultipleChoiceResponseParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): MultipleChoiceResponse {
	return {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.MultipleChoiceResponse,
		...delegate
	} as MultipleChoiceResponse;
}
