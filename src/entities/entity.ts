export interface Entity {
	id: string;
	type: string;
	name?: string;
	description?: string;
	dateCreated?: string;
	dateModified?: string;
	extensions?: {};
}
