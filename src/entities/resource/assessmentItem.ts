import { AssignableDigitalResource } from './assignableDigitalResource';
import { Entity } from '../entity';
import { EntityType } from '../entityType';

export type AssessmentItem = {
	isTimeDependent?: boolean;
} & Entity &
	AssignableDigitalResource;

export function createAssessmentItem(delegate: AssessmentItem): AssessmentItem {
	return {
		...delegate,
		type: EntityType.assessmentItem
	} as AssessmentItem;
}
