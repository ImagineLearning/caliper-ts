/** This file was Autogenerated */

import Caliper from './../Caliper';
import { ISystemIdentifier } from './../SystemIdentifier';
import { EntityType } from './EntityType';
import { IInstructor } from './Instructor';
import { IPerson } from './Person';
import { ISession } from './Session';
import { IStudent } from './Student';
import { IUser } from './User';

export interface ILtiSession extends ISession {
	id: string;
	messageParameters?: Record<string, any>;
	user?: IPerson | IUser | IInstructor | IStudent;
}

interface ILtiSessionParams {
	id: string;
	messageParameters?: Record<string, any>;
	user?: IPerson | IUser | IInstructor | IStudent;
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

export function LtiSession(params: ILtiSessionParams): ILtiSession {
	return {
		type: EntityType.LtiSession,
		...params
	};
}
