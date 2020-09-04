import { AssignableDigitalResource } from './assignableDigitalResource';
import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { v4 } from 'uuid';
import { JsonLdContextVersion, DEFAULT_CONFIG } from '../../config/config';

export type AssessmentItem = {
	isTimeDependent?: boolean;
} & Entity &
	AssignableDigitalResource;

export function createAssessmentItem(
	delegate: Partial<AssessmentItem>,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): AssessmentItem {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': DEFAULT_CONFIG.jsonldContext[contextVersion],
		type: EntityType.assessmentItem
	} as AssessmentItem;
}
