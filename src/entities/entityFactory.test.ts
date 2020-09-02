import { DEFAULT_CONFIG } from '../config/config';
import { createEntity } from './entityFactory';
import { EntityType } from './entityType';
import { Session } from './session/session';

describe('createEntity<T>(..)', () => {
	it('creates entity of specified type', () => {
		const entity = createEntity<Session>({ id: 'session-id', type: EntityType.session });
		const expected: Session = { '@context': DEFAULT_CONFIG.jsonldExternalCaliperContext, id: 'session-id', type: 'Session' };
		expect(entity).toEqual(expected);
	});
});
