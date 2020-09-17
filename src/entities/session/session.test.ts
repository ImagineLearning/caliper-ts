import { JsonLdContextVersion } from '../../config/config';
import '../../test/toEqualFixture';
import { createPerson } from '../agent/person';
import { createLtiSession } from './ltiSession';
import { createSession } from './session';

const versions = Object.values(JsonLdContextVersion).filter(version => version !== JsonLdContextVersion.none);

describe('Session Entity', () => {
	versions.forEach(version => {
		describe(version, () => {
			it('createSession() creates session entity that matches caliper json', () => {
				const person = createPerson(
					{
						id: 'https://example.edu/users/554433'
					},
					JsonLdContextVersion.none
				);

				const session = createSession(
					{
						id: 'https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259',
						user: person,
						startedAtTime: '2016-09-15T10:00:00.000Z'
					},
					version
				);

				expect(session).toEqualFixture('caliperEntitySession.json', version);
			});

			it('createLtiSession() creates lti session entity that matches caliper json', () => {
				const session = createLtiSession(
					{
						id: 'https://example.edu/lti/sessions/b533eb02823f31024e6b7f53436c42fb99b31241',
						user: createPerson(
							{
								id: 'https://example.edu/users/554433'
							},
							JsonLdContextVersion.none
						),
						dateCreated: '2018-11-15T10:15:00.000Z',
						startedAtTime: '2018-11-15T10:15:00.000Z',
						messageParameters: {
							aud: ['https://example.com/lti/tool'],
							azp: '962fa4d8-bcbf-49a0-94b2-2de05ad274af',
							email: 'jane@example.edu',
							exp: 1510185728,
							family_name: 'Doe',
							given_name: 'Jane',
							'http://www.ExamplePlatformVendor.com/session': {
								id: '89023sj890dju080'
							},
							'https://purl.imsglobal.org/spec/lti/claim/context': {
								id: 'https://example.edu/terms/201801/courses/7/sections/1',
								label: 'CPS 435-01',
								title: 'CPS 435 Learning Analytics, Section 01',
								type: ['http://purl.imsglobal.org/vocab/lis/v2/course#CourseSection']
							},
							'https://purl.imsglobal.org/spec/lti/claim/custom': {
								request_url: 'https://tool.com/link/123',
								xstart: '2017-04-21T01:00:00Z'
							},
							'https://purl.imsglobal.org/spec/lti/claim/deployment_id': '07940580-b309-415e-a37c-914d387c1150',
							'https://purl.imsglobal.org/spec/lti/claim/launch_presentation': {
								document_target: 'iframe',
								height: 320,
								return_url: 'https://example.edu/terms/201801/courses/7/sections/1/pages/1',
								width: 240
							},
							'https://purl.imsglobal.org/spec/lti/claim/lis': {
								course_offering_sourcedid: 'example.edu:SI182-F18',
								course_section_sourcedid: 'example.edu:SI182-001-F18',
								person_sourcedid: 'example.edu:71ee7e42-f6d2-414a-80db-b69ac2defd4'
							},
							'https://purl.imsglobal.org/spec/lti/claim/message_type': 'LtiResourceLinkRequest',
							'https://purl.imsglobal.org/spec/lti/claim/resource_link': {
								description: 'Assignment to introduce who you are',
								id: '200d101f-2c14-434a-a0f3-57c2a42369fd',
								title: 'Introduction Assignment'
							},
							'https://purl.imsglobal.org/spec/lti/claim/role_scope_mentor': [
								'http://purl.imsglobal.org/vocab/lis/v2/institution/person#Administrator'
							],
							'https://purl.imsglobal.org/spec/lti/claim/roles': [
								'http://purl.imsglobal.org/vocab/lis/v2/institution/person#Student',
								'http://purl.imsglobal.org/vocab/lis/v2/membership#Learner',
								'http://purl.imsglobal.org/vocab/lis/v2/membership#Mentor'
							],
							'https://purl.imsglobal.org/spec/lti/claim/tool_platform': {
								contact_email: 'support@example.edu',
								description: 'An Example Tool Platform',
								guid: 'https://example.edu',
								name: 'Example Tool Platform',
								product_family_code: 'ExamplePlatformVendor-Product',
								url: 'https://example.edu',
								version: '1.0'
							},
							'https://purl.imsglobal.org/spec/lti/claim/version': '1.3.0',
							iat: 1510185228,
							iss: 'https://example.edu',
							locale: 'en-US',
							middle_name: 'Marie',
							name: 'Ms Jane Marie Doe',
							nonce: 'fc5fdc6d-5dd6-47f4-b2c9-5d1216e9b771',
							picture: 'https://example.edu/jane.jpg',
							sub: 'https://example.edu/users/554433'
						}
					},
					version
				);

				expect(session).toEqualFixture('caliperEntityLtiSession.json', version);
			});
		});
	});
});
