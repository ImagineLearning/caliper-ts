import { EntityType } from './entityType';

export interface Entity {
	'@context'?: string;
	type: EntityType;
	id: string;
	name?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	extensions?: Record<string, any>;
}
