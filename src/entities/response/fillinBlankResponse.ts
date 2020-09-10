import { JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Response } from './response';
import { createEntity } from '../entityFactory';

export type FillinBlankResponse = {
	values?: string[];
} & Response;

export type FillinBlankResponseParams = Omit<FillinBlankResponse, '@context' | 'type'>;

export function createFillinBlankResponse(
	delegate: FillinBlankResponseParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): FillinBlankResponse {
	return createEntity<FillinBlankResponse>(
		{ ...delegate, type: EntityType.FillinBlankResponse, values: delegate.values?.sort() },
		contextVersion
	);
}
