import { AssignableDigitalResource } from './assignableDigitalResource';
import { EntityType } from '../entityType';
export type AssessmentItem = {
	type: EntityType.assessmentItem;
	isTimeDependent?: boolean;
} & AssignableDigitalResource;
