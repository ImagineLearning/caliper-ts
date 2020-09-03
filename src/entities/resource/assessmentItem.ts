import { AssignableDigitalResource } from './assignableDigitalResource';
import { EntityType } from '../entityType';
import { DEFAULT_CONFIG } from '../../config/config';
export class AssessmentItem extends AssignableDigitalResource {
	isTimeDependent?: boolean;

	constructor(delegate?: Partial<AssessmentItem>) {
		super(delegate);
		this['@context'] = DEFAULT_CONFIG.jsonldContext.v1p1;
		this.type = EntityType.assessmentItem;
		this.isTimeDependent = delegate?.isTimeDependent;
	}
}
