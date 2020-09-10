import { JsonLdContextVersion } from '../../config/config';
import { Agent } from '../agent/agent';
import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { LearningObjective } from './learningObjective';
import { createEntity } from '../entityFactory';

export type DigitalResource = {
	mediaType?: string;
	creators?: Agent[] | string[];
	keywords?: string[];
	learningObjectives?: LearningObjective[];
	isPartOf?: Entity | string;
	datePublished?: string;
	version?: string;
} & Entity;

export type DigitalResourceParams = Omit<DigitalResource, '@context' | 'type'>;

export function createDigitalResource(
	delegate: DigitalResourceParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): DigitalResource {
	return createEntity<DigitalResource>({ ...delegate, type: EntityType.DigitalResource }, contextVersion);
}
