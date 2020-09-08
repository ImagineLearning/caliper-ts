import { Action } from '../actions/actions';
import { Entity } from '../entities/entity';
import { CaliperEventType } from './caliperEventType';
import { createEvent } from './eventFactory';

describe('createEvent(..)', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('creates event of the specified type', () => {
		jest.spyOn(Date, 'now').mockImplementation(() => Date.parse('2020-09-02T12:00:00.000Z'));
		const event = createEvent({
			type: CaliperEventType.session,
			action: Action.LoggedIn,
			actor: {} as Entity,
			id: 'event-id',
			object: 'object-id'
		});

		expect(event).toEqual({
			'@context': 'http://purl.imsglobal.org/ctx/caliper/v1p1',
			eventTime: '2020-09-02T12:00:00.000Z',
			type: 'SessionEvent',
			action: 'LoggedIn',
			actor: {},
			id: 'event-id',
			object: 'object-id'
		});
	});
});
