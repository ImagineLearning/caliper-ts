import { JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Response, createResponse } from './response';
import { createEntity } from '../entityFactory';

export type TrueFalseResponse = {
	value?: string;
} & Response;

export type TrueFalseResponseParams = Omit<TrueFalseResponse, '@context' | 'type'>;

export function createTrueFalseResponse(
	delegate: TrueFalseResponseParams,
	calculateDuration: boolean = true,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): TrueFalseResponse {
	const entity = createResponse(delegate, calculateDuration, contextVersion);
	return createEntity<TrueFalseResponse>({ ...delegate, ...entity, type: EntityType.TrueFalseResponse }, contextVersion);
}
