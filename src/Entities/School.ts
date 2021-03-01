import Caliper from './../Caliper';
import { ISystemIdentifier } from './../SystemIdentifier';
import { IAgent } from './Agent';
import { EntityType } from './EntityType';
import { IOrganization } from './Organization';
import { Status } from './Status';

export interface ISchool extends IOrganization {
	id: string;
	status?: Status;
}

interface ISchoolParams {
	id: string;
	status?: Status;
	subOrganizationOf?: IOrganization;
	members?: IAgent[];
	name?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	otherIdentifiers?: ISystemIdentifier[];
	extensions?: Record<string, any>;
}

export function School(params: ISchoolParams): ISchool {
	return {
		type: EntityType.School,
		...params
	};
}