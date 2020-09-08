import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { AssignableDigitalResource } from './assignableDigitalResource';

export type AssessmentItem = {
	isTimeDependent?: boolean;
} & Entity &
	AssignableDigitalResource;

export type AssessmentItemParams = Omit<AssessmentItem, '@context' | 'type'>;

export function createAssessmentItem(
	delegate: AssessmentItemParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.none
): AssessmentItem {
	return {
		...delegate,
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.assessmentItem
	} as AssessmentItem;
}
