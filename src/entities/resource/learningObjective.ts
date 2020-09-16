import { JsonLdContextVersion } from '../../config/config';
import { Entity } from '../entity';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';

export type LearningObjective = Entity;

export type LearningObjectiveParams = Omit<LearningObjective, '@context' | 'type'>;

export function createLearningObjective(delegate: LearningObjectiveParams, contextVersion?: JsonLdContextVersion): LearningObjective {
	return createEntity<LearningObjective>({ ...delegate, type: EntityType.LearningObjective }, contextVersion);
}
