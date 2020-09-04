import { Entity } from '../entity';
import { EntityType } from '../entityType';
import { JsonLdContextVersion, DEFAULT_CONFIG } from '../../config/config';
import { v4 } from 'uuid';

export type LearningObjective = {} & Entity;

export function createLearningObjective(
	delegate: Partial<LearningObjective>,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): LearningObjective {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': DEFAULT_CONFIG.jsonldContext[contextVersion],
		type: EntityType.learningObjective
	} as LearningObjective;
}
