// import { DEFAULT_CONFIG, JsonLdContextVersion } from '../config/config';
import caliperEventSessionLoggedIn from '../caliper-spec/fixtures/v1p1/caliperEventSessionLoggedIn.json';
import { createEvent } from './eventFactory';
import { createPerson } from '../entities/agent/person';
import { createSoftwareApplication } from '../entities/agent/softwareApplication';
import { CaliperEventType } from './caliperEventType';
import { createSession } from '../entities/session/session';
import { JsonLdContextVersion } from '../config/config';

describe('Caliper Events', () => {
	it('Session event logged in matches expected json', () => {
		const sessionEvent = createEvent({
			id: 'urn:uuid:fcd495d0-3740-4298-9bec-1154571dc211',
			type: CaliperEventType.session,
			action: 'LoggedIn',
			actor: createPerson({ id: 'https://example.edu/users/554433' }),
			object: createSoftwareApplication({ id: 'https://example.edu', version: 'v2' }, JsonLdContextVersion.none),
			edApp: 'https://example.edu',
			eventTime: '2016-11-15T10:15:00.000Z',
			session: createSession(
				{
					dateCreated: '2016-11-15T10:00:00.000Z',
					id: 'https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259',
					startedAtTime: '2016-11-15T10:00:00.000Z',
					user: 'https://example.edu/users/554433'
				},
				JsonLdContextVersion.none
			)
		});

		expect(sessionEvent).toEqual(caliperEventSessionLoggedIn);
	});
});
