import { JsonLdContextVersion } from '../../config/config';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';
import { Organization } from './organization';

export type CourseOffering = {
	courseNumber?: string;
	academicSession?: string;
} & Organization;

export type CourseOfferingParams = Omit<CourseOffering, '@context' | 'type'>;

export function createCourseOffering(delegate: CourseOfferingParams, contextVersion?: JsonLdContextVersion) {
	return createEntity<CourseOffering>({ ...delegate, type: EntityType.CourseOffering }, contextVersion);
}
