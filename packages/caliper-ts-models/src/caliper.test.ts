import Caliper from './caliper';
import { EntityType } from './Entities/EntityType';

beforeAll(() => {
	Caliper.settings.applicationUri = 'https://unit.test';
});

describe('Caliper.guid', () => {
	it('Caliper.guid OK', () => {
		const value = Caliper.guid();
		expect(value).toMatch(/urn:uuid:\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
	});
});

describe('Caliper.edApp', () => {
	it('Caliper.edApp OK', () => {
		const model = {
			id: 'https://unit.test',
			type: EntityType.SoftwareApplication,
		};

		const value = Caliper.edApp();
		expect(value).toEqual(model);
	});
});

describe('Caliper.timestamp', () => {
	const isoDateRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

	it('Caliper.timestamp FromNow_OK', () => {
		const value = Caliper.timestamp();
		expect(value).toMatch(isoDateRegex);
	});

	it('Caliper.timestamp FromDate_OK', () => {
		const now = new Date();
		const value = Caliper.timestamp(now);
		expect(value).toMatch(isoDateRegex);
		expect(value).toEqual(now.toISOString());
	});
});

describe('Caliper.duration', () => {
	const expectedDuration = 'P0Y0M1DT14H58M0S';
	const durationRegex = /^P(?:\d+Y)?(?:\d+M)?(?:\d+D)?T?(?:\d+H)?(?:\d+M)?(?:\d+S)?/;

	it('returns the ISO8601 duration from two date objects', () => {
		const start = new Date('2020-07-20T02:56:00+0000');
		const end = new Date('2020-07-21T17:54:00+0000');

		const duration = Caliper.duration(start, end);
		expect(duration).toBe(expectedDuration);
		expect(duration).toMatch(durationRegex);
	});

	it('returns the ISO8601 duration from two string objects', () => {
		const start = '2000-07-20T02:56:00+0000';
		const end = '2000-07-21T17:54:00+0000';

		const duration = Caliper.duration(start, end);
		expect(duration).toBe(expectedDuration);
		expect(duration).toMatch(durationRegex);
	});
});
