import { DEFAULT_CONFIG, getJsonLdContext } from '../../config/config';
import { ContextTermIri } from '../contextTermIri';

export enum Status {
	Active = 'Active',
	Inactive = 'Inactive'
}

export const StatusRecord: Readonly<Record<Status, Readonly<ContextTermIri>>> = {
	[Status.Active]: {
		context: getJsonLdContext(DEFAULT_CONFIG),
		term: 'Active',
		iri: 'http://purl.imsglobal.org/vocab/lis/v2/status#Active'
	},
	[Status.Inactive]: {
		context: getJsonLdContext(DEFAULT_CONFIG),
		term: 'Inactive',
		iri: 'http://purl.imsglobal.org/vocab/lis/v2/status#Deleted'
	}
};
