import { EntityType } from '../entityType';
import { CourseOffering } from './courseOffering';
import { JsonLdContextVersion, DEFAULT_CONFIG } from '../../config/config';
import { v4 } from 'uuid';

export type CourseSection = {
	courseNumber?: string;
	academicSession?: string;
	name?: string;
	description?: string;
	category?: string;
} & CourseOffering;

export function createCourseSection(
	delegate: Partial<CourseSection>,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): CourseSection {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': DEFAULT_CONFIG.jsonldContext[contextVersion],
		type: EntityType.courseSection
	} as CourseSection;
}
