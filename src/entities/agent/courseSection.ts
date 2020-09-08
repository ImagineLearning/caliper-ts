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

export type CourseSectionParams = Omit<CourseSection, '@context' | 'type'>;

export function createCourseSection(
	delegate: CourseSectionParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): CourseSection {
	return {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.CourseSection,
		...delegate
	} as CourseSection;
}
