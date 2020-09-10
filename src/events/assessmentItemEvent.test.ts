import caliperEventAssessmentItemStarted from '../caliper-spec/fixtures/v1p1/caliperEventAssessmentItemStarted.json';

import { getFormattedUrnUuid } from '../utils/urnUtils';
import { Action } from '../actions/actions';
import { createPerson } from '../entities/agent/person';
import { createSoftwareApplication } from '../entities/agent/softwareApplication';
import { getFormattedDateTime } from '../utils/dateUtils';
import { createAttempt } from '../entities/resource/attempt';
import { createCourseSection } from '../entities/agent/courseSection';
import { createMembership } from '../entities/agent/membership';
import { Role } from '../entities/agent/role';
import { Status } from '../entities/agent/status';
import { createSession } from '../entities/session/session';
import { createAssessmentItemEvent } from './assessmentItemEvent';
import { JsonLdContextVersion } from '../config/config';
import { createAssessmentItem } from '../entities/resource/assessmentItem';
import { createAssessment } from '../entities/resource/assessment';

describe('Assessment Item Events', () => {
	it('assessmentItemEvent started matches expected json', () => {
		const assessmentItemEvent = createAssessmentItemEvent({
			id: getFormattedUrnUuid('1b557176-ba67-4624-b060-6bee670a3d8e'),
			actor: createPerson({ id: 'https://example.edu/users/554433' }),
			action: Action.Started,
			object: createAssessmentItem({
				id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3',
				dateToStartOn: '2016-11-14T05:00:00.000Z',
				dateToSubmit: '2016-11-18T11:59:59.000Z',
				name: 'Assessment Item 3',
				maxAttempts: 2,
				maxSubmits: 2,
				maxScore: 1,
				version: '1.0',
				isTimeDependent: false,
				isPartOf: createAssessment(
					{
						id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1'
					},
					JsonLdContextVersion.none
				)
			}),
			edApp: createSoftwareApplication({ id: 'https://example.edu', version: 'v2' }),
			eventTime: getFormattedDateTime('2016-11-15T10:15:00.000Z'),
			generated: createAttempt(
				{
					id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3/users/554433/attempts/1',
					assignable: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/items/3',
					assignee: 'https://example.edu/users/554433',
					count: 1,
					dateCreated: getFormattedDateTime('2016-11-15T10:15:00.000Z'),
					startedAtTime: '2016-11-15T10:15:00.000Z',
					isPartOf: createAttempt(
						{
							id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/users/554433/attempts/1'
						},
						JsonLdContextVersion.none
					)
				},
				JsonLdContextVersion.none
			),
			group: createCourseSection({
				academicSession: 'Fall 2016',
				courseNumber: 'CPS 435-01',
				id: 'https://example.edu/terms/201601/courses/7/sections/1'
			}),
			membership: createMembership(
				{
					dateCreated: '2016-08-01T06:00:00.000Z',
					id: 'https://example.edu/terms/201601/courses/7/sections/1/rosters/1',
					member: 'https://example.edu/users/554433',
					organization: 'https://example.edu/terms/201601/courses/7/sections/1',
					roles: [Role.Learner],
					status: Status.Active
				},
				JsonLdContextVersion.none
			),
			session: createSession(
				{
					id: 'https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259',
					startedAtTime: '2016-11-15T10:00:00.000Z'
				},
				JsonLdContextVersion.none
			)
		});

		expect(assessmentItemEvent).toEqual(caliperEventAssessmentItemStarted);
	});
});
