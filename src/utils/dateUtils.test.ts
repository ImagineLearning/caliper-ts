import { getFormattedDateTime } from './dateUtils';

describe('getFormattedDateTime(..)', () => {
	let dateStr = '2020-09-02T12:00:00.000Z';

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
});
