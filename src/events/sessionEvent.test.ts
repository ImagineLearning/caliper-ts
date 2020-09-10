import caliperEventSessionLoggedIn from '../caliper-spec/fixtures/v1p1/caliperEventSessionLoggedIn.json';
import caliperEventSessionLoggedOut from '../caliper-spec/fixtures/v1p1/caliperEventSessionLoggedOut.json';
import caliperEventSessionTimedOut from '../caliper-spec/fixtures/v1p1/caliperEventSessionTimedOut.json';

import { createPerson } from '../entities/agent/person';
import { createSoftwareApplication } from '../entities/agent/softwareApplication';
import { createSession } from '../entities/session/session';
import { JsonLdContextVersion } from '../config/config';
import { Action } from '../actions/actions';
import { createSessionEvent } from './sessionEvent';

describe('Session Events', () => {
	it('Session event logged in matches expected json', () => {
		const sessionEvent = createSessionEvent({
			id: 'urn:uuid:fcd495d0-3740-4298-9bec-1154571dc211',
			action: Action.LoggedIn,
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

	it('Session event logged out matches expected json', () => {
		const sessionEvent = createSessionEvent({
			id: 'urn:uuid:a438f8ac-1da3-4d48-8c86-94a1b387e0f6',
			action: Action.LoggedOut,
			actor: createPerson({ id: 'https://example.edu/users/554433' }),
			object: createSoftwareApplication({ id: 'https://example.edu', version: 'v2' }, JsonLdContextVersion.none),
			edApp: 'https://example.edu',
			eventTime: '2016-11-15T11:05:00.000Z',
			session: createSession(
				{
					dateCreated: '2016-11-15T10:00:00.000Z',
					id: 'https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259',
					startedAtTime: '2016-11-15T10:00:00.000Z',
					endedAtTime: '2016-11-15T11:05:00.000Z',
					user: 'https://example.edu/users/554433',
					duration: 'PT3000S'
				},
				JsonLdContextVersion.none
			)
		});

		expect(sessionEvent).toEqual(caliperEventSessionLoggedOut);
	});

	it('Session event timed out matches expected json', () => {
		const sessionEvent = createSessionEvent({
			id: 'urn:uuid:4e61cf6c-ffbe-45bc-893f-afe7ad4079dc',
			action: Action.TimedOut,
			actor: createSoftwareApplication({ id: 'https://example.edu' }, JsonLdContextVersion.none),
			object: createSession(
				{
					dateCreated: '2016-11-15T10:15:00.000Z',
					duration: 'PT3600S',
					endedAtTime: '2016-11-15T11:15:00.000Z',
					id: 'https://example.edu/sessions/7d6b88adf746f0692e2e873308b78c60fb13a864',
					startedAtTime: '2016-11-15T10:15:00.000Z',
					user: createPerson({ id: 'https://example.edu/users/112233' })
				},
				JsonLdContextVersion.none
			),
			edApp: 'https://example.edu',
			eventTime: '2016-11-15T11:15:00.000Z'
		});

		expect(sessionEvent).toEqual(caliperEventSessionTimedOut);
	});
});
