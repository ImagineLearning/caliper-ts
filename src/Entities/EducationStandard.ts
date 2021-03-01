import Caliper from './../Caliper';
import { ISystemIdentifier } from './../SystemIdentifier';
import { IEntity } from './Entity';
import { EntityType } from './EntityType';

export interface IEducationStandard extends IEntity {
	id: string;
}

interface IEducationStandardParams {
	id: string;
	name?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	otherIdentifiers?: ISystemIdentifier[];
	extensions?: Record<string, any>;
}

export function EducationStandard(params: IEducationStandardParams): IEducationStandard {
	return {
		type: EntityType.EducationStandard,
		...params
	};
}