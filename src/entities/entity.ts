export interface Entity {
	'@context'?: string;
	id: string;
	type: string;
	name?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	extensions?: Record<string, string>;
}
