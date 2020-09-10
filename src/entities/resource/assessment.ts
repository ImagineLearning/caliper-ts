import { JsonLdContextVersion } from '../../config/config';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';
import { AssignableDigitalResource } from './assignableDigitalResource';
import { DigitalResourceCollection } from './digitalResourceCollection';

export type Assessment = DigitalResourceCollection & AssignableDigitalResource;

export type AssessmentParams = Omit<Assessment, '@context' | 'type'>;

export function createAssessment(delegate: AssessmentParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1) {
	return createEntity<Assessment>({ ...delegate, type: EntityType.Assessment }, contextVersion);
}
