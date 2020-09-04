import { EntityType } from '../entityType';
import { Organization } from './organization';

export type CourseOffering = {
	courseNumber?: string;
	academicSession?: string;
} & Organization;

export function createCourseOffering(delegate: CourseOffering): CourseOffering {
	return {
		...delegate,
		type: EntityType.courseOffering
	} as CourseOffering;
}
