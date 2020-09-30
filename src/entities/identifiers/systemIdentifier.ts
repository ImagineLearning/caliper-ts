import { SoftwareApplication } from '../agent/softwareApplication';
import { EntityType } from '../entityType';
import { IdentifierType } from './identifierType';

export type SystemIdentifier = {
	type: EntityType;
	identifierType: IdentifierType;
	identifier: string;
	source?: SoftwareApplication | string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	extensions?: Record<string, any>;
};

export type SystemIdentifierParams = Omit<SystemIdentifier, 'type'>;

export function createSystemIdentifier(delegate: SystemIdentifierParams) {
	return {
		...delegate,
		type: EntityType.SystemIdentifier
	} as SystemIdentifier;
}
