import { Entity } from '../entity';
import { EntityType } from '../entityType';

export class LearningObjective extends Entity {
	constructor(delegate?: Partial<LearningObjective>) {
		super(delegate);
		this.type = EntityType.learningObjective;
	}
}
