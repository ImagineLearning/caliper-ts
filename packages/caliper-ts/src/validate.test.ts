import {
	Caliper,
	Instructor,
	Organization,
	OrganizationActivatedEvent,
	Status,
	SystemIdentifier,
	SystemIdentifierType,
	User,
	UserCreatedEvent,
	UserEvent_Student,
} from '@imaginelearning/caliper-ts-objects';
import { validate } from './validate';

describe('validate(..)', () => {
	beforeEach(() => {
		Caliper.settings.applicationUri = 'https://unit.test';
	});

	afterEach(() => {
		Caliper.settings.applicationUri = null;
	});

	it('passes for valid UserCreatedEvent', () => {
		const timestamp = Caliper.timestamp(new Date());
		const event = UserCreatedEvent({
			actor: Instructor({ id: 'https://foo.bar/user/1' }),
			object: UserEvent_Student({
				id: 'https://foo.bar/user/9999',
				dateCreated: timestamp,
				dateModified: timestamp,
				firstName: 'Marc',
				lastName: 'Lim',
				status: Status.Active,
				gradeLevel: 1,
				englishLanguageLearner: true,
				individualEducationPlan: true,
				otherIdentifiers: [
					SystemIdentifier({
						sourceUrl: 'https://nwea.org',
						identifier: 'https://nwea.org/fake-user/8c9a5212-c91c-4904-a3e6-ba98aa7d640f',
						identifierType: SystemIdentifierType.SystemId,
					}),
					SystemIdentifier({
						sourceUrl: 'https://whatever.com/external',
						identifier: '8ece0ac2-b4cd-4e66-ae26-a59cec4edad7',
						identifierType: SystemIdentifierType.SystemId,
					}),
					SystemIdentifier({
						sourceUrl: 'https://renaissance.com',
						identifier: 'ABC0005',
						identifierType: SystemIdentifierType.SystemId,
					}),
					SystemIdentifier({
						sourceUrl: 'https://the-lmsadmin-url.com',
						identifier: '12345',
						identifierType: SystemIdentifierType.SystemId,
					}),
				],
				settings: {
					spanishLanguage: ['math'],
					languageTranslationTools: ['math', 'reading'],
					textToSpeech: ['math', 'reading'],
				},
			}),
		});
		expect(() => validate(event)).not.toThrowError();
	});

	it('passes for valid OrganizationActivatedEvent', () => {
		const event = OrganizationActivatedEvent({
			actor: User({ id: 'https://foo.bar/user/1' }),
			object: Organization({ id: 'https://foo.bar/organization/1' }),
		});
		expect(() => validate(event)).not.toThrowError();
	});

	it('throws error for invalid ID', () => {
		const event = OrganizationActivatedEvent({
			actor: User({ id: 'https://foo.bar/user/1' }),
			object: Organization({ id: 'https://foo.bar/organization/1' }),
		});
		event.id = 'this-is-not-a-valid-event-id';

		expect(() => validate(event)).toThrowError();
	});

	it('throws error for invalid timestamp', () => {
		const event = OrganizationActivatedEvent({
			actor: User({ id: 'https://foo.bar/user/1' }),
			object: Organization({ id: 'https://foo.bar/organization/1' }),
		});
		event.eventTime = 'whatever, blah blah';

		expect(() => validate(event)).toThrowError();
	});

	it('throws error for invalid entity ID', () => {
		const event = OrganizationActivatedEvent({
			actor: User({ id: 'invalid-id' }),
			object: Organization({ id: 'whatever I dont care' }),
		});

		expect(() => validate(event)).toThrowError();
	});
});
