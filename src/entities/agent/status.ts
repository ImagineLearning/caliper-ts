import { getJsonLdContext, DEFAULT_CONFIG, JsonLdContextVersion } from '../../config/config';
import { ContextTermIri } from '../contextTermIri';

export enum Status {
	Active = 'Active',
	Inactive = 'Inactive'
}

export const StatusRecord: Readonly<Record<Status, Readonly<ContextTermIri>>> = {
	[Status.Active]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Active',
		iri: 'http://purl.imsglobal.org/vocab/lis/v2/status#Active'
	},
	[Status.Inactive]: {
		context: getJsonLdContext(DEFAULT_CONFIG, JsonLdContextVersion.v1p1),
		term: 'Inactive',
		iri: 'http://purl.imsglobal.org/vocab/lis/v2/status#Deleted'
	}
};
