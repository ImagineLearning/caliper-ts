import { Agent } from '../agent/agent';
import { Entity } from '../entity';
import { LearningObjective } from './LearningObjective';
import { EntityType } from '../entityType';
import { JsonLdContextVersion, DEFAULT_CONFIG } from '../../config/config';
import { v4 } from 'uuid';

export type DigitalResource = {
	mediaType?: string;
	creators?: Agent[] | string[];
	keywords?: string[];
	learningObjectives?: LearningObjective[];
	isPartOf?: Entity | string;
	datePublished?: string;
	version?: string;
} & Entity;

export function createDigitalResource(
	delegate: Partial<DigitalResource>,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): DigitalResource {
	return {
		...delegate,
		type: EntityType.digitalResource,
		id: delegate.id ?? v4(),
		'@context': DEFAULT_CONFIG.jsonldContext[contextVersion]
	} as DigitalResource;
}
