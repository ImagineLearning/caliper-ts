import { Agent } from '../agent/agent';
import { Entity } from '../entity';
import { LearningObjective } from './LearningObjective';

export interface DigitalResource extends Entity {
	mediaType?: string;
	creators?: Agent[] | string[];
	keywords?: string[];
	learningObjectives?: LearningObjective[];
	isPartOf?: Entity | string;
	datePublished?: string;
	version?: string;
}
