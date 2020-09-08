// // import { DEFAULT_CONFIG } from '../config/config';
// import caliperEntityResponseExtended from '../../caliperspec/fixtures/v1p1/caliperEntityResponseExtended.json';
// import { createResponse } from './response';
// import { createAttempt } from '../resource/attempt';

// describe('Response Entities', () => {
// 	it('response entity matches expected json', () => {
// 		const response = createResponse({
// 			id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/6/users/554433/responses/1',
// 			startedAtTime: '20161115T10:15:46.000Z',
// 			dateCreated: '20161115T10:15:46.000Z',
// 			endedAtTime: '20161115T10:17:20.000Z',
// 			attempt: createAttempt({
// 				id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/6/users/554433/attempts/1',
// 				dateCreated: '20160801T06:00:00.000Z',
// 				datePublished: '20160815T09:30:00.000Z',
// 				extensions: {
// 					questionText: 'Define a Caliper Event and provide examples.',
// 					questionType: 'Short Answer'
// 				},
// 				isPartOf: {
// 					id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1'
// 				},
// 				isTimeDependent: false,
// 				maxAttempts: 2,
// 				maxScore: 5,
// 				maxSubmits: 2
// 			}),
// 			extensions: {
// 				value:
// 					'A Caliper Event describes a relationship established between an actor and an object.  The relationship is formed as a result of a purposeful action undertaken by the actor in connection to the object at a particular moment. A learner starting an assessment, annotating a reading, pausing a video, or posting a message to a forum, are examples of learning activities that Caliper models as events.'
// 			}
// 		});

// 		expect(response).toEqual(caliperEntityResponseExtended);
// 	});
// });
