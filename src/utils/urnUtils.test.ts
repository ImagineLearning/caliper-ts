import { getFormattedUrn, getFormattedUrnUuid } from './urnUtils';
import { v4 } from 'uuid';

jest.mock('uuid', () => ({
	v4: jest.fn()
}));

describe('getFormattedUrn(..)', () => {
	const expected = 'urn:wne:guid_of_awesomeness';

	it('returns a properly formatted URN', () => {
		const urn = { nid: 'WNE', nss: 'GUID_OF_AWESOMENESS' };
		const actual = getFormattedUrn(urn);
		expect(actual).toBe(expected);
	});

	it('returns properly formatted URN given arrays for `nid` and `nss`', () => {
		const urn = getFormattedUrn({ nid: ['WNE', 'IL'], nss: ['GUID_OF_AWESOMENESS', 'ANOTHER_IDENTIFIER'] });
		expect(urn).toBe('urn:wne:il:guid_of_awesomeness:another_identifier');
	});
});

describe('getFormattedUrnUUID(..)', () => {
	const expected = 'urn:uuid:guid_of_awesomeness';

	beforeEach(() => {
		jest.resetAllMocks();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('returns a properly formatted URN UUID', () => {
		const actual = getFormattedUrnUuid('GUID_OF_AWESOMENESS');
		expect(actual).toBe(expected);
	});

	it('returns properly formatted URN UUID with generated UUID if none specified', () => {
		(v4 as jest.Mock).mockImplementation(() => 'GUID_OF_AWESOMENESS');
		const urn = getFormattedUrnUuid();
		expect(urn).toBe(expected);
	});
});
