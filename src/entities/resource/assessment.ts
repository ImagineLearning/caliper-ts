import { EntityType } from '../entityType';
import { DigitalResourceCollection } from './digitalResourceCollection';
import { AssignableDigitalResource } from './AssignableDigitalResource';
import { Entity } from '../entity';
import { LearningObjective } from './learningObjective';
import { Agent } from '../agent/agent';
import { DigitalResource } from './digitalResource';
import { DEFAULT_CONFIG } from '../../config/config';

export class Assessment extends Entity implements DigitalResourceCollection, AssignableDigitalResource {
	items: DigitalResource[] | string[];
	mediaType?: string;
	creators?: string[] | Agent[];
	keywords?: string[];
	learningObjectives?: LearningObjective[];
	isPartOf?: string | Entity;
	datePublished?: string;
	version?: string;
	dateToActivate?: string;
	dateToShow?: string;
	dateToStartOn?: string;
	dateToSubmit?: string;
	maxAttempts?: number;
	maxSubmits?: number;
	maxScore?: number;

	constructor(delegate?: Partial<Assessment>) {
		super(delegate);
		this.type = EntityType.assessment;
		this['@context'] = DEFAULT_CONFIG.jsonldContext.v1p1;
		this.mediaType = delegate?.mediaType;
		this.creators = delegate?.creators;
		this.keywords = delegate?.keywords;
		this.learningObjectives = delegate?.learningObjectives;
		this.isPartOf = delegate?.isPartOf;
		this.datePublished = delegate?.datePublished;
		this.items = delegate?.items ?? [];
		this.dateToActivate = delegate?.dateToActivate;
		this.dateToShow = delegate?.dateToShow;
		this.dateToStartOn = delegate?.dateToStartOn;
		this.dateToSubmit = delegate?.dateToSubmit;
		this.maxAttempts = delegate?.maxAttempts;
		this.maxSubmits = delegate?.maxSubmits;
		this.maxScore = delegate?.maxScore;
	}
}
