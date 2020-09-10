import { getFormattedDateTime, getFormattedDuration } from './dateUtils';

describe('getFormattedDateTime(..)', () => {
	const dateStr = '2020-09-02T12:00:00.000Z';

	beforeEach(() => {
		jest.resetAllMocks();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('returns the current date/time formatted if no input specified', () => {
		jest.spyOn(Date, 'now').mockImplementation(() => Date.parse(dateStr));
		const date = getFormattedDateTime();
		expect(date).toBe(dateStr);
	});

	it('returns the specified date/time formatted', () => {
		const date = getFormattedDateTime(new Date(Date.parse(dateStr)));
		expect(date).toBe(dateStr);
	});

	it('returns the specified timestamp as formatted date/time', () => {
		const date = getFormattedDateTime(Date.parse(dateStr));
		expect(date).toBe(dateStr);
	});

	it('returns the specified string as formatted date/time', () => {
		const date = getFormattedDateTime(dateStr);
		expect(date).toBe(dateStr);
	});
});

describe('getFormattedDuration(..)', () => {
	const expectedDuration = 'P0Y0M1DT14H58M0S';

	it('returns the ISO8601 duration from two date objects', () => {
		const start = new Date('1969-07-20T02:56:00+0000');
		const end = new Date('1969-07-21T17:54:00+0000');

		const date = getFormattedDuration(start, end);
		expect(date).toBe(expectedDuration);
	});

	it('returns the ISO8601 duration from two string objects', () => {
		const start = '1969-07-20T02:56:00+0000';
		const end = '1969-07-21T17:54:00+0000';

		const date = getFormattedDuration(start, end);
		expect(date).toBe(expectedDuration);
	});
});
