import { JsonLdContextVersion } from '../../config/config';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';
import { createResponse, Response } from './response';

export type TrueFalseResponse = {
	value?: string;
} & Response;

export type TrueFalseResponseParams = Omit<TrueFalseResponse, '@context' | 'type'>;

export function createTrueFalseResponse(
	delegate: TrueFalseResponseParams,
	calculateDuration: boolean = true,
	contextVersion?: JsonLdContextVersion
): TrueFalseResponse {
	const entity = createResponse(delegate, calculateDuration, contextVersion);
	return createEntity<TrueFalseResponse>({ ...delegate, ...entity, type: EntityType.TrueFalseResponse }, contextVersion);
}
