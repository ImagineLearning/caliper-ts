import { JsonLdContextVersion } from '../../config/config';
import '../../test/toEqualFixture';
import { createCourseOffering } from './courseOffering';
import { createCourseSection } from './courseSection';
import { createMembership } from './membership';
import { createOrganization } from './organization';
import { createPerson } from './person';
import { Role } from './role';
import { createSoftwareApplication } from './softwareApplication';
import { Status } from './status';

const versions = Object.values(JsonLdContextVersion).filter(val => val !== JsonLdContextVersion.none);

describe('Agent Entities', () => {
	versions.forEach(version => {
		describe(version, () => {
			it('person entity matches expected json', () => {
				const person = createPerson(
					{
						dateCreated: '2016-08-01T06:00:00.000Z',
						dateModified: '2016-09-02T11:30:00.000Z',
						id: 'https://example.edu/users/554433'
					},
					version
				);

				expect(person).toEqualFixture('caliperEntityPerson.json', version);
			});

			it('softwareApplication entity matches expected json', () => {
				const softwareApplication = createSoftwareApplication(
					{
						description: 'Automates assignment scoring.',
						id: 'https://example.edu/autograder',
						name: 'Auto Grader',
						version: '2.5.2'
					},
					version
				);

				expect(softwareApplication).toEqualFixture('caliperEntitySoftwareApplication.json', version);
			});

			it('organization entity matches expected json', () => {
				const organization = createOrganization(
					{
						id: 'https://example.edu/colleges/1/depts/1',
						name: 'Computer Science Department',
						subOrganizationOf: createOrganization(
							{ id: 'https://example.edu/colleges/1', name: 'College of Engineering' },
							JsonLdContextVersion.none
						)
					},
					version
				);

				expect(organization).toEqualFixture('caliperEntityOrganization.json', version);
			});

			it('courseOffering entity matches expected json', () => {
				const courseOffering = createCourseOffering(
					{
						id: 'https://example.edu/terms/201601/courses/7',
						academicSession: 'Fall 2016',
						courseNumber: 'CPS 435',
						dateCreated: '2016-08-01T06:00:00.000Z',
						dateModified: '2016-09-02T11:30:00.000Z',
						name: 'CPS 435 Learning Analytics'
					},
					version
				);

				expect(courseOffering).toEqualFixture('caliperEntityCourseOffering.json', version);
			});

			it('courseSection entity matches expected json', () => {
				const courseSection = createCourseSection(
					{
						id: 'https://example.edu/terms/201601/courses/7/sections/1',
						category: 'seminar',
						courseNumber: 'CPS 435-01',
						dateCreated: '2016-08-01T06:00:00.000Z',
						name: 'CPS 435 Learning Analytics, Section 01',
						academicSession: 'Fall 2016',
						subOrganizationOf: createCourseOffering(
							{
								courseNumber: 'CPS 435',
								id: 'https://example.edu/terms/201601/courses/7'
							},
							JsonLdContextVersion.none
						)
					},
					version
				);

				expect(courseSection).toEqualFixture('caliperEntityCourseSection.json', version);
			});

			it('membership entity matches expected json', () => {
				const membership = createMembership(
					{
						id: 'https://example.edu/terms/201601/courses/7/sections/1/rosters/1/members/554433',
						dateCreated: '2016-11-01T06:00:00.000Z',
						member: createPerson({ id: 'https://example.edu/users/554433' }),
						organization: createCourseSection({
							id: 'https://example.edu/terms/201601/courses/7/sections/1',
							subOrganizationOf: createCourseOffering(
								{ id: 'https://example.edu/terms/201601/courses/7' },
								JsonLdContextVersion.none
							)
						}),
						status: Status.Active,
						roles: [Role.Learner]
					},
					version
				);

				expect(membership).toEqualFixture('caliperEntityMembership.json', version);
			});
		});
	});
});
