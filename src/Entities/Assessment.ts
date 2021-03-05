/** This file was Autogenerated */

import Caliper from './../Caliper';
import { ISystemIdentifier } from './../SystemIdentifier';
import { IAgent } from './Agent';
import { IAssignableDigitalResource } from './AssignableDigitalResource';
import { IDigitalResource } from './DigitalResource';
import { IEntity } from './Entity';
import { EntityType } from './EntityType';
import { ILearningObjective } from './LearningObjective';

export interface IAssessment extends IAssignableDigitalResource {
	id: string;
	items?: IDigitalResource[];
}

interface IAssessmentParams {
	id: string;
	items?: IDigitalResource[];
	dateToActivate?: string;
	dateToShow?: string;
	dateToStartOn?: string;
	dateToSubmit?: string;
	maxAttempts?: number;
	maxSubmits?: number;
	maxScore?: number;
	mediaType?: string;
	isPartOf?: IEntity;
	datePublished?: string;
	version?: string;
	name?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	otherIdentifiers?: ISystemIdentifier[];
	extensions?: Record<string, any>;
}

export function Assessment(params: IAssessmentParams): IAssessment {
	return {
		type: EntityType.Assessment,
		learningObjectives: [],
		keywords: [],
		creators: [],
		...params
	};
}
