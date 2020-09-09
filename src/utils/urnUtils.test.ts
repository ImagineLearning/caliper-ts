import { getFormattedUrn, getFormattedUrnUUID } from './urnUtils';

describe('getFormattedUrn(..)', () => {
	const expected = 'urn:wne:guid_of_awesomeness';
	it('returns a properly formatted URN', () => {
		const urn = { nid: 'WNE', nss: 'GUID_OF_AWESOMENESS' };
		const actual = getFormattedUrn(urn);
		expect(actual).toBe(expected);
	});
});

describe('getFormattedUrnUUID(..)', () => {
	const expected = 'urn:uuid:guid_of_awesomeness';

	it('returns a properly formatted URN UUID', () => {
		const actual = getFormattedUrnUUID('GUID_OF_AWESOMENESS');
		expect(actual).toBe(expected);
	});
});
