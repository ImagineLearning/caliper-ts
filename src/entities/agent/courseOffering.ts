import { EntityType } from '../entityType';
import { Organization } from './organization';
import { DEFAULT_CONFIG, JsonLdContextVersion } from '../../config/config';
import { v4 } from 'uuid';

export type CourseOffering = {
	courseNumber?: string;
	academicSession?: string;
} & Organization;

export function createCourseOffering(
	delegate: Partial<CourseOffering>,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): CourseOffering {
	return {
		...delegate,
		'@context': DEFAULT_CONFIG.jsonldContext[contextVersion],
		id: delegate.id ?? v4(),
		type: EntityType.courseOffering
	} as CourseOffering;
}
