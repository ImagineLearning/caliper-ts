import { JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Response } from './response';
import { createEntity } from '../entity';

export type TrueFalseResponse = {
	value?: string;
} & Response;

export type TrueFalseResponseParams = Omit<TrueFalseResponse, '@context' | 'type'>;

export function createTrueFalseResponse(
	delegate: TrueFalseResponseParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): TrueFalseResponse {
	return createEntity<TrueFalseResponse>({ ...delegate, type: EntityType.TrueFalseResponse }, contextVersion);
}
