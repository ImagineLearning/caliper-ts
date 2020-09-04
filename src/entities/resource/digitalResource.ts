import { Agent } from '../agent/agent';
import { Entity } from '../entity';
import { LearningObjective } from './LearningObjective';
import { EntityType } from '../entityType';
import { DEFAULT_CONFIG } from '../../config/config';

export type DigitalResource = {
	mediaType?: string;
	creators?: Agent[] | string[];
	keywords?: string[];
	learningObjectives?: LearningObjective[];
	isPartOf?: Entity | string;
	datePublished?: string;
	version?: string;
} & Entity;

export function createDigitalResource(delegate: DigitalResource): DigitalResource {
	return {
		...delegate,
		type: EntityType.digitalResource,
		'@context': DEFAULT_CONFIG.jsonldContext.v1p1
	} as DigitalResource;
}
