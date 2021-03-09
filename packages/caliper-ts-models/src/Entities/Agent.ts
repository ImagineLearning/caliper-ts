/** This file was Autogenerated */

import { ISystemIdentifier } from '../SystemIdentifier';
import { IEntity } from './Entity';
import { EntityType } from './EntityType';

export interface IAgent extends IEntity {
	id: string;
}

export interface IAgentParams {
	id: string;
	name?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	otherIdentifiers?: ISystemIdentifier[];
	extensions?: Record<string, any>;
}

export function Agent(params: IAgentParams): IAgent {
	return {
		type: EntityType.Agent,
		...params,
	};
}