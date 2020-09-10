import { JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Organization } from './organization';
import { createEntity } from '../entityFactory';

export type CourseOffering = {
	courseNumber?: string;
	academicSession?: string;
} & Organization;

export type CourseOfferingParams = Omit<CourseOffering, '@context' | 'type'>;

export function createCourseOffering(delegate: CourseOfferingParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1) {
	return createEntity<CourseOffering>({ ...delegate, type: EntityType.CourseOffering }, contextVersion);
}
