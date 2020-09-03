import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { Agent } from '../agent/agent';
import { LearningObjective } from './LearningObjective';

export type DigitalResource = {
	type: EntityType.digitalResource;
	mediaType?: string;
	creators?: Agent[] | string[];
	keywords?: string[];
	learningObjectives?: LearningObjective[];
	isPartOf?: Entity | string;
	datePublished?: string;
	version?: string;
} & Entity;
