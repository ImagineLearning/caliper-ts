import { JsonLdContextVersion } from '../../config/config';
import { createEntity } from '../entityFactory';
import { EntityType } from '../entityType';
import { Entity } from '../entity';

export type LearningObjective = Entity;

export type LearningObjectiveParams = Omit<LearningObjective, '@context' | 'type'>;

export function createLearningObjective(
	delegate: LearningObjectiveParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): LearningObjective {
	return createEntity<LearningObjective>({ ...delegate, type: EntityType.LearningObjective }, contextVersion);
}
