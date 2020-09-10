import { JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { CourseOffering } from './courseOffering';
import { createEntity } from '../entityFactory';

export type CourseSection = {
	courseNumber?: string;
	academicSession?: string;
	name?: string;
	description?: string;
	category?: string;
} & CourseOffering;

export type CourseSectionParams = Omit<CourseSection, '@context' | 'type'>;

export function createCourseSection(delegate: CourseSectionParams, contextVersion: JsonLdContextVersion = JsonLdContextVersion.none) {
	return createEntity<CourseSection>({ ...delegate, type: EntityType.CourseSection }, contextVersion);
}
