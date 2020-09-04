import { v4 } from 'uuid';
import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { AssignableDigitalResource } from './assignableDigitalResource';

export type AssessmentItem = {
	isTimeDependent?: boolean;
} & Entity &
	AssignableDigitalResource;

export type AssessmentItemParams = Omit<Partial<AssessmentItem>, '@context' | 'type'>;

export function createAssessmentItem(
	delegate: AssessmentItemParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): AssessmentItem {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.assessmentItem
	} as AssessmentItem;
}
