import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { Agent } from '../agent/agent';
import { LearningObjective } from './LearningObjective';
import { DEFAULT_CONFIG } from '../../config/config';

export class DigitalResource extends Entity {
	mediaType?: string;
	creators?: Agent[] | string[];
	keywords?: string[];
	learningObjectives?: LearningObjective[];
	isPartOf?: Entity | string;
	datePublished?: string;
	version?: string;

	constructor(delegate?: Partial<DigitalResource>) {
		super(delegate);
		this['@context'] = DEFAULT_CONFIG.jsonldContext.v1p1;
		this.type = EntityType.digitalResource;
		this.mediaType = delegate?.mediaType;
		this.creators = delegate?.creators;
		this.keywords = delegate?.keywords;
		this.learningObjectives = delegate?.learningObjectives;
		this.isPartOf = delegate?.isPartOf;
		this.datePublished = delegate?.datePublished;
	}
}
