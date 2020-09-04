// import { DEFAULT_CONFIG } from '../config/config';
import { createSession } from './session';
import caliperEntitySession from '../../caliper-spec/fixtures/v1p1/caliperEntitySession.json';
import { createPerson } from '../agent/person';

describe('Session Entity', () => {
	it('createSession() creates session entity that matches caliper json', () => {
		const person = createPerson({
			id: 'https://example.edu/users/554433'
		});

		const session = createSession({
			id: 'https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259',
			user: person,
			startedAtTime: '2016-09-15T10:00:00.000Z'
		});

		expect(caliperEntitySession).toEqual(session);
	});
});
