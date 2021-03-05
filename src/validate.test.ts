import Caliper from './Caliper';
import {
	IEvent,
	Instructor,
	Organization,
	OrganizationActivatedEvent,
	Status,
	SystemIdentifier,
	SystemIdentifierType,
	User,
	UserCreatedEvent,
	UserEvent_Student,
	validate
} from './';
import { CaliperAction } from './Events/CaliperAction';

describe('validate', () => {
	Caliper.settings.applicationUri = 'https://unit.test';

	const getValidationErrors = (event: IEvent) => {
		let errors = null;
		try {
			validate(event);
		} catch (ex) {
			errors = ex;
		}
		return errors;
	};

	it('validate_OK_UserEvent', () => {
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
						identifierType: SystemIdentifierType.SystemId
					}),
					SystemIdentifier({
						sourceUrl: 'https://whatever.com/external',
						identifier: '8ece0ac2-b4cd-4e66-ae26-a59cec4edad7',
						identifierType: SystemIdentifierType.SystemId
					}),
					SystemIdentifier({
						sourceUrl: 'https://renaissance.com',
						identifier: 'ABC0005',
						identifierType: SystemIdentifierType.SystemId
					}),
					SystemIdentifier({
						sourceUrl: 'https://the-lmsadmin-url.com',
						identifier: '12345',
						identifierType: SystemIdentifierType.SystemId
					})
				],
				settings: {
					spanishLanguage: ['math'],
					languageTranslationTools: ['math', 'reading'],
					textToSpeech: ['math', 'reading']
				}
			})
		});
		validate(event);
	});

	it('validate_OK_OrganizationEvent', () => {
		const event = OrganizationActivatedEvent({
			actor: User({ id: 'https://foo.bar/user/1' }),
			object: Organization({ id: Caliper.uuid('cab85afa-de4f-4ee0-bce3-66030d906c25') })
		});
		validate(event);
	});

	it('validate_FAIL_InvalidEventId', () => {
		const event = OrganizationActivatedEvent({
			actor: User({ id: 'https://foo.bar/user/1' }),
			object: Organization({ id: Caliper.uuid('cab85afa-de4f-4ee0-bce3-66030d906c25') })
		});
		event.id = 'this-is-not-a-valid-event-id';

		const errors = getValidationErrors(event);
		expect(errors).not.toHaveLength(0);
	});

	it('validate_FAIL_InvalidEventAction', () => {
		const event = OrganizationActivatedEvent({
			actor: User({ id: 'https://foo.bar/user/1' }),
			object: Organization({ id: Caliper.uuid('cab85afa-de4f-4ee0-bce3-66030d906c25') })
		});
		event.action = CaliperAction.ChangedResolution;

		const errors = getValidationErrors(event);
		expect(errors).not.toHaveLength(0);
	});

	it('validate_FAIL_InvalidTimestamp', () => {
		const event = OrganizationActivatedEvent({
			actor: User({ id: 'https://foo.bar/user/1' }),
			object: Organization({ id: Caliper.uuid('cab85afa-de4f-4ee0-bce3-66030d906c25') })
		});
		event.eventTime = 'whatever, blah blah';

		const errors = getValidationErrors(event);
		expect(errors).not.toHaveLength(0);
	});

	it('validate_FAIL_InvalidEntityId', () => {
		const event = OrganizationActivatedEvent({
			actor: User({ id: 'https://foo.bar/user/1' }),
			object: Organization({ id: 'cab85afa-de4f-4ee0-bce3-66030d906c25' })
		});

		const errors = getValidationErrors(event);
		expect(errors).not.toHaveLength(0);
	});
});
