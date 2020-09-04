import { v4 } from 'uuid';
import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { CourseOffering } from './courseOffering';

export type CourseSection = {
	courseNumber?: string;
	academicSession?: string;
	name?: string;
	description?: string;
	category?: string;
} & CourseOffering;

export type CourseSectionParams = Omit<Partial<CourseSection>, '@context' | 'type'>;

export function createCourseSection(
	delegate: CourseSectionParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): CourseSection {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.courseSection
	} as CourseSection;
}
