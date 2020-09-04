// import { DEFAULT_CONFIG } from '../config/config';
import caliperEntityAssessment from '../../caliper-spec/fixtures/v1p1/caliperEntityAssessment.json';
import caliperEntityAssignableDigitalResource from '../../caliper-spec/fixtures/v1p1/caliperEntityAssignableDigitalResource.json';
import caliperEntityLearningObjective from '../../caliper-spec/fixtures/v1p1/caliperEntityLearningObjective.json';
// import caliperEntityDigitalResource from '../../caliper-spec/fixtures/v1p1/caliperEntityDigitalResource.json';

import { createAssessment } from './assessment';
import { createAssessmentItem } from './assessmentItem';
import { createAssignableDigitalResource } from './AssignableDigitalResource';
import { createLearningObjective } from './learningObjective';
// import { createDigitalResource } from './digitalResource';
// import { createPerson } from '../agent/person';

describe('Resource Entities', () => {
	it('createAssessment() creates assessment entity that matches expected json', () => {
		const assessment = createAssessment({
			dateCreated: '2016-08-01T06:00:00.000Z',
			dateModified: '2016-09-02T11:30:00.000Z',
			datePublished: '2016-08-15T09:30:00.000Z',
			dateToActivate: '2016-08-16T05:00:00.000Z',
			dateToShow: '2016-08-16T05:00:00.000Z',
			dateToStartOn: '2016-08-16T05:00:00.000Z',
			dateToSubmit: '2016-09-28T11:59:59.000Z',
			id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1',
			items: [
				createAssessmentItem({ id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/1' }),
				createAssessmentItem({ id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/2' }),
				createAssessmentItem({ id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3' })
			],
			maxAttempts: 2,
			maxScore: 15,
			maxSubmits: 2,
			name: 'Quiz One',
			version: '1.0'
		});

		expect(assessment).toEqual(caliperEntityAssessment);
	});

	it('createAssignableDigitalResource() creates assignable digital resource entity that matches expected json', () => {
		const assignableDigitalResource = createAssignableDigitalResource({
			dateCreated: '2016-11-01T06:00:00.000Z',
			dateToActivate: '2016-11-10T11:59:59.000Z',
			dateToShow: '2016-11-10T11:59:59.000Z',
			dateToStartOn: '2016-11-10T11:59:59.000Z',
			dateToSubmit: '2016-11-14T11:59:59.000Z',
			description: "3-5 page reflection on this week's assigned readings.",
			id: 'https://example.edu/terms/201601/courses/7/sections/1/assign/2',
			maxAttempts: 2,
			maxScore: 50,
			maxSubmits: 2,
			name: 'Week 9 Reflection'
		});

		expect(assignableDigitalResource).toEqual(caliperEntityAssignableDigitalResource);
	});

	it('createLearningObjective() creates learning objective resource entity that matches expected json', () => {
		const assignableDigitalResource = createAssignableDigitalResource({
			dateCreated: '2016-11-01T06:00:00.000Z',
			dateToActivate: '2016-11-10T11:59:59.000Z',
			dateToShow: '2016-11-10T11:59:59.000Z',
			dateToStartOn: '2016-11-15T11:59:59.000Z',
			dateToSubmit: '2016-11-14T11:59:59.000Z',
			description: 'Choose a learning activity and describe the actions, entities and events that comprise it.',
			id: 'https://example.edu/terms/201601/courses/7/sections/1/assign/2',
			maxAttempts: 2,
			maxScore: 50,
			maxSubmits: 2,
			name: 'Caliper Profile Design',
			learningObjectives: [
				createLearningObjective({
					dateCreated: '2016-08-01T06:00:00.000Z',
					description: 'Demonstrate ability to model a learning activity as a Caliper profile.',
					id: 'https://example.edu/terms/201601/courses/7/sections/1/objectives/1',
					name: 'Research techniques'
				})
			]
		});

		expect(assignableDigitalResource).toEqual(caliperEntityLearningObjective);
	});

	// it('createDigitalResource() creates digital resource entity that matches expected json', () => {
	// 	const digitalResource = createDigitalResource({
	// 		dateCreated: '2016-08-02T11:32:00.000Z',
	// 		id: 'https://example.edu/terms/201601/courses/7/sections/1/resources/1/syllabus.pdf',
	// 		creators: [createPerson({ id: 'https://example.edu/users/223344' })],
	// 		mediaType: 'application/pdf',
	// 		name: 'Course Syllabus',
	// 		isPartOf:
	// 	});

	// 	expect(digitalResource).toEqual(caliperEntityDigitalResource);
	// });
});
