import { v4 } from 'uuid';
import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';
import { Organization } from './organization';

export type CourseOffering = {
	courseNumber?: string;
	academicSession?: string;
} & Organization;

export type CourseOfferingParams = Omit<Partial<CourseOffering>, '@context' | 'type'>;

export function createCourseOffering(
	delegate: CourseOfferingParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): CourseOffering {
	return {
		...delegate,
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		id: delegate.id ?? v4(),
		type: EntityType.courseOffering
	} as CourseOffering;
}
