import { EntityType } from '../entityType';
import { CourseOffering } from './courseOffering';

export type CourseSection = {
	courseNumber?: string;
	academicSession?: string;
	name?: string;
	description?: string;
	category?: string;
} & CourseOffering;

export function createCourseSection(delegate: CourseSection): CourseSection {
	return {
		...delegate,
		type: EntityType.courseSection
	} as CourseSection;
}
