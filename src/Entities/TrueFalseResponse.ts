/** This file was Autogenerated */

import Caliper from './../Caliper';
import { ISystemIdentifier } from './../SystemIdentifier';
import { IAttempt } from './Attempt';
import { EntityType } from './EntityType';
import { IResponse } from './Response';

export interface ITrueFalseResponse extends IResponse {
	id: string;
	value?: Boolean;
}

interface ITrueFalseResponseParams {
	id: string;
	value?: Boolean;
	attempt?: IAttempt;
	startedAtTime?: string;
	endedAtTime?: string;
	duration?: string;
	name?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	otherIdentifiers?: ISystemIdentifier[];
	extensions?: Record<string, any>;
}

export function TrueFalseResponse(params: ITrueFalseResponseParams): ITrueFalseResponse {
	return {
		type: EntityType.TrueFalseResponse,
		value: false,
		...params
	};
}
