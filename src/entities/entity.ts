import { v4 } from 'uuid';
import { EntityType } from './entityType';

export abstract class Entity {
	'@context'?: string;
	dateCreated?: string;
	dateModified?: string;
	description?: string;
	extensions?: Record<string, string>;
	id: string;
	name?: string;
	protected type = EntityType.entity;

	constructor(entity?: Partial<Entity>) {
		Object.keys(entity || {}).forEach(key => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(this as any)[key] = (entity as any)[key];
		});
		this.id = entity?.id ?? v4();
	}
}
