import { getIdentifierTypeIri, IdentifierType } from './identifierType';

describe('getIdentifierTypeIri(..)', () => {
	it('returns properly formatted IRI', () => {
		const iri = getIdentifierTypeIri(IdentifierType.SystemId);
		expect(iri).toBe('http://purl.imsglobal.org/vocab/systemIdentifiers/SystemId');
	});
});
