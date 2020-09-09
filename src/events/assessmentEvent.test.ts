import caliperEventAssessmentStarted from '../caliper-spec/fixtures/v1p1/caliperEventAssessmentStarted.json';

import { getFormattedUrnUUID } from '../utils/urnUtils';
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
import { JsonLdContextVersion } from '../config/config';
import { createAssessment } from '../entities/resource/assessment';
import { createAssessmentEvent } from './assessmentEvent';

describe('Assessment Events', () => {
	it('assessmentItem started matches expected json', () => {
		const assessmentEvent = createAssessmentEvent({
			id: getFormattedUrnUUID('27734504-068d-4596-861c-2315be33a2a2'),
			actor: createPerson({ id: 'https://example.edu/users/554433' }),
			action: Action.Started,
			object: createAssessment(
				{
					id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1',
					dateToStartOn: '2016-11-14T05:00:00.000Z',
					dateToSubmit: '2016-11-18T11:59:59.000Z',
					name: 'Quiz One',
					maxAttempts: 2,
					maxSubmits: 2,
					maxScore: 25,
					version: '1.0'
				},
				JsonLdContextVersion.none
			),
			edApp: createSoftwareApplication({ id: 'https://example.edu', version: 'v2' }),
			eventTime: getFormattedDateTime('2016-11-15T10:15:00.000Z'),
			generated: createAttempt(
				{
					id: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1/users/554433/attempts/1',
					assignable: 'https://example.edu/terms/201601/courses/7/sections/1/assess/1',
					assignee: 'https://example.edu/users/554433',
					count: 1,
					dateCreated: getFormattedDateTime('2016-11-15T10:15:00.000Z'),
					startedAtTime: '2016-11-15T10:15:00.000Z'
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

		expect(assessmentEvent).toEqual(caliperEventAssessmentStarted);
	});
});
