// import { DEFAULT_CONFIG } from '../config/config';
import caliperEntityResponseExtended from '../../caliper-spec/fixtures/v1p1/caliperEntityResponseExtended.json';
import { createResponse } from './response';
import { createAttempt } from '../resource/attempt';
import { createAssessmentItem } from '../resource/assessmentItem';
import { JsonLdContextVersion } from '../../config/config';
import { EntityType } from '../entityType';

describe('Response Entities', () => {
	it('response entity matches expected json', () => {
		const response = createResponse({
			id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/6/users/554433/responses/1',
			startedAtTime: '2016-11-15T10:15:46.000Z',
			dateCreated: '2016-11-15T10:15:46.000Z',
			endedAtTime: '2016-11-15T10:17:20.000Z',
			attempt: createAttempt(
				{
					id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/6/users/554433/attempts/1',
					startedAtTime: '2016-11-15T10:15:46.000Z',
					assignee: 'https://example.edu/users/554433',
					count: 1,
					endedAtTime: '2016-11-15T10:17:20.000Z',
					assignable: createAssessmentItem({
						id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/6',
						dateCreated: '2016-08-01T06:00:00.000Z',
						datePublished: '2016-08-15T09:30:00.000Z',
						isTimeDependent: false,
						maxAttempts: 2,
						maxScore: 5,
						maxSubmits: 2,
						extensions: {
							questionText: 'Define a Caliper Event and provide examples.',
							questionType: 'Short Answer'
						},
						isPartOf: {
							id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1',
							type: EntityType.assessment
						}
					})
				},
				JsonLdContextVersion.none
			),
			extensions: {
				value:
					'A Caliper Event describes a relationship established between an actor and an object.  The relationship is formed as a result of a purposeful action undertaken by the actor in connection to the object at a particular moment. A learner starting an assessment, annotating a reading, pausing a video, or posting a message to a forum, are examples of learning activities that Caliper models as events.'
			}
		});

		expect(response).toEqual(caliperEntityResponseExtended);
	});
});
