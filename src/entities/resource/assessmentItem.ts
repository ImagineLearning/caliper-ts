import { AssignableDigitalResource } from './assignableDigitalResource';
import { Entity } from '../entity';
import { Agent } from '../agent/agent';
import { LearningObjective } from './LearningObjective';
import { EntityType } from '../entityType';

export class AssessmentItem extends Entity implements AssignableDigitalResource {
	isTimeDependent?: boolean;
	dateToActivate?: string;
	dateToShow?: string;
	dateToStartOn?: string;
	dateToSubmit?: string;
	maxAttempts?: number;
	maxSubmits?: number;
	maxScore?: number;
	mediaType?: string;
	creators?: Agent[] | string[];
	keywords?: string[];
	learningObjectives?: LearningObjective[];
	isPartOf?: Entity | string;
	datePublished?: string;
	version?: string;

	constructor(delegate?: Partial<AssessmentItem>) {
		super(delegate);
		this.type = EntityType.assessmentItem;
		// this['@context'] = DEFAULT_CONFIG.jsonldContext.v1p1;
		this.mediaType = delegate?.mediaType;
		this.creators = delegate?.creators;
		this.keywords = delegate?.keywords;
		this.learningObjectives = delegate?.learningObjectives;
		this.isPartOf = delegate?.isPartOf;
		this.datePublished = delegate?.datePublished;
		this.dateToActivate = delegate?.dateToActivate;
		this.dateToShow = delegate?.dateToShow;
		this.dateToStartOn = delegate?.dateToStartOn;
		this.dateToSubmit = delegate?.dateToSubmit;
		this.maxAttempts = delegate?.maxAttempts;
		this.maxSubmits = delegate?.maxSubmits;
		this.maxScore = delegate?.maxScore;
		this.version = delegate?.version;
		this.isTimeDependent = delegate?.isTimeDependent;
	}
}
