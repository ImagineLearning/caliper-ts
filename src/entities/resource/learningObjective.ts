import { Entity } from '../entity';
import { EntityType } from '../entityType';

export type LearningObjective = {
	type: EntityType.learningObjective;
} & Entity;
