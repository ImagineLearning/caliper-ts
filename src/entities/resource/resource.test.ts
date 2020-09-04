// // import { DEFAULT_CONFIG } from '../config/config';
// import { createSession } from './session';
// import caliperEntitySession from '../../caliper-spec/fixtures/v1p1/caliperEntitySession.json';
// import { createPerson } from '../agent/person';

// describe('createAssessment()', () => {
// 	it('creates assessment entity that matches caliper json', () => {
// 		const person = createPerson({
// 			id: 'https://example.edu/users/554433'
// 		});

// 		const entity = createSession({
// 			id: 'https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259',
// 			user: person,
// 			startedAtTime: '2016-09-15T10:00:00.000Z'
// 		});

// 		const expected = caliperEntitySession;
// 		const actual = entity;
// 		expect(actual).toEqual(expected);
// 	});

// 	// it('assessment entity matches expected session json', () => {
// 	// 	const assessment = new Assessment({
// 	// 		dateCreated: '2016-08-01T06:00:00.000Z',
// 	// 		dateModified: '2016-09-02T11:30:00.000Z',
// 	// 		datePublished: '2016-08-15T09:30:00.000Z',
// 	// 		dateToActivate: '2016-08-16T05:00:00.000Z',
// 	// 		dateToShow: '2016-08-16T05:00:00.000Z',
// 	// 		dateToStartOn: '2016-08-16T05:00:00.000Z',
// 	// 		dateToSubmit: '2016-09-28T11:59:59.000Z',
// 	// 		id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1',
// 	// 		items: [
// 	// 			new AssessmentItem({ id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/1' }),
// 	// 			new AssessmentItem({ id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/2' }),
// 	// 			new AssessmentItem({ id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3' })
// 	// 		],
// 	// 		maxAttempts: 2,
// 	// 		maxScore: 15,
// 	// 		maxSubmits: 2,
// 	// 		name: 'Quiz One',
// 	// 		version: '1.0'
// 	// 	});

// 	// 	const expected = caliperEntityAssessment;
// 	// 	const actual = assessment;
// 	// 	console.log(actual);

// 	// 	expect(actual).toEqual(expected);
// 	// });
// });
