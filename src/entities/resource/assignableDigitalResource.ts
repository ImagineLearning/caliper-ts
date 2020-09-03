import { DEFAULT_CONFIG } from '../../config/config';
import { EntityType } from '../entityType';
import { DigitalResource } from './digitalResource';

export class AssignableDigitalResource extends DigitalResource {
	dateToActivate?: string;
	dateToShow?: string;
	dateToStartOn?: string;
	dateToSubmit?: string;
	maxAttempts?: number;
	maxSubmits?: number;
	maxScore?: number;

	constructor(delegate?: Partial<AssignableDigitalResource>) {
		super(delegate);
		this['@context'] = DEFAULT_CONFIG.jsonldContext.v1p1;
		this.type = EntityType.assignableDigitalResource;
		this.dateToActivate = delegate?.dateToActivate;
		this.dateToShow = delegate?.dateToShow;
		this.dateToStartOn = delegate?.dateToStartOn;
		this.dateToSubmit = delegate?.dateToSubmit;
		this.maxAttempts = delegate?.maxAttempts;
		this.maxSubmits = delegate?.maxSubmits;
		this.maxScore = delegate?.maxScore;
	}
}
