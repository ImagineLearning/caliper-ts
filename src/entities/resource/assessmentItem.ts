import { JsonLdContextVersion } from '../../config/config';
import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { AssignableDigitalResource } from './assignableDigitalResource';
import { createEntity } from '../entityFactory';

export type AssessmentItem = {
	isTimeDependent?: boolean;
} & Entity &
	AssignableDigitalResource;

export type AssessmentItemParams = Omit<AssessmentItem, '@context' | 'type'>;

export function createAssessmentItem(delegate: AssessmentItemParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.none) {
	return createEntity<AssessmentItem>({ ...delegate, type: EntityType.AssessmentItem }, contextVersion);
}
