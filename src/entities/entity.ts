// import { v4 } from 'uuid';
import { EntityType } from './entityType';

export type Entity = {
	'@context'?: string;
	type?: EntityType;
	id: string;
	name?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	extensions?: Record<string, string>;
};
