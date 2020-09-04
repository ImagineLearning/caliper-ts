// import { EntityType } from '../entityType';
import { DigitalResourceCollection } from './digitalResourceCollection';
import { AssignableDigitalResource } from './AssignableDigitalResource';
import { Entity } from '../entity';
// import { LearningObjective } from './learningObjective';
// import { Agent } from '../agent/agent';
// import { DigitalResource } from './digitalResource';
import { DEFAULT_CONFIG } from '../../config/config';
import { EntityType } from '../entityType';

export type Assessment = {} & Entity & DigitalResourceCollection & AssignableDigitalResource;

export function createAssessment(delegate: Assessment): Assessment {
	return {
		...delegate,
		'@context': DEFAULT_CONFIG.jsonldContext.v1p1,
		type: EntityType.assessment
	} as Assessment;
}
