import { v4 } from 'uuid';
import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { Entity } from '../entity';
import { EntityType } from '../entityType';

export type LearningObjective = {} & Entity;

export type LearningObjectiveParams = Omit<Partial<LearningObjective>, '@context' | 'type'>;

export function createLearningObjective(
	delegate: LearningObjectiveParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): LearningObjective {
	return {
		...delegate,
		id: delegate.id ?? v4(),
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.learningObjective
	} as LearningObjective;
}
