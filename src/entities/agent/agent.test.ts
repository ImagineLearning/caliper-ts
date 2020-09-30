import { JsonLdContextVersion } from '../../config/config';
import '../../test/toEqualFixture';
import { EntityType } from '../entityType';
import { IdentifierType } from '../identifiers/identifierType';
import { createSystemIdentifier } from '../identifiers/systemIdentifier';
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
						id: 'https://example.edu/users/554433',
						otherIdentifiers:
							version === JsonLdContextVersion.v1p2
								? [
										createSystemIdentifier({
											identifier: 'example.edu:71ee7e42-f6d2-414a-80db-b69ac2defd4',
											identifierType: IdentifierType.LisSourcedId
										}),
										createSystemIdentifier({
											identifier: 'https://example.edu/users/554433',
											identifierType: IdentifierType.LtiUserId,
											source: createSoftwareApplication({ id: 'https://example.edu' }, JsonLdContextVersion.none)
										}),
										createSystemIdentifier({
											identifier: 'jane@example.edu',
											identifierType: IdentifierType.EmailAddress,
											source: 'https://example.edu'
										}),
										createSystemIdentifier({
											identifier: '4567',
											identifierType: IdentifierType.SystemId,
											extensions: {
												'com.examplePlatformVendor.identifier_type': 'UserIdentifier'
											}
										})
								  ]
								: undefined
					},
					version
				);

				expect(person).toEqualEntityFixture(EntityType.Person, version);
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

				expect(softwareApplication).toEqualEntityFixture(EntityType.SoftwareApplication, version);
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

				expect(organization).toEqualEntityFixture(EntityType.Organization, version);
			});

			it('courseOffering entity matches expected json', () => {
				const courseOffering = createCourseOffering(
					{
						id: 'https://example.edu/terms/201601/courses/7',
						academicSession: 'Fall 2016',
						courseNumber: 'CPS 435',
						dateCreated: '2016-08-01T06:00:00.000Z',
						dateModified: '2016-09-02T11:30:00.000Z',
						name: 'CPS 435 Learning Analytics',
						otherIdentifiers: [
							createSystemIdentifier({
								identifier: 'example.edu:SI182-F16',
								identifierType: IdentifierType.LisSourcedId
							})
						]
					},
					version
				);

				expect(courseOffering).toEqualEntityFixture(EntityType.CourseOffering, version);
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
						),
						otherIdentifiers: [
							createSystemIdentifier({
								identifier: 'example.edu:SI182-001-F16',
								identifierType: IdentifierType.LisSourcedId
							})
						]
					},
					version
				);

				expect(courseSection).toEqualEntityFixture(EntityType.CourseSection, version);
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

				expect(membership).toEqualEntityFixture(EntityType.Membership, version);
			});
		});
	});
});
