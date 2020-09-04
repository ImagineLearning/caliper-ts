import { Entity } from '../entity';
import { EntityType } from '../entityType';

export type LearningObjective = {} & Entity;

export function createLearningObjective(delegate: LearningObjective): LearningObjective {
	return {
		...delegate,
		type: EntityType.learningObjective
	} as LearningObjective;
}
