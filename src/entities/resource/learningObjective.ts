import { DEFAULT_CONFIG, getJsonLdContext, JsonLdContextVersion } from '../../config/config';
import { Entity } from '../entity';
import { EntityType } from '../entityType';

export type LearningObjective = {} & Entity;

export type LearningObjectiveParams = Omit<LearningObjective, '@context' | 'type'>;

export function createLearningObjective(
	delegate: LearningObjectiveParams,
	contextVersion: JsonLdContextVersion = JsonLdContextVersion.v1p1
): LearningObjective {
	return {
		'@context': getJsonLdContext(DEFAULT_CONFIG, contextVersion),
		type: EntityType.learningObjective,
		...delegate
	} as LearningObjective;
}
