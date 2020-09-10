import { EntityType } from './entityType';

export interface Entity {
	'@context'?: string;
	type: EntityType;
	id: string;
	name?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	extensions?: Record<string, string>;
}
