import { JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Response } from './response';
import { createEntity } from '../entity';

export type SelectTextResponse = {
	values?: string[];
} & Response;

export type SelectTextResponseParams = Omit<SelectTextResponse, '@context' | 'type'>;

export function createSelectTextResponse(
	delegate: SelectTextResponseParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): SelectTextResponse {
	return createEntity<SelectTextResponse>({ ...delegate, type: EntityType.SelectTextResponse }, contextVersion);
}
