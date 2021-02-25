import Caliper from './../Caliper';
import { ISystemIdentifier } from './../SystemIdentifier';
import { IAgent } from './Agent';
import { ICourseOffering } from './CourseOffering';
import { EntityType } from './EntityType';
import { IOrganization } from './Organization';

export interface ICourseSection extends ICourseOffering {
	id: string;
	category?: string;
}

interface ICourseSectionParams {
	id: string;
	category?: string;
	courseNumber?: string;
	academicSession?: string;
	subOrganizationOf?: IOrganization;
	members?: IAgent[];
	name?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	otherIdentifiers?: ISystemIdentifier[];
	extensions?: Record<string, any>;
}

export function CourseSection(params: ICourseSectionParams): ICourseSection {
	return {
		type: EntityType.CourseSection,
		...params
	};
}
