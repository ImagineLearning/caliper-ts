import { JsonLdContextVersion } from '../../config/config';
import '../../test/toEqualFixture';
import { createPerson } from '../agent/person';
import { EntityType } from '../entityType';
import { createAssessment } from '../resource/assessment';
import { createAssessmentItem } from '../resource/assessmentItem';
import { createAttempt } from '../resource/attempt';
import { createFillinBlankResponse } from './fillinBlankResponse';
import { createMultipleChoiceResponse } from './multipleChoiceResponse';
import { createMultipleResponseResponse } from './multipleResponseResponse';
import { createResponse } from './response';
import { createSelectTextResponse } from './selectTextResponse';
import { createTrueFalseResponse } from './trueFalseResponse';

const versions = Object.values(JsonLdContextVersion).filter(version => version !== JsonLdContextVersion.none);

describe('Response Entities', () => {
	versions.forEach(version => {
		describe(version, () => {
			it('response entity matches expected json', () => {
				const response = createResponse(
					{
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
										type: EntityType.Assessment
									}
								})
							},
							JsonLdContextVersion.none
						),
						extensions: {
							value:
								'A Caliper Event describes a relationship established between an actor and an object.  The relationship is formed as a result of a purposeful action undertaken by the actor in connection to the object at a particular moment. A learner starting an assessment, annotating a reading, pausing a video, or posting a message to a forum, are examples of learning activities that Caliper models as events.'
						}
					},
					false,
					version
				);

				expect(response).toEqualFixture('caliperEntityResponseExtended.json', version);
			});

			it('multipleChoiceResponse entity matches expected json', () => {
				const multipleChoiceResponse = createMultipleChoiceResponse(
					{
						id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/2/users/554433/responses/1',
						attempt: createAttempt(
							{
								id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/2/users/554433/attempts/1',
								startedAtTime: '2016-11-15T10:15:14.000Z',
								endedAtTime: '2016-11-15T10:15:20.000Z',
								count: 1,
								assignable: createAssessmentItem(
									{
										id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/2',
										isPartOf: createAssessment(
											{ id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1' },
											JsonLdContextVersion.none
										)
									},
									JsonLdContextVersion.none
								),
								assignee: createPerson({ id: 'https://example.edu/users/554433' })
							},
							JsonLdContextVersion.none
						),
						dateCreated: '2016-11-15T10:15:20.000Z',
						endedAtTime: '2016-11-15T10:15:20.000Z',
						startedAtTime: '2016-11-15T10:15:14.000Z',
						value: 'C'
					},
					false,
					version
				);
				expect(multipleChoiceResponse).toEqualFixture('caliperEntityMultipleChoiceResponse.json', version);
			});

			it('fillinblankresponse entity matches expected json', () => {
				const fillinblankresponse = createFillinBlankResponse(
					{
						id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/1/users/554433/responses/1',
						attempt: createAttempt(
							{
								endedAtTime: '2016-11-15T10:15:12.000Z',
								id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/1/users/554433/attempts/1',
								startedAtTime: '2016-11-15T10:15:02.000Z',
								count: 1,
								assignable: createAssessmentItem(
									{
										id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/1',
										isPartOf: createAssessment(
											{ id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1' },
											JsonLdContextVersion.none
										)
									},
									JsonLdContextVersion.none
								),
								assignee: createPerson({ id: 'https://example.edu/users/554433' })
							},
							JsonLdContextVersion.none
						),
						dateCreated: '2016-11-15T10:15:12.000Z',
						endedAtTime: '2016-11-15T10:15:12.000Z',

						startedAtTime: '2016-11-15T10:15:02.000Z',
						values: ['data interoperability', 'semantic interoperability']
					},
					false,
					version
				);
				expect(fillinblankresponse).toEqualFixture('caliperEntityFillinBlankResponse.json', version);
			});

			it('multipleResponseResponse entity matches expected json', () => {
				const multipleResponseResponse = createMultipleResponseResponse(
					{
						id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3/users/554433/responses/1',
						attempt: createAttempt(
							{
								id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3/users/554433/attempts/1',
								endedAtTime: '2016-11-15T10:15:30.000Z',
								startedAtTime: '2016-11-15T10:15:22.000Z',
								count: 1,
								assignable: createAssessmentItem(
									{
										id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3',
										isPartOf: createAssessment(
											{ id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1' },
											JsonLdContextVersion.none
										)
									},
									JsonLdContextVersion.none
								),
								assignee: createPerson({ id: 'https://example.edu/users/554433' })
							},
							JsonLdContextVersion.none
						),
						dateCreated: '2016-11-15T10:15:22.000Z',
						endedAtTime: '2016-11-15T10:15:30.000Z',
						startedAtTime: '2016-11-15T10:15:22.000Z',
						values: ['D', 'A', 'E']
					},
					false,
					version
				);
				expect(multipleResponseResponse).toEqualFixture('caliperEntityMultipleResponseResponse.json', version);
			});

			it('selectTextResponse entity matches expected json', () => {
				const selectTextResponse = createSelectTextResponse(
					{
						id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/4/users/554433/responses/1',
						attempt: createAttempt(
							{
								id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/4/users/554433/attempts/1',
								endedAtTime: '2016-11-15T10:15:38.000Z',
								startedAtTime: '2016-11-15T10:15:32.000Z',
								count: 1,
								assignable: createAssessmentItem(
									{
										id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/4',
										isPartOf: createAssessment(
											{ id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1' },
											JsonLdContextVersion.none
										)
									},
									JsonLdContextVersion.none
								),
								assignee: createPerson({ id: 'https://example.edu/users/554433' })
							},
							JsonLdContextVersion.none
						),
						dateCreated: '2016-11-15T10:15:32.000Z',
						endedAtTime: '2016-11-15T10:15:38.000Z',

						startedAtTime: '2016-11-15T10:15:32.000Z',
						values: ['Information Model', 'Sensor API', 'Profiles']
					},
					false,
					version
				);
				expect(selectTextResponse).toEqualFixture('caliperEntitySelectTextResponse.json', version);
			});

			it('trueFalseResponse entity matches expected json', () => {
				const trueFalseResponse = createTrueFalseResponse(
					{
						id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/5/users/554433/responses/1',
						attempt: createAttempt(
							{
								endedAtTime: '2016-11-15T10:15:45.000Z',
								id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/5/users/554433/attempts/1',
								startedAtTime: '2016-11-15T10:15:40.000Z',
								count: 1,
								assignable: createAssessmentItem(
									{
										id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/5',
										isPartOf: createAssessment(
											{ id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1' },
											JsonLdContextVersion.none
										)
									},
									JsonLdContextVersion.none
								),
								assignee: createPerson({ id: 'https://example.edu/users/554433' })
							},
							JsonLdContextVersion.none
						),
						dateCreated: '2016-11-15T10:15:45.000Z',
						endedAtTime: '2016-11-15T10:15:45.000Z',
						startedAtTime: '2016-11-15T10:15:40.000Z',
						value: 'true'
					},
					false,
					version
				);
				expect(trueFalseResponse).toEqualFixture('caliperEntityTrueFalseResponse.json', version);
			});
		});
	});
});
