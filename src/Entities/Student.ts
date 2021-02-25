import Caliper from './../Caliper';
import { ISystemIdentifier } from './../SystemIdentifier';
import { EntityType } from './EntityType';
import { IOrganization } from './Organization';
import { Role } from './Role';
import { Status } from './Status';
import { StudentProfileSettings } from './StudentProfileSettings';
import { IUser } from './User';

export interface IStudent extends IUser {
	id: string;
	gradeLevel?: number;
	settings?: StudentProfileSettings;
}

interface IStudentParams {
	id: string;
	gradeLevel?: number;
	settings?: StudentProfileSettings;
	roles?: Role[];
	status?: Status;
	organizations?: IOrganization[];
	name?: string;
	firstName?: string;
	lastName?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	otherIdentifiers?: ISystemIdentifier[];
	extensions?: Record<string, any>;
}

export function Student(params: IStudentParams): IStudent {
	return {
		type: EntityType.Student,
		...params
	};
}
